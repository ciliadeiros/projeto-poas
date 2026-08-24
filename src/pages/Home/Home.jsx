import React from 'react';
import Header from '../../components/Header/Header';
import HeroCarousel from '../../components/HeroCarousel/HeroCarousel';
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid';
import GameCarousel from '../../components/GameCarousel/GameCarousel';
import { heroGames, categories, games } from '../../data/mockData';
import '../../styles/variables.css';
import './Home.css';

export default function Home() {
  return (
    <div className="glog-home">
      <Header activePage="catalogo" />
      <HeroCarousel games={heroGames} />
      <CategoryGrid categories={categories} />
      <GameCarousel title="Em alta" games={games} />
    </div>
  );
}
