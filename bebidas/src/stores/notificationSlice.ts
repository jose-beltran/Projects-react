import { StateCreator } from'zustand'
import { FavoritesScileType } from './favoritesSlice'

type NotificationSliceType = {
    text: string
    error: boolean
    show: boolean
}

export type NotificationScileType = {
    notification: NotificationSliceType
    showNotification: (payload: Pick<NotificationSliceType, 'text' | 'error'>) => void
    hideNotification: () => void
}

export const createNotificationSlice: StateCreator<NotificationScileType & FavoritesScileType, [], [], NotificationScileType> = (set, get) => ({
    notification: {
        text: '',
        error: false,
        show: false,
    },
    showNotification: (payload) => {
        set({
            notification: {
                text: payload.text,
                error: payload.error,
                show: true,
            },
        })
        setTimeout(()=> {
            get().hideNotification()
        }, 5000)
    },
    hideNotification: () => {
        set({
            notification: {
                text: '',
                error: false,
                show: false,
            },
        })
    },
})