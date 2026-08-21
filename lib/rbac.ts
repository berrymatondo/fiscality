import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/session";
import { ADMIN_ROLES, type Role } from "@/lib/roles";

export { ADMIN_ROLES };

export async function requireSession() {
  const session = await getCurrentSession();
  if (!session) redirect("/login");
  return session;
}

export async function requireRole(allowed: Role[]) {
  const session = await requireSession();
  if (!allowed.includes(session.user.role as Role)) {
    redirect("/");
  }
  return session;
}

/**
 * Allows SUPER_ADMIN (any ministère) or the MINISTERE_FOCAL account whose own
 * ministère matches `ministereId`. Used to let a ministère manage its own entités.
 */
export async function requireMinistereAccess(ministereId: string) {
  const session = await requireSession();
  const role = session.user.role as Role;
  if (role === "SUPER_ADMIN") return session;
  if (role === "MINISTERE_FOCAL" && session.user.ministereId === ministereId) return session;
  redirect("/");
}
