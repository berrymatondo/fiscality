"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toastManager } from "@/lib/toast-manager";
import { ROLES, ROLE_LABELS, type Role } from "@/lib/roles";
import { updateUserAccount, deleteUserAccount } from "@/app/admin/users/actions";

const inputClass =
  "h-9 rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50";

type UserAccount = {
  id: string;
  name: string;
  email: string;
  role: string;
  ministereId: string | null;
  provinceId: string | null;
};

export function UserAccountRow({
  user,
  ministeres,
  provinces,
  canDelete,
}: {
  user: UserAccount;
  ministeres: { id: string; nom: string }[];
  provinces: { id: string; nom: string }[];
  canDelete: boolean;
}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [ministereId, setMinistereId] = useState(user.ministereId ?? "");
  const [provinceId, setProvinceId] = useState(user.provinceId ?? "");
  const [password, setPassword] = useState("");
  const [isSaving, startSave] = useTransition();
  const [isDeleting, startDelete] = useTransition();

  const isMinistereFocal = role === "MINISTERE_FOCAL";
  const isProvinceFocal = role === "PROVINCE_FOCAL";
  const isPending = isSaving || isDeleting;

  function handleSave() {
    startSave(async () => {
      const formData = new FormData();
      formData.set("userId", user.id);
      formData.set("name", name);
      formData.set("email", email);
      formData.set("role", role);
      if (isMinistereFocal) formData.set("ministereId", ministereId);
      if (isProvinceFocal) formData.set("provinceId", provinceId);
      if (password) formData.set("password", password);

      try {
        await updateUserAccount(formData);
        toastManager.add({
          type: "success",
          title: "Compte mis à jour",
          description: "Les informations ont été enregistrées.",
        });
        setPassword("");
      } catch (error) {
        toastManager.add({
          type: "error",
          title: "Échec de l'enregistrement",
          description: error instanceof Error ? error.message : "Une erreur est survenue.",
        });
      }
    });
  }

  function handleDelete() {
    if (!window.confirm(`Supprimer le compte « ${user.name} » ? Cette action est irréversible.`)) {
      return;
    }
    startDelete(async () => {
      const formData = new FormData();
      formData.set("userId", user.id);
      try {
        await deleteUserAccount(formData);
        toastManager.add({
          type: "success",
          title: "Compte supprimé",
          description: `Le compte « ${user.name} » a été supprimé.`,
        });
      } catch (error) {
        toastManager.add({
          type: "error",
          title: "Échec de la suppression",
          description: error instanceof Error ? error.message : "Une erreur est survenue.",
        });
      }
    });
  }

  return (
    <tr className="border-b border-border last:border-0">
      <td className="px-5 py-3 align-top">
        <div className="flex flex-col gap-1.5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Nom complet"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className={inputClass}
            placeholder="E-mail"
          />
        </div>
      </td>
      <td className="px-3 py-3 align-top">
        <select value={role} onChange={(e) => setRole(e.target.value)} className={inputClass}>
          {ROLES.map((r: Role) => (
            <option key={r} value={r}>
              {ROLE_LABELS[r]}
            </option>
          ))}
        </select>
      </td>
      <td className="px-3 py-3 align-top">
        <select
          value={ministereId}
          onChange={(e) => setMinistereId(e.target.value)}
          disabled={!isMinistereFocal}
          className={`${inputClass} w-44`}
        >
          <option value="">—</option>
          {ministeres.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nom}
            </option>
          ))}
        </select>
      </td>
      <td className="px-3 py-3 align-top">
        <select
          value={provinceId}
          onChange={(e) => setProvinceId(e.target.value)}
          disabled={!isProvinceFocal}
          className={`${inputClass} w-40`}
        >
          <option value="">—</option>
          {provinces.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nom}
            </option>
          ))}
        </select>
      </td>
      <td className="px-3 py-3 align-top">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          minLength={8}
          className={`${inputClass} w-36`}
          placeholder="Laisser vide"
          autoComplete="new-password"
        />
      </td>
      <td className="px-3 py-3 align-top">
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="outline" disabled={isPending} onClick={handleSave}>
            {isSaving ? "Enregistrement..." : "Enregistrer"}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="destructive"
            disabled={isPending || !canDelete}
            onClick={handleDelete}
            title={!canDelete ? "Vous ne pouvez pas supprimer votre propre compte." : undefined}
          >
            {isDeleting ? "Suppression..." : "Supprimer"}
          </Button>
        </div>
      </td>
    </tr>
  );
}
