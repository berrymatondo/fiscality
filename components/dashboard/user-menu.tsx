"use client";

import { useRouter } from "next/navigation";
import { LogOut, ShieldCheck, PenLine, User as UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient, useSession } from "@/lib/auth-client";
import { ROLE_LABELS, SAISIE_HREF_BY_ROLE, saisieNavLabel, type Role } from "@/lib/roles";

export function UserMenu() {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) return null;

  const role = session.user.role as Role;
  const roleLabel = ROLE_LABELS[role] ?? role;
  const isAdmin = role === "SUPER_ADMIN" || role === "ADMIN_DGB";
  const saisieHref = SAISIE_HREF_BY_ROLE[role] ?? null;
  const saisieLabel = saisieNavLabel(role);

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-left transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <UserIcon className="h-4 w-4 text-muted-foreground" />
        <span className="leading-tight">
          <span className="block text-sm font-semibold text-foreground">{session.user.name}</span>
          <span className="block text-[10px] text-muted-foreground">{roleLabel}</span>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{session.user.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {saisieHref && (
            <DropdownMenuItem onClick={() => router.push(saisieHref)}>
              <PenLine className="h-4 w-4" />
              {saisieLabel}
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem onClick={() => router.push("/admin/users")}>
              <ShieldCheck className="h-4 w-4" />
              Administration des comptes
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
            Se déconnecter
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
