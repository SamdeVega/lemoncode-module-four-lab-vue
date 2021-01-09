import { Recipe } from "../../model";
import { mockRecipes } from "./mockData";

let recipes = mockRecipes;

export const fetchRecipes = (): Promise<Recipe[]> => {
  return Promise.resolve(recipes);
};

export const fetchRecipeById = (id: number): Promise<Recipe> => {
  const recipe = recipes.find((r) => r.id === id);
  return Promise.resolve(recipe as Recipe);
};

export const save = (recipe: Recipe): Promise<string> => {
  const index = recipes.findIndex((r) => r.id === recipe.id);

  return index >= 0 ? saveRecipeByIndex(index, recipe) : saveNewRecipe(recipe);
};

const saveRecipeByIndex = (index: number, recipe: Recipe): Promise<string> => {
  recipes = [...recipes.slice(0, index), recipe, ...recipes.slice(index + 1)];

  return Promise.resolve("Save recipe success");
};

const saveNewRecipe = (recipe: Recipe): Promise<string> => {
  recipe.id = recipes[recipes.length - 1].id + 1
  recipes = [...recipes, recipe]

  return Promise.resolve("Create recipe success")
}

export const deleteRecipe = (recipeId: number): Promise<Recipe[]> => {
  recipes = recipes.filter(recipe => recipe.id != recipeId)
  return Promise.resolve(recipes)
}
