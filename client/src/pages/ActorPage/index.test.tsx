import { act, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import userEvent from "@testing-library/user-event";
import { DefaultBodyType, PathParams, rest } from "msw";
import ActorPage from ".";
import { ACTOR_ENDPOINT } from "../../constants/endPoints";
import { IActor } from "../../models/actor";
import { renderTestComponent } from "../../tests/helpers/renderTestComponent";
import { server } from "../../tests/moks/server";

describe("Actor page component", () => {

    describe("Successfull response", () => {
        beforeEach(async () => {
            act(() => renderTestComponent(<ActorPage />));
            await waitForElementToBeRemoved(() => screen.getAllByTestId(/page-loading/i));
        });
        test("should display mocked actor details", () => {
            expect(screen.getByRole("heading", { name: /Test actor name/i })).toBeInTheDocument();
        });
    });

    describe("Error response", () => {
        let user: UserEvent;
        beforeEach(async () => {
            user = userEvent.setup();
            server.use(
                rest.get<DefaultBodyType, PathParams, IActor>(ACTOR_ENDPOINT, (req, res, ctx) => {
                    return res(ctx.status(404));
                })
            );
            act(() => renderTestComponent(<ActorPage />));
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
                rest.get<DefaultBodyType, PathParams, IActor>(ACTOR_ENDPOINT, (req, res, ctx) => {
                    return res(
                        ctx.json({
                            id: "1",
                            posterSrc: "Src",
                            name: "Test actor name",
                            career: ["Actor", "Director", "Screenwriter"],
                            height: 180,
                            birthplace: {
                                city: "Konkord",
                                state: "California",
                                country: "USA",
                            },
                            genres: ["drama", "comedy", "fantasy"],
                            filmsNumber: 409,
                            bestWorks: [
                                {
                                    title: "Best Film",
                                    id: "10",
                                },
                            ],
                        })
                    );
                })
            );
            const retryButton = screen.getByRole("button", { name: /retry/i });
            await user.click(retryButton);
            await waitForElementToBeRemoved(() => screen.getByTestId(/page-loading/i));
            expect(screen.getByRole("heading", { name: /Test actor name/i })).toBeInTheDocument();
        });
    });
});