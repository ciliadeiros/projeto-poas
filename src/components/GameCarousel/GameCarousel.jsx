import React, { useRef } from 'react';
import './GameCarousel.css';

const CARD_WIDTH = 337;
const CARD_GAP = 16;

export default function GameCarousel({ title, games }) {
  const trackRef = useRef(null);

  function scrollNext() {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({
      left: CARD_WIDTH + CARD_GAP,
      behavior: 'smooth',
    });
  }

  return (
    <section className="glog-game-carousel" aria-label={title || 'Jogos'}>
      <div className="glog-game-carousel__track" ref={trackRef}>
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <button
        className="glog-game-carousel__next"
        onClick={scrollNext}
        aria-label="Avançar carrossel de jogos"
        type="button"
      >
        <ArrowRightIcon />
      </button>
    </section>
  );
}

function GameCard({ game }) {
  return (
    <a href={`/jogos/${game.id}`} className="glog-game-card">
      <div
        className="glog-game-card__image"
        style={{ backgroundImage: `url(${game.image})` }}
      />
      <div className="glog-game-card__info">
        <h3 className="glog-game-card__title">{game.title}</h3>
        <div className="glog-game-card__tags">
          {game.categories.map((category) => (
            <span key={category} className="glog-game-card__tag">
              {category}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
