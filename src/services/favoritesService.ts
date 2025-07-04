import type { Recipe } from '../types/Recipe';

const FAVORITES_KEY = 'favoriteRecipes';

export function getFavorites(): Recipe[] {
  const data = localStorage.getItem(FAVORITES_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}
//Con el localStorage almaceno las recetas favoritas//
export function addFavorite(recipe: Recipe) {
  const favorites = getFavorites();
  if (!favorites.find(r => r.id === recipe.id)) {
    favorites.push(recipe);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}
//Acá elimino las recetas favoritas/
export function removeFavorite(recipeId: number) {
  const favorites = getFavorites().filter(r => r.id !== recipeId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}
//Es para verificar que una receta es favorita//
export function isFavorite(recipeId: number): boolean {
  return getFavorites().some(r => r.id === recipeId);
}
