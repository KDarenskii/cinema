import { PreloadedState } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { AppStore, RootState, setupStore } from "../../store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore;
}

export const renderWithProviders = (
    ui: React.ReactElement,
    { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions }: ExtendedRenderOptions = {}
) => {
    const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
        return <Provider store={store}>{children}</Provider>;
    };
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
