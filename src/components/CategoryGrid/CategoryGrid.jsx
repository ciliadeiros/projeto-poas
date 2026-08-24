import React from 'react';
import './CategoryGrid.css';

export default function CategoryGrid({ categories }) {
  return (
    <section className="glog-categories" aria-label="Categorias de jogos">
      <a href="/catalogo/categorias" className="glog-categories__see-more">
        Ver mais categorias →
      </a>

      <div className="glog-categories__grid">
        {categories.map((category) => (
          <CategoryButton key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}

function CategoryButton({ category }) {
  return (
    <a
      href={`/catalogo?categoria=${category.id}`}
      className="glog-category-btn"
      style={{ backgroundImage: `url(${category.image})` }}
    >
      <span className="glog-category-btn__overlay" />
      <span className="glog-category-btn__label">{category.label}</span>
    </a>
  );
}
