import React from 'react';
import Logo from '../../components/Logo/Logo';
import AuthButton from '../../components/AuthButton/AuthButton';
import '../../styles/variables.css';
import './PaginaInicial.css';

/**
 * Página Inicial (landing pública)
 * Primeira tela vista pelo usuário ao entrar no site — antes do login.
 * A Home (catálogo, em src/pages/Home) só é acessada depois de autenticado.
 *
 * Estrutura (conforme protótipo Figma):
 * pagina-inicial (frame 1920x1100)
 *  ├─ imagem de fundo + gradiente
 *  ├─ logo (grande, estilo hero)
 *  ├─ 3 blocos de destaque (Explorar / Organizar / Detalhes)
 *  └─ botões "FAÇA LOG IN" e "CADASTRE-SE"
 */
const features = [
  {
    id: 'explorar',
    label: 'Explore o catálogo',
  },
  {
    id: 'organizar',
    label: 'Organize sua biblioteca!',
  },
  {
    id: 'detalhes',
    label: 'Veja os detalhes sobre o jogo',
  },
];

export default function PaginaInicial() {
  return (
    <div className="pagina-inicial">
      <div className="pagina-inicial__bg" aria-hidden="true" />
      <div className="pagina-inicial__gradiente" aria-hidden="true" />

      <div className="pagina-inicial__logo">
        <Logo size="lg" />
      </div>

      <div className="pagina-inicial__imagens">
        {features.map((feature) => (
          <div key={feature.id} className="pagina-inicial__feature">
            <span className="pagina-inicial__feature-label">{feature.label}</span>
            <div className="pagina-inicial__feature-image" aria-hidden="true" />
          </div>
        ))}
      </div>

      <div className="pagina-inicial__botoes">
        <AuthButton href="/login">FAÇA LOG IN</AuthButton>
        <AuthButton href="/cadastro" variant="outline">
          CADASTRE-SE
        </AuthButton>
      </div>
    </div>
  );
}
