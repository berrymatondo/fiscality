"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { UserMenu } from "@/components/dashboard/user-menu";
import { NotificationBell } from "@/components/dashboard/notification-bell";
import { ThemeToggle } from "@/components/theme-toggle";

export function UtilityShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        active={undefined}
        onSelect={() => setMobileOpen(false)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-border bg-card px-4 py-4 md:px-6">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
              className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-accent lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{eyebrow}</p>
              <h1 className="text-xl font-extrabold tracking-tight text-brand-navy text-balance dark:text-slate-50 md:text-2xl">
                {title}
              </h1>
              {subtitle && <p className="mt-0.5 text-[13px] text-muted-foreground md:text-sm">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <NotificationBell />
            <UserMenu />
          </div>
        </header>
        <main className="flex-1 space-y-4 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
