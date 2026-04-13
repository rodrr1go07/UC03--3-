import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminFilmesPage from "./pages/admin/AdminFilmesPage";
import FilmesUsuarioPage from "./pages/user/FilmesUsuarioPage";
import FilmeDetalhePage from "./pages/filmeDetalhePage/FilmeDetalhePage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import LoginPage from "./pages/login/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

export default function App() {
  return (
    <>

      <BrowserRouter>
        <div className="app-shell">
          <Header />
          <main className="app-content">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/filmes" element=
                {
                  <PrivateRoute>
                    <FilmesUsuarioPage />
                  </PrivateRoute>
                } />

              <Route path="/filmes/:id" element=
                {
                  <PrivateRoute>
                    <FilmeDetalhePage />
                  </PrivateRoute>
                } />
              <Route path="/admin" element=
                {
                  <PrivateRoute role="ADMIN">
                    <AdminFilmesPage />
                  </PrivateRoute>
                } />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>

    </>
  )
}