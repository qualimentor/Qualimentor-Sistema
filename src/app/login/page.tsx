"use client";

import { FormEvent, useEffect, useState } from "react";
import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import { auth as firebaseAuthClient, hasFirebaseConfig } from "../../lib/firebase-client";

export default function LoginPage() {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setAuth(firebaseAuthClient);
  }, []);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth) return;

    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirecionar para dashboard ou página inicial após login
      window.location.href = "/dashboard"; // Ajuste conforme suas rotas
    } catch (err: unknown) {
      setError("Erro ao fazer login. Verifique seu email e senha.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!hasFirebaseConfig) {
    return <div className="p-4 text-red-600">Firebase não configurado. Defina as variáveis NEXT_PUBLIC_FIREBASE_*.</div>;
  }

  if (!auth) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
