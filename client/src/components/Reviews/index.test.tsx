import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { DefaultBodyType, PathParams, rest } from "msw";
import Reviews from ".";
import { REVIEW_ENDPOINT } from "../../constants/endPoints";
import { REVIEW_TYPE } from "../../constants/reviewTypes";
import { IReview } from "../../models/review";
import { renderTestComponent } from "../../tests/helpers/renderTestComponent";
import { server } from "../../tests/moks/server";

describe("Reviews component", () => {

    describe("Successfull response", () => {
        beforeEach(async () => {
            renderTestComponent(<Reviews />);
            await waitForElementToBeRemoved(() => screen.getAllByTestId(/review-loader/i));
        })
        test("should display mocked reviews", () => {
            expect(screen.getAllByRole("heading", { name: /test review title/i })).toHaveLength(2);
        });
    })

    describe("Error response", () => {
        let user: UserEvent;
        
        beforeEach(async () => {
            user = userEvent.setup();
            server.use(
                rest.get<DefaultBodyType, PathParams, IReview>(REVIEW_ENDPOINT, (req, res, ctx) => {
                    return res(ctx.status(404), ctx.delay(200));
                })
            );
            renderTestComponent(<Reviews />);
            await waitForElementToBeRemoved(() => screen.getAllByTestId(/review-loader/i));
        });

        test("should dispay an error after request fails", () => {
            expect(screen.getByText("Request failed with status code 404")).toBeInTheDocument();
        });

        test("should display an error after clicking the retry button and request fails", async () => {
            expect(screen.getByText("Request failed with status code 404")).toBeInTheDocument();
            const retryButton = screen.getByRole("button", { name: /retry/i });
            await user.click(retryButton);
            await waitForElementToBeRemoved(() => screen.queryAllByTestId(/review-loader/i));
            expect(screen.getByText("Request failed with status code 404")).toBeInTheDocument();
        });

        test("should display mocked trending items after error and clicking retry button", async () => {
            expect(screen.getByText("Request failed with status code 404")).toBeInTheDocument();
            server.resetHandlers();
            server.use(
                rest.get<DefaultBodyType, PathParams, IReview[]>(REVIEW_ENDPOINT, (req, res, ctx) => {
                    return res(
                        ctx.json([
                            {
                                type: REVIEW_TYPE.POSITIVE,
                                title: "Test review title",
                                text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure facere, praesentium quam recusandae magnam, enim assumenda culpa cupiditate laudantium iusto ipsum ipsa molestias accusamus id. Deleniti, nobis quod. Soluta, explicabo.",
                                cinemaId: "1",
                                dislikesAmount: 32,
                                isDisliked: false,
                                isLiked: false,
                                likesAmount: 100,
                                id: "J-2K1yWup3kSNAH8HRXmU",
                                date: "2023-02-15T14:05:22.657Z",
                            },
                            {
                                type: REVIEW_TYPE.NEGATIVE,
                                title: "Test review title",
                                text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure facere, praesentium quam recusandae magnam, enim assumenda culpa cupiditate laudantium iusto ipsum ipsa molestias accusamus id. Deleniti, nobis quod. Soluta, explicabo.",
                                cinemaId: "1",
                                dislikesAmount: 56,
                                isDisliked: false,
                                isLiked: false,
                                likesAmount: 30,
                                id: "L-FX2uk2cOMeT4tLch64d",
                                date: "2023-02-15T14:06:37.730Z",
                            },
                        ]),
                        ctx.delay(200)
                    );
                }),
            );
            const retryButton = screen.getByRole("button", { name: /retry/i });
            await user.click(retryButton);
            await waitForElementToBeRemoved(() => screen.getAllByTestId(/review-loader/i));
            expect(screen.getAllByRole("heading", { name: /Test review title/i })).toHaveLength(2);
        });
    })

});
