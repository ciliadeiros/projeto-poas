"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/context/AuthContext";
import styles from "./Header.module.css";

export function Header({ active }) {
  const { user } = useAuth();

  return (
    <header className={styles.topo}>
      <Logo />
      <nav className={styles.nav}>
        <Link
          href="/catalogo"
          className={active === "catalogo" ? styles.navLinkAtivo : styles.navLink}
        >
          Catálogo
        </Link>
        <Link
          href="/biblioteca"
          className={active === "biblioteca" ? styles.navLinkAtivo : styles.navLink}
        >
          Biblioteca
        </Link>
      </nav>
      {user ? (
        <span className={styles.perfil}>{user.usr_nome_usuario}</span>
      ) : (
        <Link href="/login" className={styles.perfil}>
          Entrar
        </Link>
      )}
    </header>
  );
}
