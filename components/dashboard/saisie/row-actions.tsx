"use client";

export function ConfirmDeleteForm({
  id,
  deleteAction,
  label = "Supprimer",
  message = "Supprimer cette entrée ? Cette action est irréversible.",
  extraFields,
}: {
  id: string;
  deleteAction: (formData: FormData) => void;
  label?: string;
  message?: string;
  extraFields?: Record<string, string>;
}) {
  return (
    <form
      action={deleteAction}
      onSubmit={(event) => {
        if (!confirm(message)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      {extraFields &&
        Object.entries(extraFields).map(([name, value]) => (
          <input key={name} type="hidden" name={name} value={value} />
        ))}
      <button type="submit" className="text-xs font-medium text-destructive hover:underline">
        {label}
      </button>
    </form>
  );
}
