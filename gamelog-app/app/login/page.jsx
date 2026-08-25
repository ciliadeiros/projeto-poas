"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";

import styles from "./page.module.css";

function FormInput({
  id,
  label,
  type = "text",
  value,
  onChange,
}) {
  return (
    <div className={styles["input-group"]}>
      <label
        className={styles["input-group__label"]}
        htmlFor={id}
      >
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        className={styles["input-group__field"]}
        placeholder="Digite:"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      await login({
        email: form.email,
        senha: form.senha,
      });

      // TODO: trocar por uma rota de dashboard/biblioteca quando ela existir
      router.push("/");
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Não foi possível fazer login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["login-page"]}>
      <div
        className={styles["login-page__bg"]}
        aria-hidden="true"
      />

      <div
        className={styles["login-page__overlay"]}
        aria-hidden="true"
      />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.logo}
        alt="GameLog"
        src="/images/logo.png"
      />

      <div className={styles["login-content"]}>
        <h1 className={styles["login-title"]}>
          LOG IN
        </h1>

        <form
          className={styles["login-form"]}
          onSubmit={handleSubmit}
        >
          <FormInput
            id="email"
            label="E-mail:"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
          />

          <FormInput
            id="senha"
            label="Senha:"
            type="password"
            value={form.senha}
            onChange={handleChange("senha")}
          />

          {error && (
            <p
              role="alert"
              className={styles.erro}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className={styles["botao-login"]}
            disabled={loading}
          >
            {loading
              ? "Entrando..."
              : "FAZER LOG IN"}
          </button>
        </form>

        <a
          href="/cadastro"
          className={styles["link-cadastro"]}
        >
          Não possui uma conta? Clique aqui e faça seu cadastro!
        </a>
      </div>
    </div>
  );
}