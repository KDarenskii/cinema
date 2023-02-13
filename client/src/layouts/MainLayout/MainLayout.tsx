import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Container from "../../components/Container";
import Sidebar from "../../components/Sidebar";

import "./styles.scss";

const MainLayout: React.FC = () => {
    return (
        <div className="main-layout">
            <Container>
            <ToastContainer />
                <div className="main-layout__wrapper">
                    <Sidebar />
                    <main className="main-layout__content">
                        <Outlet />
                    </main>
                </div>
            </Container>
        </div>
    );
};

export default MainLayout;
