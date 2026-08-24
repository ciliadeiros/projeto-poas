import React, { useState } from 'react';
import Logo from '../../components/Logo/Logo';
import FormInput from '../../components/FormInput/FormInput';
import AuthButton from '../../components/AuthButton/AuthButton';
import '../../styles/variables.css';
import './CadastroPage.css';

/**
 * Tela de Cadastro
 * Estrutura (conforme protótipo Figma):
 * cadastro-page (frame 1920x1080)
 *  ├─ Logo
 *  └─ content
 *      ├─ título "CADASTRE-SE"
 *      ├─ input Nome Completo
 *      ├─ input Nome de Usuário
 *      ├─ input E-mail
 *      ├─ input Senha
 *      ├─ botão "CADASTRAR"
 *      └─ link → página de login
 */
export default function CadastroPage() {
  const [form, setForm] = useState({
    nomeCompleto: '',
    nomeUsuario: '',
    email: '',
    senha: '',
  });

  const handleChange = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  function handleSubmit(event) {
    event.preventDefault();
    // TODO: integrar com POST /auth/cadastro da API GameLog
    console.log('cadastro:', form);
  }

  return (
    <div className="cadastro-page">
      <div className="cadastro-page__bg" aria-hidden="true" />
      <div className="cadastro-page__overlay" aria-hidden="true" />

      <div className="cadastro-page__logo">
        <Logo size="md" />
      </div>

      <div className="content">
        <h1 className="titulo">CADASTRE-SE</h1>

        <form className="cadastro-form" onSubmit={handleSubmit}>
          <FormInput
            id="nomeCompleto"
            label="Nome Completo:"
            value={form.nomeCompleto}
            onChange={handleChange('nomeCompleto')}
            required
          />
          <FormInput
            id="nomeUsuario"
            label="Nome de Usuário:"
            value={form.nomeUsuario}
            onChange={handleChange('nomeUsuario')}
            required
          />
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

          <AuthButton type="submit">CADASTRAR</AuthButton>
        </form>

        <a href="/login" className="link-login">
          Já possui cadastro? Clique aqui e faça log in!
        </a>
      </div>
    </div>
  );
}
