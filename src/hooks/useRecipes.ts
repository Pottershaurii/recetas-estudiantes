import { useContext, useState } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import type { Recipe } from '../types/Recipe';

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes debe ser usado dentro de un RecipeProvider');
  }
//Aqui declaro el filtro de dificultad//
  const [difficultyFilter, setDifficultyFilter] = useState<Recipe['dificultad'] | ''>('');

  const filterByDifficulty = (difficulty: Recipe['dificultad']) => {
    return context.recetas.filter(receta => receta.dificultad === difficulty);
  };

  return {
    ...context,
    difficultyFilter,
    setDifficultyFilter,
    filterByDifficulty,
  };
};