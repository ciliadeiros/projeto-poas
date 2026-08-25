"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import { addToLibrary, listGames, ApiError } from "@/lib/api";
import shared from "../styles/lista.module.css";
import styles from "./page.module.css";

export default function CatalogoPage() {
  const { user, token } = useAuth();

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingId, setAddingId] = useState(null);
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    listGames()
      .then(setGames)
      .catch((err) =>
        setError(
          err instanceof ApiError
            ? err.message
            : "Não foi possível carregar o catálogo."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  async function handleAdicionar(jogo) {
    setAddingId(jogo.jgs_id);
    setFeedback((prev) => ({ ...prev, [jogo.jgs_id]: null }));
    try {
      await addToLibrary(token, {
        bib_status: "planejado",
        bib_jgs_id: jogo.jgs_id,
      });
      setFeedback((prev) => ({ ...prev, [jogo.jgs_id]: "ok" }));
    } catch (err) {
      setFeedback((prev) => ({
        ...prev,
        [jogo.jgs_id]:
          err instanceof ApiError ? err.message : "Erro ao adicionar.",
      }));
    } finally {
      setAddingId(null);
    }
  }

  return (
    <div className={shared.pagina}>
      <header className={shared.header}>
        <Logo />
        <h1 className={shared.titulo}>Catálogo</h1>
      </header>

      {loading && <p className={shared.info}>Carregando jogos...</p>}
      {error && <p className={shared.erro}>{error}</p>}

      {!loading && !error && games.length === 0 && (
        <p className={shared.info}>
          Nenhum jogo cadastrado ainda no catálogo.
        </p>
      )}

      <div className={shared.grid}>
        {games.map((jogo) => (
          <div key={jogo.jgs_id} className={shared.card}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={shared.capa}
              alt={jogo.jgs_titulo}
              src={jogo.jgs_capa_url || "/images/placeholder.svg"}
            />
            <div className={styles.cardConteudo}>
              <h2 className={shared.cardTitulo}>{jogo.jgs_titulo}</h2>
              <p className={styles.cardDesenvolvedor}>
                {jogo.jgs_desenvolvedor}
              </p>
              <p className={styles.cardNota}>
                Nota média: {jogo.jgs_nota_media?.toFixed(1) ?? "—"}
              </p>

              {user ? (
                <>
                  <button
                    className={styles.botaoAdicionar}
                    disabled={addingId === jogo.jgs_id}
                    onClick={() => handleAdicionar(jogo)}
                  >
                    {addingId === jogo.jgs_id
                      ? "Adicionando..."
                      : "+ Biblioteca"}
                  </button>
                  {feedback[jogo.jgs_id] === "ok" && (
                    <p className={styles.sucesso}>Adicionado!</p>
                  )}
                  {feedback[jogo.jgs_id] && feedback[jogo.jgs_id] !== "ok" && (
                    <p className={styles.erroCard}>{feedback[jogo.jgs_id]}</p>
                  )}
                </>
              ) : (
                <a href="/login" className={styles.linkLogin}>
                  Faça login para adicionar
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
