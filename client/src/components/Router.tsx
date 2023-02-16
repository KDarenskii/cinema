import React from "react";
import { Routes, Route } from "react-router-dom";
import {
    BOOKMARKS_ROUTE,
    HOME_ROUTE,
    MOVIES_ROUTE,
    SERIALS_ROUTE,
    CINEMA_ROUTE,
    ACTOR_ROUTE,
    REGISTER_ROUTE,
    LOGIN_ROUTE,
} from "../constants/routesPathnames";
import MainLayout from "../layouts/MainLayout/MainLayout";
import ActorPage from "../pages/ActorPage";
import BookmarksPage from "../pages/BookmarksPage";
import CinemaPage from "../pages/CinemaPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MoviesPage from "../pages/MoviesPage";
import RegisterPage from "../pages/RegisterPage";
import SerialsPage from "../pages/SerialsPage";

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path={HOME_ROUTE} element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path={MOVIES_ROUTE} element={<MoviesPage />} />
                <Route path={SERIALS_ROUTE} element={<SerialsPage />} />
                <Route path={BOOKMARKS_ROUTE} element={<BookmarksPage />} />
                <Route path={CINEMA_ROUTE} element={<CinemaPage />} />
                <Route path={ACTOR_ROUTE} element={<ActorPage />} />
                <Route path={REGISTER_ROUTE} element={<RegisterPage />} />
                <Route path={LOGIN_ROUTE} element={<LoginPage />} />
            </Route>
        </Routes>
    );
};

export default Router;
