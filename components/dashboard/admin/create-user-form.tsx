"use client";

import { useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toastManager } from "@/lib/toast-manager";
import { ROLES, ROLE_LABELS, type Role } from "@/lib/roles";
import { createUserAccount } from "@/app/admin/users/actions";

const inputClass =
  "h-9 w-full rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50";

export function CreateUserForm({
  ministeres,
  provinces,
}: {
  ministeres: { id: string; nom: string }[];
  provinces: { id: string; nom: string }[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [role, setRole] = useState<string>("LECTEUR");
  const [isPending, startTransition] = useTransition();

  const isMinistereFocal = role === "MINISTERE_FOCAL";
  const isProvinceFocal = role === "PROVINCE_FOCAL";

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        await createUserAccount(formData);
        toastManager.add({
          type: "success",
          title: "Compte créé",
          description: "Le nouveau compte peut désormais se connecter.",
        });
        formRef.current?.reset();
        setRole("LECTEUR");
      } catch (error) {
        toastManager.add({
          type: "error",
          title: "Échec de la création",
          description: error instanceof Error ? error.message : "Une erreur est survenue.",
        });
      }
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:items-end">
      <div>
        <label className="mb-1 block text-xs font-medium text-muted-foreground">Nom complet</label>
        <input name="name" required className={inputClass} placeholder="Jean Kalala" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-muted-foreground">E-mail</label>
        <input name="email" type="email" required className={inputClass} placeholder="jean.kalala@budget.cd" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-muted-foreground">Mot de passe</label>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className={inputClass}
          placeholder="8 caractères min."
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-muted-foreground">Rôle</label>
        <select name="role" value={role} onChange={(e) => setRole(e.target.value)} className={inputClass}>
          {ROLES.map((r: Role) => (
            <option key={r} value={r}>
              {ROLE_LABELS[r]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-muted-foreground">Ministère</label>
        <select name="ministereId" disabled={!isMinistereFocal} defaultValue="" className={inputClass}>
          <option value="">—</option>
          {ministeres.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nom}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-muted-foreground">Province</label>
        <select name="provinceId" disabled={!isProvinceFocal} defaultValue="" className={inputClass}>
          <option value="">—</option>
          {provinces.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nom}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2 lg:col-span-6">
        <Button type="submit" size="sm" disabled={isPending}>
          {isPending ? "Création..." : "Créer le compte"}
        </Button>
      </div>
    </form>
  );
}
