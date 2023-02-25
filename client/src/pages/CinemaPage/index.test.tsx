import { act, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { DefaultBodyType, PathParams, rest } from "msw";
import CinemaPage from ".";
import { CINEMA_TYPE } from "../../constants/cinemaType";
import { CINEMA_ENDPOINT, TRAILER_ENDPOINT } from "../../constants/endPoints";
import { ICinema, ITrailer } from "../../models/cinema";
import { renderTestComponent } from "../../tests/helpers/renderTestComponent";
import { server } from "../../tests/moks/server";

describe("Cinema page component", () => {
    describe("Successfull responses", () => {
        beforeEach(async () => {
            act(() => renderTestComponent(<CinemaPage />));
            await waitForElementToBeRemoved(() => screen.getByTestId(/page-loading/i));
            await waitForElementToBeRemoved(() => screen.getAllByTestId(/preview-loading/i));
        });

        test("should dispay mocked cinema details", () => {
            expect(screen.getByRole("heading", { name: /test cinema title/i })).toBeInTheDocument();
            expect(screen.getAllByRole("heading", { name: /Trailer title/i })).toHaveLength(2);
        });
    });

    describe("Error response", () => {
        let user: UserEvent;
        beforeEach(async () => {
            user = userEvent.setup();
            server.use(
                rest.get<DefaultBodyType, PathParams, ICinema>(CINEMA_ENDPOINT, (req, res, ctx) => {
                    return res(ctx.status(404));
                })
            );
            act(() => renderTestComponent(<CinemaPage />));
            await waitForElementToBeRemoved(() => screen.getByTestId(/page-loading/i));
        });

        test("should dispay an error after request fails", () => {
            expect(screen.getByText("Request failed with status code 404")).toBeInTheDocument();
        });

        test("should display an error after clicking the retry button and request fails", async () => {
            expect(screen.getByText("Request failed with status code 404")).toBeInTheDocument();
            const retryButton = screen.getByRole("button", { name: /retry/i });
            await user.click(retryButton);
            await waitForElementToBeRemoved(() => screen.getByTestId(/page-loading/i));
            expect(screen.getByText("Request failed with status code 404")).toBeInTheDocument();
        });

        test("should display mocked trending items after error and clicking retry button", async () => {
            expect(screen.getByText("Request failed with status code 404")).toBeInTheDocument();
            server.resetHandlers();
            server.use(
                rest.get<DefaultBodyType, PathParams, ICinema>(CINEMA_ENDPOINT, (req, res, ctx) => {
                    return res(
                        ctx.json({
                            id: "1",
                            type: CINEMA_TYPE.MOVIE,
                            title: "Test cinema title",
                            description: "Description text",
                            posterSrc: "Poster src",
                            genres: ["fantasy", "crime", "drama"],
                            countries: ["USA"],
                            budget: 60000000,
                            age: 16,
                            year: "1999",
                            profit: 136000000,
                            directors: ["Frank Darabont"],
                            screenwriters: ["Frank Darabont", "Stiven King"],
                            composers: ["Thomas Newman"],
                            actors: [
                                {
                                    name: "Test actor name",
                                    id: "1",
                                },
                            ],
                            videoId: "Ki4haFrqSrw",
                            story: "lorem kmgfo fdskmf lfds lkmfdskm fksdmkl fs mfsd",
                        }),
                        ctx.delay(200)
                    );
                }),
                rest.get<DefaultBodyType, PathParams, ITrailer>(TRAILER_ENDPOINT + "/:id", (req, res, ctx) => {
                    return res(
                        ctx.json({
                            imageSrc: "Src",
                            title: "Trailer title",
                            type: CINEMA_TYPE.MOVIE,
                            age: 16,
                            year: "2000",
                            duration: 2,
                            id: "1",
                        }),
                        ctx.delay(200)
                    );
                })
            );
            const retryButton = screen.getByRole("button", { name: /retry/i });
            await user.click(retryButton);
            await waitForElementToBeRemoved(() => screen.getByTestId(/page-loading/i));
            await waitForElementToBeRemoved(() => screen.getAllByTestId(/preview-loading/i));
            expect(screen.getByRole("heading", { name: /test cinema title/i })).toBeInTheDocument();
            expect(screen.getAllByRole("heading", { name: /Trailer title/i })).toHaveLength(2);
        });
    });
});
