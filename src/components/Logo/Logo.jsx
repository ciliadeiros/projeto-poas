import React from 'react';
import './Logo.css';

/**
 * size:
 *  - "sm" → usado no Header (topo das páginas internas)
 *  - "md" → usado em Login / Cadastro
 *  - "lg" → usado na Página Inicial (landing), onde o logo é o elemento hero
 */
export default function Logo({ size = 'sm', href = '/' }) {
  return (
    <a href={href} className={`glog-logo glog-logo--${size}`} aria-label="GameLog">
      <span className="glog-logo__game">GAME</span>
      <span className="glog-logo__log">LOG</span>
    </a>
  );
}
