import React from 'react';
import './AuthButton.css';

/**
 * Botão usado em Login, Cadastro e Página Inicial.
 * Renderiza <a> quando `href` é passado (ex: "FAÇA LOG IN" na landing),
 * ou <button> para submits de formulário (ex: "CADASTRAR").
 *
 * variant:
 *  - "solid"   → vermelho preenchido (padrão, ação primária)
 *  - "outline" → contorno branco (ação secundária, ex: 2º botão da landing)
 */
export default function AuthButton({
  children,
  href,
  type = 'button',
  variant = 'solid',
  ...props
}) {
  const className = `glog-auth-btn glog-auth-btn--${variant}`;

  if (href) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={className} {...props}>
      {children}
    </button>
  );
}
