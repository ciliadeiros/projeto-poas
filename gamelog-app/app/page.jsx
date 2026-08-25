"use client";

import { BotaoAuth } from "@/components/BotaoAuth";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.css";

export default function Home() {
  const { user, loading, logout } = useAuth();

  return (
    <div className={styles["pgina-inicial"]}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles["imagem-de-fundo"]}
        alt="Imagem de fundo"
        src="/images/fundo.png"
      />
      <div className={styles["gradiente-preto"]} />

      <div className={styles.logo}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles["logo-gamelog-1"]}
          alt="GameLog"
          src="/images/logo.png"
        />
      </div>

      <div className={styles["botoes-auth"]}>
        {!loading && user ? (
          <>
            <span className={styles.saudacao}>
              Olá, {user.usr_nome_usuario}!
            </span>
            <BotaoAuth
              className={styles["BOTAO-AUTH-instance"]}
              text="CATÁLOGO"
              href="/catalogo"
            />
            <BotaoAuth
              className={styles["BOTAO-AUTH-instance"]}
              text="MINHA BIBLIOTECA"
              href="/biblioteca"
            />
            <BotaoAuth
              className={styles["BOTAO-AUTH-instance"]}
              text="SAIR"
              onClick={logout}
            />
          </>
        ) : (
          <>
            <BotaoAuth
              className={styles["BOTAO-AUTH-instance"]}
              text="FAÇA LOG IN"
              href="/login"
            />
            <BotaoAuth
              className={styles["BOTAO-AUTH-instance"]}
              text="CADASTRE-SE"
              href="/cadastro"
            />
          </>
        )}
      </div>

      <div className={styles.imagens}>
        <div className={styles.img}>
          <div className={styles["text-wrapper"]}>Explore o catálogo</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles["img-2"]}
            alt="Explorar exemplo"
            src="/images/catalogo-exemplo.png"
          />
        </div>
        <div className={styles.img}>
          <div className={styles.div}>Organize sua biblioteca!</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles["img-2"]}
            alt="Biblioteca exemplo"
            src="/images/biblioteca-exemplo.png"
          />
        </div>
        <div className={styles.img}>
          <p className={styles.p}>Veja os detalhes sobre o jogo</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles["biblioteca-exemplo"]}
            alt="Detalhes exemplo"
            src="/images/detalhes-exemplo.png"
          />
        </div>
      </div>
    </div>
  );
}
