"use client";

import { CheckCircle2, XCircle, Info, X } from "lucide-react";
import { Toast } from "@base-ui/react/toast";
import { cn } from "@/lib/utils";
import { toastManager } from "@/lib/toast-manager";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

function ToastList() {
  const { toasts } = Toast.useToastManager();

  return toasts.map((toast) => {
    const Icon = ICONS[toast.type ?? "info"] ?? Info;
    return (
      <Toast.Root
        key={toast.id}
        toast={toast}
        className={cn(
          "wow-card absolute inset-x-0 top-0 z-[calc(1000-var(--toast-index))] mx-auto w-full rounded-xl border bg-card px-4 py-3 text-card-foreground shadow-lg select-none",
          "transition-all duration-300",
          "data-[starting-style]:translate-y-4 data-[starting-style]:opacity-0",
          "data-[ending-style]:translate-y-4 data-[ending-style]:opacity-0",
          "[transform:translateY(calc(var(--toast-offset-y)*1px))_scale(calc(1-var(--toast-index)*0.05))]",
        )}
      >
        <div className="flex items-start gap-2.5">
          <Icon
            className={cn(
              "mt-0.5 h-4 w-4 shrink-0",
              toast.type === "success" && "text-success",
              toast.type === "error" && "text-destructive",
              (!toast.type || toast.type === "info") && "text-info",
            )}
          />
          <div className="min-w-0 flex-1">
            <Toast.Title className="text-sm font-medium text-foreground" />
            <Toast.Description className="mt-0.5 text-xs text-muted-foreground" />
          </div>
          <Toast.Close
            aria-label="Fermer"
            className="shrink-0 rounded-md p-0.5 text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <X className="h-3.5 w-3.5" />
          </Toast.Close>
        </div>
      </Toast.Root>
    );
  });
}

export function Toaster() {
  return (
    <Toast.Provider toastManager={toastManager} timeout={5000}>
      <Toast.Portal>
        <Toast.Viewport className="fixed bottom-4 right-4 z-50 w-[min(360px,calc(100vw-2rem))]">
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}
