import { act, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import userEvent from "@testing-library/user-event";
import { DefaultBodyType, PathParams, rest } from "msw";
import Trending from ".";
import { renderTestComponent } from "../../tests/helpers/renderTestComponent";
import { server } from "../../tests/moks/server";
import { CINEMA_TYPE } from "../../constants/cinemaType";
import { ITrailer } from "../../models/cinema";
import { TRAILER_ENDPOINT, TREND_ENDPOINT } from "../../constants/endPoints";

describe("Trending component", () => {
    describe("Successfull response", () => {
        beforeEach(async () => {
            act(() => renderTestComponent(<Trending />));
            await waitForElementToBeRemoved(() => screen.getByTestId("trends-loading"));
        });

        test("should display mocked trending items", () => {
            expect(screen.queryByRole("heading", { name: "Trending" })).toBeInTheDocument();
            expect(screen.getAllByRole("heading", { name: /Trending film/i })).toHaveLength(3);
        });
    });

    describe("Error response", () => {
        let user: UserEvent;

        beforeEach(async () => {
            user = userEvent.setup();
            server.use(
                rest.get<DefaultBodyType, PathParams>(TREND_ENDPOINT, (req, res, ctx) => {
                    return res(ctx.status(404));
                })
            );
            act(() => renderTestComponent(<Trending />));
            await waitForElementToBeRemoved(() => screen.getByTestId("trends-loading"));
        });

        test("should display an error when request fails", () => {
            expect(screen.getByText("Request failed with status code 404")).toBeInTheDocument();
        });

        test("should display an error after clicking the retry button and request fails", async () => {
            expect(screen.getByText("Request failed with status code 404")).toBeInTheDocument();
            const retryButton = screen.getByRole("button", { name: /retry/i });
            await user.click(retryButton);
            expect(await screen.findByText("Request failed with status code 404")).toBeInTheDocument();
        });

        test("should display mocked trending items after error and clicking retry button", async () => {
            expect(screen.getByText("Request failed with status code 404")).toBeInTheDocument();
            server.resetHandlers();
            server.use(
                rest.get<DefaultBodyType, PathParams, ITrailer[]>(TREND_ENDPOINT, (req, res, ctx) => {
                    return res(
                        ctx.json([
                            {
                                imageSrc: "Src",
                                title: "Trending film",
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
            expect(await screen.findAllByRole("heading", { name: /Trending film/i })).toHaveLength(3);
        });
    });
});
