import { Paperclip } from "lucide-react";
import { uploadDocument, deleteDocument } from "@/app/saisie/documents/actions";
import { ConfirmDeleteForm } from "@/components/dashboard/saisie/row-actions";
import type { Domain } from "@/lib/documents";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export function DocumentAttachments({
  domain,
  recordId,
  documents,
  locked,
}: {
  domain: Domain;
  recordId: string;
  documents: { id: string; nom: string; taille: number }[];
  locked: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <span className="flex size-5 items-center justify-center rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400">
          <Paperclip className="size-3" />
        </span>
        Pièces jointes
      </div>

      {documents.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aucun document joint.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2 text-sm"
            >
              <a
                href={`/api/documents/${doc.id}`}
                className="flex-1 truncate font-medium text-primary hover:underline"
              >
                {doc.nom}
              </a>
              <span className="shrink-0 text-xs text-muted-foreground">{formatSize(doc.taille)}</span>
              {!locked && (
                <ConfirmDeleteForm
                  id={doc.id}
                  deleteAction={deleteDocument}
                  message="Supprimer ce document ?"
                  extraFields={{ domain, recordId }}
                />
              )}
            </li>
          ))}
        </ul>
      )}

      {!locked && (
        <form action={uploadDocument} className="flex flex-wrap items-center gap-2">
          <input type="hidden" name="domain" value={domain} />
          <input type="hidden" name="recordId" value={recordId} />
          <input
            type="file"
            name="fichier"
            required
            className="text-sm text-foreground file:mr-3 file:rounded-md file:border file:border-input file:bg-background file:px-3 file:py-1.5 file:text-xs file:font-medium hover:file:bg-accent"
          />
          <button
            type="submit"
            className="h-8 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-accent"
          >
            Joindre (5 Mo max)
          </button>
        </form>
      )}
    </div>
  );
}
