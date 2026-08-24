import React, { useState } from 'react';
// Troque por <Link> do react-router-dom se o projeto já usar roteamento
import Logo from '../Logo/Logo';
import './Header.css';

export default function Header({ activePage = 'catalogo' }) {
  const [search, setSearch] = useState('');

  function handleSearchSubmit(event) {
    event.preventDefault();
    // TODO: integrar com a rota de busca (ex: /busca?q=...)
    console.log('Buscar jogo:', search);
  }

  return (
    <header className="glog-header">
      <div className="glog-header__top">
        <Logo size="sm" href="/catalogo" />

        <nav className="glog-header__nav" aria-label="Navegação principal">
          <a
            href="/catalogo"
            className={`glog-header__link ${activePage === 'catalogo' ? 'is-active' : ''}`}
          >
            Catálogo
          </a>
          <a
            href="/biblioteca"
            className={`glog-header__link ${activePage === 'biblioteca' ? 'is-active' : ''}`}
          >
            Biblioteca
          </a>
        </nav>

        <div className="glog-header__actions">
          <a href="/perfil" className="glog-header__profile">
            <UserIcon />
            <span>Perfil</span>
          </a>
          <button className="glog-header__settings" aria-label="Configurações" type="button">
            <GearIcon />
          </button>
        </div>
      </div>

      <form className="glog-header__search" onSubmit={handleSearchSubmit} role="search">
        <input
          type="search"
          placeholder="PESQUISAR JOGO"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Pesquisar jogo"
        />
        <button type="submit" aria-label="Pesquisar">
          <SearchIcon />
        </button>
      </form>
    </header>
  );
}

function UserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" fill="currentColor" />
      <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" fill="currentColor" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
