import React, { useState } from 'react';
import Logo from '../../components/Logo/Logo';
import FormInput from '../../components/FormInput/FormInput';
import AuthButton from '../../components/AuthButton/AuthButton';
import '../../styles/variables.css';
import './LoginPage.css';

/**
 * Tela de Login
 * Estrutura (conforme protótipo Figma):
 * login-page (frame 1920x1080)
 *  ├─ Logo
 *  └─ content
 *      ├─ título "LOG IN"
 *      ├─ input E-mail
 *      ├─ input Senha
 *      ├─ botão "FAZER LOG IN"
 *      └─ link → página de cadastro
 */
export default function LoginPage() {
  const [form, setForm] = useState({ email: '', senha: '' });

  const handleChange = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  function handleSubmit(event) {
    event.preventDefault();
    // TODO: integrar com POST /auth/login da API GameLog
    console.log('login:', form);
  }

  return (
    <div className="login-page">
      <div className="login-page__bg" aria-hidden="true" />
      <div className="login-page__overlay" aria-hidden="true" />

      <div className="login-page__logo">
        <Logo size="md" />
      </div>

      <div className="content">
        <h1 className="titulo">LOG IN</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <FormInput
            id="email"
            label="E-mail:"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            required
          />
          <FormInput
            id="senha"
            label="Senha:"
            type="password"
            value={form.senha}
            onChange={handleChange('senha')}
            required
          />

          <AuthButton type="submit">FAZER LOG IN</AuthButton>
        </form>

        <a href="/cadastro" className="link-cadastro">
          Não possui uma conta? Clique aqui e faça seu cadastro!
        </a>
      </div>
    </div>
  );
}
