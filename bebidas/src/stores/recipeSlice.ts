import { StateCreator } from "zustand";
import {
  getCategories,
  getRecipeById,
  getRecipies,
} from "../services/RecipeService";
import type { Categories, SearchFilter, Drinks, Drink, Recipe } from "../types";

export type RecipeSliceType = {
  categories: Categories;
  drinks: Drinks;
  selectedRecipe: Recipe;
  modal: boolean;
  fetchCategories: () => Promise<void>;
  searchRecipies: (searchFilter: SearchFilter) => Promise<void>;
  selectRecipe: (id: Drink["idDrink"]) => Promise<void>;
  closeModal: () => void;
};

export const createRecipeSlice: StateCreator<RecipeSliceType> = (set) => ({
  categories: {
    drinks: [],
  },
  drinks: {
    drinks: [],
  },
  modal: false,
  selectedRecipe: {} as Recipe,
  fetchCategories: async () => {
    const categories = await getCategories();
    set({ categories });
  },
  searchRecipies: async (filters) => {
    const drinks = await getRecipies(filters);
    set({ drinks });
  },
  selectRecipe: async (id) => {
    const selectedRecipe = await getRecipeById(id);
    set({ selectedRecipe, modal: true });
  },
  closeModal: () => set({ modal: false, selectedRecipe: {} as Recipe }),
});
