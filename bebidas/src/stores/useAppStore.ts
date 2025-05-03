import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createRecipeSlice, RecipeSliceType } from './recipeSlice'
import { FavoritesScileType, createFavoritesSlice } from './favoritesSlice'
import { createNotificationSlice, NotificationScileType } from './notificationSlice'
import { createAISlice, AiSliceType } from './aiSlice'

export const useAppStore = create<RecipeSliceType & FavoritesScileType & NotificationScileType & AiSliceType>()(devtools((...a)=> ({
    ...createRecipeSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
    ...createAISlice(...a)
})))