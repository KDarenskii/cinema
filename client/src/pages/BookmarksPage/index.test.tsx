import { renderTestComponent } from "../../tests/helpers/renderTestComponent";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { act, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { server } from "../../tests/moks/server";
import { DefaultBodyType, PathParams, rest } from "msw";
import App from "../../components/App";
import { AppStore } from "../../store";
import { setUser } from "../../store/user/userSlice";
import { USER_ROLES } from "../../constants/userRoles";
import { fetchBookmarks } from "../../store/bookmarks/thunks/fetchBookmarks";
import { BOOKMARK_ENDPOINT } from "../../constants/endPoints";
import { CINEMA_TYPE } from "../../constants/cinemaType";

describe("Bookmarks page component", () => {
    let user: UserEvent;

    beforeEach(() => {
        user = userEvent.setup();
    });

    describe("Successfull response", () => {
        beforeEach(async () => {
            let store: AppStore = {} as AppStore;
            act(() => (store = renderTestComponent(<App />).store));
            await waitForElementToBeRemoved(() => screen.getAllByTestId("page-loading"));
            store.dispatch(
                setUser({
                    isAuth: true,
                    user: { email: "user@mail.com", nickname: "user", id: "1", roles: [USER_ROLES.USER] },
                })
            );
            store.dispatch(fetchBookmarks());
            await user.click(screen.getByRole("link", { name: /Bookmarks page/i }));
        });

        test("should display mocked recommended items", async () => {
            expect(await screen.findByRole("heading", { name: /Movie title/i })).toBeInTheDocument();
            expect(await screen.findByRole("heading", { name: /Serial title/i })).toBeInTheDocument();
        });
    });

    describe("Error response", () => {
        beforeEach(async () => {
            server.use(
                rest.get<DefaultBodyType, PathParams>(BOOKMARK_ENDPOINT, (req, res, ctx) => {
                    return res(ctx.status(404), ctx.delay(500));
                })
            );
            let store: AppStore = {} as AppStore;
            act(() => (store = renderTestComponent(<App />).store));
            await waitForElementToBeRemoved(() => screen.getAllByTestId("page-loading"));
            store.dispatch(
                setUser({
                    isAuth: true,
                    user: { email: "user@mail.com", nickname: "user", id: "1", roles: [USER_ROLES.USER] },
                })
            );
            store.dispatch(fetchBookmarks());
            await user.click(screen.getByRole("link", { name: /Bookmarks page/i }));
        });

        test("should display an error when request fails", async () => {
            await waitForElementToBeRemoved(() => screen.getAllByTestId(/preview-loading/i));
            expect(screen.getByText("Request failed with status code 404")).toBeInTheDocument();
        });

        test("should display an error after clicking the retry button and request fails", async () => {
            await waitForElementToBeRemoved(() => screen.getAllByTestId(/preview-loading/i));
            expect(screen.getByText("Request failed with status code 404")).toBeInTheDocument();
            const retryButton = screen.getByRole("button", { name: /retry/i });
            await user.click(retryButton);
            await waitForElementToBeRemoved(() => screen.getAllByTestId(/preview-loading/i));
            expect(screen.getByText("Request failed with status code 404")).toBeInTheDocument();
        });

        test("should display mocked trending items after error and clicking retry button", async () => {
            await waitForElementToBeRemoved(() => screen.getAllByTestId(/preview-loading/i));
            expect(screen.getByText("Request failed with status code 404")).toBeInTheDocument();
            server.resetHandlers();
            server.use(
                rest.get<DefaultBodyType, PathParams, DefaultBodyType>(BOOKMARK_ENDPOINT, (req, res, ctx) => {
                    return res(
                        ctx.delay(500),
                        ctx.json([
                            {
                                imageSrc: "Src",
                                title: "Movie title",
                                type: CINEMA_TYPE.MOVIE,
                                age: 16,
                                year: "2000",
                                duration: 2,
                                id: "1",
                            },
                            {
                                imageSrc: "Src",
                                title: "Serial title",
                                type: CINEMA_TYPE.SERIAL,
                                age: 16,
                                year: "2000",
                                duration: 2,
                                id: "1",
                            },
                        ])
                    );
                })
            );
            const retryButton = screen.getByRole("button", { name: /retry/i });
            await user.click(retryButton);
            await waitForElementToBeRemoved(() => screen.getAllByTestId(/preview-loading/i));
            expect(screen.getByRole("heading", { name: /movie title/i })).toBeInTheDocument();
            expect(screen.getByRole("heading", { name: /serial title/i })).toBeInTheDocument();
        });
    });
});