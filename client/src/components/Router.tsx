import React from "react";
import { Routes, Route } from "react-router-dom";
import { HOME_ROUTE } from "../constants/routesPathnames";
import MainLayout from "../layouts/MainLayout/MainLayout";
import HomePage from "../pages/HomePage";

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path={HOME_ROUTE} element={<MainLayout />}>
                <Route index element={<HomePage />} />
            </Route>
        </Routes>
    );
};

export default Router;
