import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HOME_ROUTE } from "../../constants/routesPathnames";

export const renderWithRouter = (children: React.ReactNode, initialRoute: string = HOME_ROUTE) => {
    return render(
        <MemoryRouter initialEntries={[initialRoute]}>
            {children}
        </MemoryRouter>
    );
};
