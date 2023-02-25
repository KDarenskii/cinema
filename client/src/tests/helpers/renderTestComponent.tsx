import { PreloadedState } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Router from "../../components/Router";
import { HOME_ROUTE } from "../../constants/routesPathnames";
import { AppStore, RootState, setupStore } from "../../store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore;
    initialRoute?: string;
}

export const renderTestComponent = (
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = setupStore(preloadedState),
        initialRoute = HOME_ROUTE,
        ...renderOptions
    }: ExtendedRenderOptions = {}
) => {
    const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
        return (
            <MemoryRouter initialEntries={[initialRoute]}>
                <Provider store={store}>{children}</Provider>
            </MemoryRouter>
        );
    };
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
