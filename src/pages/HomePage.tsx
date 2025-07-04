import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../hooks/useRecipes';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';

const HomePage: React.FC = () => {
  const { recetas } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');

  
  const recetasFiltradas = searchTerm
    ? recetas.filter(r => r.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    : recetas;

  // Obtener las recetas más valoradas (top 3)
  const recetasDestacadas = recetasFiltradas
    .sort((a, b) => b.valoracion - a.valoracion)
    .slice(0, 3);

  // Obtener recetas rápidas (menos de 20 minutos)
  const recetasRapidas = recetasFiltradas
    .filter(receta => receta.tiempo <= 20)
    .slice(0, 3);

  return (
    <div className="home-page">
      <div style={{ maxWidth: 500, margin: '0 auto', marginBottom: 32 }}>
        <SearchBar onSearch={setSearchTerm} />
      </div>

      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">🍳 Recetas para Estudiantes</h1>
          <p className="hero-subtitle">
            Deliciosas recetas fáciles, rápidas y económicas para estudiantes universitarios
          </p>
          <div className="hero-buttons">
            <Link to="/recetas" className="cta-button primary">
              Explorar Recetas
            </Link>
            <Link to="/crear" className="cta-button secondary">
              Crear Mi Receta
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <h2 className="section-title">⭐ Recetas Más Valoradas</h2>
        <div className="recipes-grid">
          {recetasDestacadas.map(receta => (
            <RecipeCard key={receta.id} recipe={receta} />
          ))}
        </div>
        <div className="section-footer">
          <Link to="/recetas" className="view-all-link">
            Ver todas las recetas →
          </Link>
        </div>
      </section>

      <section className="quick-section">
        <h2 className="section-title">⚡ Recetas Rápidas</h2>
        <p className="section-subtitle">Perfectas para cuando tienes poco tiempo</p>
        <div className="recipes-grid">
          {recetasRapidas.map(receta => (
            <RecipeCard key={receta.id} recipe={receta} />
          ))}
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">{recetas.length}</span>
            <span className="stat-label">Recetas</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {Math.round(recetas.reduce((acc, r) => acc + r.tiempo, 0) / recetas.length)}
            </span>
            <span className="stat-label">Min Promedio</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {recetas.filter(r => r.dificultad === 'fácil').length}
            </span>
            <span className="stat-label">Recetas Fáciles</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;