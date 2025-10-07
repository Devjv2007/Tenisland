// src/pages/Account.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  firstName: string;
  lastName: string | null;
  email: string;
  phone: string | null;
  birthDate: string | null;
  isActive: boolean;
  createdAt: string;
};

export default function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      navigate("/");
      return;
    }
    try {
      setUser(JSON.parse(stored));
    } catch {
      navigate("/");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header simples */}
      <header className="border-b border-neutral-800 bg-neutral-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold">TenisLand</h1>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-neutral-400 hover:text-white"
          >
            Voltar à loja
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Cabeçalho da conta */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Minha Conta</h2>
            <p className="mt-1 text-neutral-400">
              Gerencie suas informações e pedidos
            </p>
          </div>
          
        </div>

        {/* Card de informações */}
        <div className="space-y-4">
          {/* Dados pessoais */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
            <h3 className="mb-4 text-lg font-semibold">Dados Pessoais</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs text-neutral-400">Nome</p>
                <p className="mt-1 font-medium">
                  {user.firstName} {user.lastName || ""}
                </p>
              </div>
              <div>
                <p className="text-xs text-neutral-400">E-mail</p>
                <p className="mt-1 font-medium">{user.email}</p>
              </div>
              {user.phone && (
                <div>
                  <p className="text-xs text-neutral-400">Telefone</p>
                  <p className="mt-1 font-medium">{user.phone}</p>
                </div>
              )}
              {user.birthDate && (
                <div>
                  <p className="text-xs text-neutral-400">Data de Nascimento</p>
                  <p className="mt-1 font-medium">
                    {new Date(user.birthDate).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Status da conta */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
            <h3 className="mb-4 text-lg font-semibold">Status da Conta</h3>
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  user.isActive ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <p className="text-sm text-neutral-300">
                {user.isActive ? "Conta ativa" : "Conta inativa"}
              </p>
            </div>
            <p className="mt-2 text-xs text-neutral-500">
              Membro desde{" "}
              {new Date(user.createdAt).toLocaleDateString("pt-BR")}
            </p>
          </div>

          {/* Pedidos */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
            <h3 className="mb-4 text-lg font-semibold">Meus Pedidos</h3>
            <p className="text-sm text-neutral-400">
              Você ainda não realizou nenhum pedido.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-neutral-200"
            >
              Começar a comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
