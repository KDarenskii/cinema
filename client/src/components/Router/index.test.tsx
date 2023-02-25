import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { act } from "react-dom/test-utils";
import { USER_ROLES } from "../../constants/userRoles";
import { setUser } from "../../store/user/userSlice";
import { renderTestComponent } from "../../tests/helpers/renderTestComponent";
import App from "../App";

describe("Router", () => {
    let user: UserEvent;

    beforeEach(async () => {
        user = userEvent.setup();
    });

    describe("Unauthenticated routing", () => {
        test("should navigate to page that does not require authentication when clicking on link", async () => {
            await act(async () => {
                renderTestComponent(<App />);
            });
            const homeLink = await screen.findByRole("link", { name: /home page/i });
            const moviesLink = await screen.findByRole("link", { name: /movies page/i });
            const serialsLink = await screen.findByRole("link", { name: /serials page/i });
            expect(screen.getByRole("heading", { name: /recommended for you/i })).toBeInTheDocument();
            await user.click(moviesLink);
            expect(await screen.findByRole("heading", { name: /Movies/i })).toBeInTheDocument();
            await user.click(serialsLink);
            expect(await screen.findByRole("heading", { name: /TV Series/i })).toBeInTheDocument();
            await user.click(homeLink);
            expect(await screen.findByRole("heading", { name: /Recommended for you/i })).toBeInTheDocument();
        });

        test("should redirect to login page when navigating to pages that require authentication and user is not logged in", async () => {
            await act(async () => {
                renderTestComponent(<App />);
            });
            const bookmarksLink = await screen.findByRole("link", { name: /Bookmarks page/i });
            await user.click(bookmarksLink);
            expect(screen.getByRole("heading", { name: /log in/i })).toBeInTheDocument();
        });

        test("should redirect to missing page when trying to access unknown page", async () => {
            await act(async () => {
                renderTestComponent(<App />, { initialRoute: "/unknown-page" });
            });
            expect(screen.getByText(/404 page is not found/i)).toBeInTheDocument();
        });
    });

    describe("Authenticated routing", () => {
        test("should navigate to page that require authentication and user is logged in", async () => {
            const { store } = renderTestComponent(<App />);
            store.dispatch(
                setUser({
                    isAuth: true,
                    user: {
                        email: "user@mail.com",
                        nickname: "user",
                        id: "1",
                        roles: [USER_ROLES.USER],
                    },
                })
            );
            const bookmarksLink = await screen.findByRole("link", { name: /Bookmarks page/i });
            await user.click(bookmarksLink);
            expect(await screen.findByRole("heading", { name: /Bookmarked movies/i })).toBeInTheDocument();
        });
    });
});
