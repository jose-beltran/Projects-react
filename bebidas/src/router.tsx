import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";

const IndexPage = lazy(() => import("./pages/IndexPage"));
const FavoritesPages = lazy(() => import("./pages/FavoritesPage"));
const GenerateAI = lazy(() => import("./pages/GenerateAI"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <Suspense fallback="Cargando...">
                <IndexPage />
              </Suspense>
            }
          />
          <Route
            path="/favoritos"
            element={
              <Suspense fallback="Cargando...">
                <FavoritesPages />
              </Suspense>
            }
          />
          <Route
            path="/generarIA"
            element={
              <Suspense fallback="Cargando...">
                <GenerateAI />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
