// src/components/Auth/LoginModal.tsx
import { useEffect, useRef, useState } from "react";

const API = "http://192.168.15.167:3001";

type Props = { 
  open: boolean; 
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
};

export default function LoginModal({ open, onClose, onLoginSuccess }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      // Limpa campos ao fechar
      setEmail("");
      setPassword("");
      setErr(null);
      setShowPassword(false);
      return;
    }
    setTimeout(() => emailRef.current?.focus(), 100);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open, onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    if (!email.trim()) {
      return setErr("Informe seu e-mail.");
    }

    if (!password) {
      return setErr("Informe sua senha.");
    }

    setErr(null);
    setLoading(true);

    try {
      const resp = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: email.trim(), 
          password 
        }),
      });

      const body = await resp.json().catch(() => ({}));
      console.log("LOGIN:", resp.status, body);
      
      if (!resp.ok) {
        throw new Error(body?.error || "Falha ao fazer login.");
      }

      // Salva token e user
      localStorage.setItem("token", body.token);
      localStorage.setItem("user", JSON.stringify(body.user));
      
      // Notifica sucesso
      onLoginSuccess(body.user);
      onClose();
    } catch (e: any) {
      setErr(e?.message || "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/85" />
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950 p-6 text-neutral-100"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Entrar na conta</h2>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {err && (
            <div className="rounded-md bg-red-900/30 p-3 text-sm text-red-300 ring-1 ring-red-800">
              {err}
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs text-neutral-400">E-mail</label>
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 placeholder:text-neutral-500 focus:border-neutral-700 focus:outline-none"
              placeholder="seu@email.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-neutral-400">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-2 pr-10 placeholder:text-neutral-500 focus:border-neutral-700 focus:outline-none"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
              >
                {showPassword ? (
                  <i className="ri-eye-off-line text-lg" />
                ) : (
                  <i className="ri-eye-line text-lg" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-white px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-neutral-200 disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-center text-xs text-neutral-500">
            Não tem conta?{" "}
            <button
              type="button"
              onClick={onClose}
              className="text-neutral-300 underline hover:text-white"
            >
              Criar agora
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
