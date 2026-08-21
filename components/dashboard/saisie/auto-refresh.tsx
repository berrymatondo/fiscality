"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Revalide périodiquement les données de la page (via router.refresh()), pour que les
 * modifications faites par d'autres utilisateurs (nouvelle saisie, changement de statut,
 * suppression...) apparaissent sans que l'utilisateur ait à recharger la page manuellement.
 * Ne rend rien à l'écran.
 */
export function AutoRefresh({ intervalMs = 8000 }: { intervalMs?: number }) {
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => {
      router.refresh();
    }, intervalMs);
    return () => clearInterval(id);
  }, [router, intervalMs]);

  return null;
}
