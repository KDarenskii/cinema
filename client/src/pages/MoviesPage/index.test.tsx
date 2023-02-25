import { renderTestComponent } from "../../tests/helpers/renderTestComponent";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { act, screen, waitForElementToBeRemoved } from "@testing-library/react";
import MoviesPage from ".";
import { server } from "../../tests/moks/server";
import { DefaultBodyType, PathParams, rest } from "msw";
import { ITrailer } from "../../models/cinema";
import { CINEMA_TYPE } from "../../constants/cinemaType";
import { TRAILER_ENDPOINT } from "../../constants/endPoints";

describe("Movies page component", () => {
    describe("Successfull response", () => {
        beforeEach(async () => {
            act(() => renderTestComponent(<MoviesPage />));
            await waitForElementToBeRemoved(() => screen.getAllByTestId("preview-loading"));
        });

        test("should display mocked recommended items", () => {
            expect(screen.getByRole("heading", { name: /Movies/i })).toBeInTheDocument();
            expect(screen.getAllByRole("heading", { name: /Trailer title/i })).toHaveLength(1);
        });
    });

    describe("Error response", () => {
        let user: UserEvent;
        beforeEach(async () => {
            user = userEvent.setup();
            server.use(
                rest.get<DefaultBodyType, PathParams>(TRAILER_ENDPOINT, (req, res, ctx) => {
                    return res(ctx.status(404), ctx.delay(200));
                })
            );
            act(() => renderTestComponent(<MoviesPage />));
            await waitForElementToBeRemoved(() => screen.getAllByTestId("preview-loading"));
        });

        test("should display an error when request fails", () => {
            expect(screen.getByText("Request failed with status code 404")).toBeInTheDocument();
        });

        test("should display an error after clicking the retry button and request fails", async () => {
            expect(screen.getByText("Request failed with status code 404")).toBeInTheDocument();
            const retryButton = screen.getByRole("button", { name: /retry/i });
            await user.click(retryButton);
            await waitForElementToBeRemoved(() => screen.getAllByTestId("preview-loading"));
            expect(screen.getByText("Request failed with status code 404")).toBeInTheDocument();
        });

        test("should display mocked trending items after error and clicking retry button", async () => {
            expect(screen.getByText("Request failed with status code 404")).toBeInTheDocument();
            server.resetHandlers();
            server.use(
                rest.get<DefaultBodyType, PathParams, ITrailer[]>(TRAILER_ENDPOINT, (req, res, ctx) => {
                    return res(
                        ctx.json([
                            {
                                imageSrc: "Src",
                                title: "Trailer title",
                                type: CINEMA_TYPE.MOVIE,
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
            await waitForElementToBeRemoved(() => screen.getAllByTestId("preview-loading"));
            expect(screen.getAllByRole("heading", { name: /Trailer title/i })).toHaveLength(1);
        });
    });
});
