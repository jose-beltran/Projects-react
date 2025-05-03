import { StateCreator } from'zustand'
import { Recipe } from '../types'
import { createNotificationSlice, NotificationScileType } from './notificationSlice'


export type FavoritesScileType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe: Recipe) => void
    favoriteExist: (id: Recipe['idDrink']) => boolean
    loadFromStorage: () => void
}

export const createFavoritesSlice: StateCreator<FavoritesScileType & NotificationScileType, [], [], FavoritesScileType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if(get().favoriteExist(recipe.idDrink)) {
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            }))
            createNotificationSlice(set, get, api).showNotification({text: 'Receta eliminada de favoritos', error: true})
        } else {
            set((state) => ({
                favorites: [...state.favorites, recipe]
            }))
            createNotificationSlice(set, get, api).showNotification({text: 'Receta agregada a favoritos', error: false})
        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExist: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        const favorites = localStorage.getItem('favorites')
        if(favorites){
            set({favorites: JSON.parse(favorites)})
        }
    }
})