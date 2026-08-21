"use server";

import { randomUUID } from "node:crypto";
import { hashPassword } from "better-auth/crypto";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole, ADMIN_ROLES } from "@/lib/rbac";
import { ROLES, type Role } from "@/lib/roles";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

function readAccountFields(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const role = String(formData.get("role") ?? "");
  const ministereId = String(formData.get("ministereId") ?? "") || null;
  const provinceId = String(formData.get("provinceId") ?? "") || null;
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !ROLES.includes(role as Role)) {
    throw new Error("Requête invalide.");
  }
  if (!EMAIL_RE.test(email)) {
    throw new Error("Adresse e-mail invalide.");
  }

  return { name, email, role: role as Role, ministereId, provinceId, password };
}

export async function createUserAccount(formData: FormData) {
  await requireRole(ADMIN_ROLES);

  const { name, email, role, ministereId, provinceId, password } = readAccountFields(formData);

  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`Le mot de passe doit contenir au moins ${MIN_PASSWORD_LENGTH} caractères.`);
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("Cet e-mail est déjà utilisé par un autre compte.");
  }

  const userId = randomUUID();
  const passwordHash = await hashPassword(password);

  await prisma.user.create({
    data: {
      id: userId,
      name,
      email,
      emailVerified: true,
      role,
      ministereId: role === "MINISTERE_FOCAL" ? ministereId : null,
      provinceId: role === "PROVINCE_FOCAL" ? provinceId : null,
      accounts: {
        create: {
          id: randomUUID(),
          accountId: userId,
          providerId: "credential",
          issuer: "local:credential",
          password: passwordHash,
        },
      },
    },
  });

  revalidatePath("/admin/users");
}

export async function updateUserAccount(formData: FormData) {
  await requireRole(ADMIN_ROLES);

  const userId = String(formData.get("userId") ?? "");
  if (!userId) throw new Error("Requête invalide.");

  const { name, email, role, ministereId, provinceId, password } = readAccountFields(formData);

  if (password && password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`Le mot de passe doit contenir au moins ${MIN_PASSWORD_LENGTH} caractères.`);
  }

  const emailTaken = await prisma.user.findFirst({ where: { email, NOT: { id: userId } } });
  if (emailTaken) {
    throw new Error("Cet e-mail est déjà utilisé par un autre compte.");
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      email,
      role,
      ministereId: role === "MINISTERE_FOCAL" ? ministereId : null,
      provinceId: role === "PROVINCE_FOCAL" ? provinceId : null,
    },
  });

  if (password) {
    const passwordHash = await hashPassword(password);
    await prisma.account.updateMany({
      where: { userId, providerId: "credential" },
      data: { password: passwordHash },
    });
  }

  revalidatePath("/admin/users");
}

export async function deleteUserAccount(formData: FormData) {
  const session = await requireRole(ADMIN_ROLES);

  const userId = String(formData.get("userId") ?? "");
  if (!userId) throw new Error("Requête invalide.");

  if (userId === session.user.id) {
    throw new Error("Vous ne pouvez pas supprimer votre propre compte.");
  }

  try {
    await prisma.user.delete({ where: { id: userId } });
  } catch {
    throw new Error(
      "Impossible de supprimer ce compte : des saisies, réformes ou alertes lui sont encore associées.",
    );
  }

  revalidatePath("/admin/users");
}
