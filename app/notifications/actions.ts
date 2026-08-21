"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/rbac";

export async function getMyNotifications() {
  const session = await requireSession();

  const [notifications, unreadCount] = await Promise.all([
    prisma.notification.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.notification.count({ where: { userId: session.user.id, lu: false } }),
  ]);

  return {
    unreadCount,
    notifications: notifications.map((n) => ({
      id: n.id,
      titre: n.titre,
      message: n.message,
      lien: n.lien,
      lu: n.lu,
      createdAt: n.createdAt.toISOString(),
    })),
  };
}

export async function markNotificationRead(formData: FormData) {
  const session = await requireSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.notification.updateMany({ where: { id, userId: session.user.id }, data: { lu: true } });
  revalidatePath("/");
}

export async function markAllNotificationsRead() {
  const session = await requireSession();
  await prisma.notification.updateMany({ where: { userId: session.user.id, lu: false }, data: { lu: true } });
  revalidatePath("/");
}
