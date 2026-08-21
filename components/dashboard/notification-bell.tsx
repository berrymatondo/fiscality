"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Bell, CheckCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/lib/auth-client";
import { getMyNotifications, markNotificationRead, markAllNotificationsRead } from "@/app/notifications/actions";

type NotificationItem = {
  id: string;
  titre: string;
  message: string | null;
  lien: string | null;
  lu: boolean;
  createdAt: string;
};

const POLL_INTERVAL_MS = 20000;

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "à l'instant";
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  const days = Math.floor(hours / 24);
  return `il y a ${days} j`;
}

export function NotificationBell() {
  const { data: session } = useSession();
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!session) return;
    let cancelled = false;

    async function load() {
      const data = await getMyNotifications();
      if (!cancelled) {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      }
    }

    load();
    const id = setInterval(load, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [session]);

  if (!session) return null;

  function handleOpen(notification: NotificationItem) {
    startTransition(async () => {
      if (!notification.lu) {
        const formData = new FormData();
        formData.set("id", notification.id);
        await markNotificationRead(formData);
        setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, lu: true } : n)));
        setUnreadCount((c) => Math.max(0, c - 1));
      }
      if (notification.lien) router.push(notification.lien);
    });
  }

  function handleMarkAll() {
    startTransition(async () => {
      await markAllNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, lu: true })));
      setUnreadCount(0);
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Notifications"
        className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold leading-none text-destructive-foreground">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuGroup>
          <div className="flex items-center justify-between px-1.5 py-1">
            <DropdownMenuLabel className="px-0 py-0">Notifications</DropdownMenuLabel>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAll}
                disabled={isPending}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline disabled:opacity-50"
              >
                <CheckCheck className="h-3 w-3" />
                Tout marquer lu
              </button>
            )}
          </div>
          <DropdownMenuSeparator />
          {notifications.length === 0 ? (
            <p className="px-1.5 py-4 text-center text-xs text-muted-foreground">Aucune notification.</p>
          ) : (
            notifications.map((n) => (
              <DropdownMenuItem
                key={n.id}
                onClick={() => handleOpen(n)}
                className="flex-col items-start gap-0.5 whitespace-normal"
              >
                <span className="flex w-full items-center gap-1.5">
                  {!n.lu && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
                  <span className={n.lu ? "font-medium text-muted-foreground" : "font-semibold text-foreground"}>
                    {n.titre}
                  </span>
                </span>
                {n.message && <span className="pl-3 text-xs text-muted-foreground">{n.message}</span>}
                <span className="pl-3 text-[10px] text-muted-foreground">{timeAgo(n.createdAt)}</span>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
