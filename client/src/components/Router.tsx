import React, { lazy, Suspense } from "react";
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
    UNAUTHORIZED_ROUTE,
    MISSING_ROUTE,
} from "../constants/routesPathnames";
import { USER_ROLES } from "../constants/userRoles";
import MainLayout from "../layouts/MainLayout/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MissingPage from "../pages/MissingPage";
import RegisterPage from "../pages/RegisterPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import PageLoader from "./PageLoader";
import ProtectedRoute from "./ProtectedRoute";

const Serials = lazy(() => import(/*webpackChunkName: "Serials"*/ "../pages/SerialsPage"));
const Movies = lazy(() => import(/*webpackChunkName: "Movies"*/ "../pages/MoviesPage"));
const Cinema = lazy(() => import(/*webpackChunkName: "Cinema"*/ "../pages/CinemaPage"));
const Actor = lazy(() => import(/*webpackChunkName: "Actor"*/ "../pages/ActorPage"));
const Bookmarks = lazy(() => import(/*webpackChunkName: "Bookmarks"*/ "../pages/BookmarksPage"));

const Router: React.FC = () => {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route path={HOME_ROUTE} element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path={MOVIES_ROUTE} element={<Movies />} />
                    <Route path={SERIALS_ROUTE} element={<Serials />} />
                    <Route path={CINEMA_ROUTE} element={<Cinema />} />
                    <Route path={ACTOR_ROUTE} element={<Actor />} />
                    <Route path={REGISTER_ROUTE} element={<RegisterPage />} />
                    <Route path={LOGIN_ROUTE} element={<LoginPage />} />

                    <Route element={<ProtectedRoute roles={[USER_ROLES.USER, USER_ROLES.ADMIN]} />}>
                        <Route path={BOOKMARKS_ROUTE} element={<Bookmarks />} />
                    </Route>
                </Route>

                <Route path={UNAUTHORIZED_ROUTE} element={<UnauthorizedPage />} />
                <Route path={MISSING_ROUTE} element={<MissingPage />} />
            </Routes>
        </Suspense>
    );
};

export default Router;