import React, { useState } from 'react';
import './HeroCarousel.css';

export default function HeroCarousel({ games }) {
  const [current, setCurrent] = useState(0);

  if (!games || games.length === 0) return null;

  const game = games[current];

  function goPrev() {
    setCurrent((prev) => (prev === 0 ? games.length - 1 : prev - 1));
  }

  function goNext() {
    setCurrent((prev) => (prev === games.length - 1 ? 0 : prev + 1));
  }

  return (
    <section
      className="glog-hero"
      style={{ backgroundImage: `url(${game.image})` }}
      aria-label={`Destaque: ${game.title}`}
    >
      <div className="glog-hero__overlay" />

      <button
        className="glog-hero__arrow glog-hero__arrow--left"
        onClick={goPrev}
        aria-label="Jogo anterior"
        type="button"
      >
        <ArrowIcon direction="left" />
      </button>

      <div className="glog-hero__content">
        <h1 className="glog-hero__title">{game.title}</h1>
        <div className="glog-hero__categories">
          {game.categories.map((category) => (
            <span key={category} className="glog-hero__badge">
              {category}
            </span>
          ))}
        </div>
      </div>

      <button
        className="glog-hero__arrow glog-hero__arrow--right"
        onClick={goNext}
        aria-label="Próximo jogo"
        type="button"
      >
        <ArrowIcon direction="right" />
      </button>

      <div className="glog-hero__dots">
        {games.map((g, index) => (
          <button
            key={g.id}
            className={`glog-hero__dot ${index === current ? 'is-active' : ''}`}
            onClick={() => setCurrent(index)}
            aria-label={`Ir para destaque ${index + 1}`}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}

function ArrowIcon({ direction }) {
  const rotation = direction === 'left' ? 180 : 0;
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
