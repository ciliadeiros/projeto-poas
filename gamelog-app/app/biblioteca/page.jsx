"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import {
  listGames,
  listLibrary,
  removeFromLibrary,
  updateLibraryEntry,
  ApiError,
} from "@/lib/api";
import shared from "../styles/lista.module.css";
import styles from "./page.module.css";

const STATUS_LABEL = {
  jogando: "Jogando",
  completo: "Completo",
  pausado: "Pausado",
  abandonado: "Abandonado",
  planejado: "Quero jogar",
};

export default function BibliotecaPage() {
  const router = useRouter();
  const { user, token, loading: authLoading } = useAuth();

  const [entradas, setEntradas] = useState([]);
  const [jogosPorId, setJogosPorId] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Rota protegida: manda pro login se não tiver sessão
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!token) return;

    Promise.all([listLibrary(token), listGames()])
      .then(([biblioteca, jogos]) => {
        setEntradas(biblioteca);
        setJogosPorId(
          Object.fromEntries(jogos.map((jogo) => [jogo.jgs_id, jogo]))
        );
      })
      .catch((err) =>
        setError(
          err instanceof ApiError
            ? err.message
            : "Não foi possível carregar sua biblioteca."
        )
      )
      .finally(() => setLoading(false));
  }, [token]);

  async function handleStatusChange(entrada, novoStatus) {
    try {
      const atualizada = await updateLibraryEntry(token, entrada.bib_id, {
        bib_status: novoStatus,
      });
      setEntradas((prev) =>
        prev.map((e) => (e.bib_id === entrada.bib_id ? atualizada : e))
      );
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Não foi possível atualizar."
      );
    }
  }

  async function handleRemover(entrada) {
    try {
      await removeFromLibrary(token, entrada.bib_id);
      setEntradas((prev) => prev.filter((e) => e.bib_id !== entrada.bib_id));
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "Não foi possível remover."
      );
    }
  }

  if (authLoading || !user) {
    return null;
  }

  return (
    <div className={shared.pagina}>
      <header className={shared.header}>
        <Logo />
        <h1 className={shared.titulo}>Minha Biblioteca</h1>
      </header>

      {loading && <p className={shared.info}>Carregando sua biblioteca...</p>}
      {error && <p className={shared.erro}>{error}</p>}

      {!loading && !error && entradas.length === 0 && (
        <p className={shared.info}>
          Sua biblioteca está vazia. Vá até o{" "}
          <a href="/catalogo" className={styles.link}>
            catálogo
          </a>{" "}
          e adicione um jogo.
        </p>
      )}

      <div className={shared.grid}>
        {entradas.map((entrada) => {
          const jogo = jogosPorId[entrada.bib_jgs_id];
          return (
            <div key={entrada.bib_id} className={shared.card}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={shared.capa}
                alt={jogo?.jgs_titulo || "Jogo"}
                src={jogo?.jgs_capa_url || "/images/placeholder.svg"}
              />
              <div className={styles.cardConteudo}>
                <h2 className={shared.cardTitulo}>
                  {jogo?.jgs_titulo || `Jogo #${entrada.bib_jgs_id}`}
                </h2>

                <label className={styles.label}>
                  Status:
                  <select
                    className={styles.select}
                    value={entrada.bib_status}
                    onChange={(e) =>
                      handleStatusChange(entrada, e.target.value)
                    }
                  >
                    {Object.entries(STATUS_LABEL).map(([valor, label]) => (
                      <option key={valor} value={valor}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>

                {entrada.bib_usr_nota != null && (
                  <p className={styles.detalhe}>
                    Sua nota: {entrada.bib_usr_nota}/10
                  </p>
                )}
                <p className={styles.detalhe}>
                  Horas jogadas: {entrada.bib_jgs_horas_jogadas}
                </p>

                <button
                  className={styles.botaoRemover}
                  onClick={() => handleRemover(entrada)}
                >
                  Remover da biblioteca
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
