"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getMe, loginUser, registerUser } from "@/lib/api";

const AuthContext = createContext(null);

const TOKEN_KEY = "gamelog_token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ao carregar a página, recupera o token salvo (se tiver) e busca o usuário
  useEffect(() => {
    async function restoreSession() {
      const saved = window.localStorage.getItem(TOKEN_KEY);
      if (!saved) return;

      setToken(saved);
      try {
        const me = await getMe(saved);
        setUser(me);
      } catch {
        // token expirado/inválido
        window.localStorage.removeItem(TOKEN_KEY);
        setToken(null);
      }
    }

    restoreSession().finally(() => setLoading(false));
  }, []);

  async function login({ email, senha }) {
    const { access_token } = await loginUser({ email, senha });
    window.localStorage.setItem(TOKEN_KEY, access_token);
    setToken(access_token);
    const me = await getMe(access_token);
    setUser(me);
    return me;
  }

  async function register(dados) {
    await registerUser(dados);
    // back-end não loga automaticamente no cadastro, então faz login em seguida
    return login({ email: dados.email, senha: dados.senha });
  }

  function logout() {
    window.localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ token, user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth precisa estar dentro de <AuthProvider>");
  return ctx;
}
