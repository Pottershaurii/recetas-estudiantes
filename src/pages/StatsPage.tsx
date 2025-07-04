import React from 'react';
import { useRecipes } from '../hooks/useRecipes';

const StatsPage: React.FC = () => {
  const { recetas } = useRecipes();

  const totalRecetas = recetas.length;

  const recetasPorCategoria: Record<string, number> = {};
  recetas.forEach(receta => {
    recetasPorCategoria[receta.categoria] = (recetasPorCategoria[receta.categoria] || 0) + 1;
  });

  const recetaMasPopular = recetas.reduce((max, receta) =>
    receta.valoracion > max.valoracion ? receta : max,
    recetas[0]
  );
//Aqui me retorna la pagina de estadísticas, algunos style opté por ponerlos aquí para que no haya interferencia con los que ya están en app.css, otros estilos como el de las cards si las coloqué en el archivo App.css//
  return (
    <div className="stats-page">
      <h2 style={{ textAlign: 'center', marginBottom: 32, color: '#2d3748', letterSpacing: 1 }}>Estadísticas de Recetas</h2>
      <div className="stats-cards" style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg,#667eea 100%,#764ba2 100%)', boxShadow: '0 4px 24px #fda08544', padding: 28, borderRadius: 18, minWidth: 220, textAlign: 'center', color: '#2d3748', transition: 'transform 0.2s', fontWeight: 500 }}>
          <h3 style={{ fontSize: 20, marginBottom: 12, letterSpacing: 0.5 }}>Total de Recetas</h3>
          <p style={{ fontSize: 48, fontWeight: 'bold', margin: 0 }}>{totalRecetas}</p>
        </div>
        <div className="stat-card">
          <h3 style={{ fontSize: 20, marginBottom: 12, letterSpacing: 0.5 }}>Recetas por Categoría</h3>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: 18 }}>
            {Object.entries(recetasPorCategoria).map(([cat, count]) => (
              <li key={cat} style={{ margin: '6px 0', fontWeight: 600 }}><span style={{ color: '#f76d6d' }}>●</span> <b>{cat}:</b> {count}</li>
            ))}
          </ul>
        </div>
        <div className="stat-card">
          <h3 style={{ fontSize: 20, marginBottom: 12, letterSpacing: 0.5 }}>Receta más Popular</h3>
          <p style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>{recetaMasPopular.nombre}</p>
          <p style={{ fontSize: 18, margin: 0, color: '#000000' }}>Valoración: <b>{recetaMasPopular.valoracion}</b> <span style={{ fontSize: 22 }}>⭐</span></p>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
