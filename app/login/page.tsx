"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

type Mode = "connexion" | "creation";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("connexion");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const { error: authError } =
      mode === "connexion"
        ? await authClient.signIn.email({ email, password })
        : await authClient.signUp.email({ name, email, password });

    setPending(false);

    if (authError) {
      setError(authError.message ?? "Une erreur est survenue. Vérifiez vos identifiants.");
      return;
    }

    const from = new URLSearchParams(window.location.search).get("from");
    router.push(from && from.startsWith("/") ? from : "/");
    router.refresh();
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="gap-2 px-6 pt-6">
          <CardDescription className="normal-case tracking-normal text-[11px]">
            Ministère du Budget — République Démocratique du Congo
          </CardDescription>
          <CardTitle className="text-base normal-case tracking-normal text-lg font-semibold">
            {mode === "connexion" ? "Connexion" : "Créer un compte"}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "creation" && (
              <Field label="Nom complet">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  autoComplete="name"
                />
              </Field>
            )}
            <Field label="E-mail professionnel">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                autoComplete="email"
              />
            </Field>
            <Field label="Mot de passe">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-9 w-full rounded-md border border-input bg-background px-3 pr-9 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  autoComplete={mode === "connexion" ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </Field>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" disabled={pending} className="mt-1 h-9 w-full">
              {pending ? "Veuillez patienter…" : mode === "connexion" ? "Se connecter" : "Créer mon compte"}
            </Button>
          </form>

          <button
            type="button"
            onClick={() => {
              setError(null);
              setMode((m) => (m === "connexion" ? "creation" : "connexion"));
            }}
            className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground"
          >
            {mode === "connexion"
              ? "Pas encore de compte ? En créer un"
              : "Déjà un compte ? Se connecter"}
          </button>
        </CardContent>
      </Card>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
