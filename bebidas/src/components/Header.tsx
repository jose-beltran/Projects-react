import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: "",
  });
  const location = useLocation();

  const isHomePage = useMemo(
    () => location.pathname === "/",
    [location.pathname]
  );

  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const categories = useAppStore((state) => state.categories);
  const searchRecipies = useAppStore((state) => state.searchRecipies);
  const showNotification = useAppStore((state) => state.showNotification);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(searchFilters).includes("")) {
      showNotification({
        text: "Por favor completa todos los campos",
        error: true,
      });
      return;
    }
    //Consultar las recetas
    searchRecipies(searchFilters);
  };

  return (
    <header
      className={
        isHomePage ? "bg-[url(/bg.jpg)] bg-center bg-cover" : "bg-slate-800"
      }
    >
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center ">
          <div>
            <img src="/logo.svg" alt="logo" className="w-32" />
          </div>
          <nav className="flex gap-10 text-slate-300 text-lg ">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold border-b-2 border-orange-500"
                  : "text-white uppercase font-bold"
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold border-b-2 border-orange-500"
                  : "text-white uppercase font-bold"
              }
            >
              Favoritos
            </NavLink>
            <NavLink
              to="/generarIA"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold border-b-2 border-orange-500"
                  : "text-white uppercase font-bold"
              }
            >
              Generar con IA
            </NavLink>
          </nav>
        </div>
        {isHomePage && (
          <form
            className="md:w-1/2 2xl:w-1/3 bg-orange-400 p-10 rounded-lg my-32 shadow space-y-6 "
            onSubmit={handleSubmit}
          >
            <div className="space-y-4 ">
              <label
                htmlFor="ingredient"
                className="block text-white font-bold text-lg"
              >
                Nombre o Ingredientes
              </label>
              <input
                id="ingredient"
                type="text"
                name="ingredient"
                className="p-3 w-full bg-white rounded-lg focus:outline-none "
                placeholder="Nombre o ingrediente. Ej. Vodka, Tequila, Café"
                onChange={handleChange}
                value={searchFilters.ingredient}
              />
            </div>
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-white font-bold text-lg"
              >
                Categoría
              </label>
              <select
                id="category"
                name="category"
                className="p-3 w-full bg-white rounded-lg focus:outline-none "
                onChange={handleChange}
                value={searchFilters.category}
              >
                <option value="">-- Selecciona una categoría --</option>
                {categories.drinks.map((category) => (
                  <option
                    key={category.strCategory}
                    value={category.strCategory}
                  >
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value="Buscar Recetas"
              className="cursor-pointer text-white bg-orange-800 hover:bg-orange-900 font-bold w-full p-3 rounded-lg"
            />
          </form>
        )}
      </div>
    </header>
  );
}
