/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Recipe } from '../types/Recipe';
import recetasData from '../data/recetas.json';
import { getFavorites, addFavorite, removeFavorite, isFavorite } from '../services/favoritesService';

interface RecipeContextType {
  recetas: Recipe[];
  favoritos: number[];
  addToFavoritos: (id: number) => void;
  removeFromFavoritos: (id: number) => void;
  isFavorito: (id: number) => boolean;
  addReceta: (receta: Omit<Recipe, 'id'>) => void;
}

export const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [recetas, setRecetas] = useState<Recipe[]>(recetasData.recetas as Recipe[]);
  const [favoritos, setFavoritos] = useState<number[]>([]);

  // useEffect para cargar favoritos del localStorage
  useEffect(() => {
    const favoritosGuardados = getFavorites().map(r => r.id);
    setFavoritos(favoritosGuardados);
  }, []);

  useEffect(() => {
    const recetasFavoritas = recetas.filter(r => favoritos.includes(r.id));
    localStorage.setItem('favoriteRecipes', JSON.stringify(recetasFavoritas));
  }, [favoritos, recetas]);

  const addToFavoritos = (id: number) => {
    const receta = recetas.find(r => r.id === id);
    if (receta) {
      addFavorite(receta);
      setFavoritos(prev => [...prev, id]);
    }
  };

  const removeFromFavoritos = (id: number) => {
    removeFavorite(id);
    setFavoritos(prev => prev.filter(favId => favId !== id));
  };

  const isFavorito = (id: number) => {
    return isFavorite(id);
  };

  const addReceta = (nuevaReceta: Omit<Recipe, 'id'>) => {
    const newId = Math.max(...recetas.map(r => r.id)) + 1;
    const receta: Recipe = {
      ...nuevaReceta,
      id: newId
    };
    setRecetas(prev => [...prev, receta]);
  };

  const value = {
    recetas,
    favoritos,
    addToFavoritos,
    removeFromFavoritos,
    isFavorito,
    addReceta,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};

