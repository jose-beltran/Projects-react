import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"


export default function FavoritesPage() {

  const favorites = useAppStore((state) => state.favorites)
  const hasFavorites = useMemo(() => favorites.length, [favorites])

  return (
    <>
      <h1 className="text-6xl font-extrabold">Favoritos</h1>
      {hasFavorites ?(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
        {favorites.map((drink) => (
          <DrinkCard 
            key={drink.idDrink}
            drink={drink}
          />
        ))}
      </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-30">
          <h2 className="text-3xl font-bold">No tienes favoritos</h2>
          <p className="text-gray-500">Agrega algunos para verlos aquí.</p>
        </div>
      )}
    </>
  )
}
