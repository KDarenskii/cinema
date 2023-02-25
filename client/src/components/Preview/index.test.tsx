import { screen } from "@testing-library/react";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import Preview from ".";
import { CINEMA_TYPE } from "../../constants/cinemaType";
import { ITrailer } from "../../models/cinema";
import { renderTestComponent } from "../../tests/helpers/renderTestComponent";
import userEvent from "@testing-library/user-event";
import Router from "../Router";

describe("Preview component", () => {
    let mockedPreview: ITrailer;
    let user: UserEvent;

    beforeEach(() => {
        user = userEvent.setup();
        mockedPreview = {
            imageSrc: "Image src",
            title: "Preview title",
            type: CINEMA_TYPE.MOVIE,
            age: 16,
            year: "1994",
            duration: 2,
            id: "1",
        };
    });

    test("bookmark button should have active class when preview item is in store", () => {
        renderTestComponent(<Preview preview={mockedPreview} />, {
            preloadedState: {
                bookmarks: {
                    error: null,
                    isLoading: false,
                    list: [mockedPreview],
                },
            },
        });
        expect(screen.getByRole("heading", { name: /preview title/i })).toBeInTheDocument();
        const bookmarkButton = screen.getByRole("button", { name: /bookmark/i });
        expect(bookmarkButton).toHaveClass("bookmark--active");
    });

    test("bookmark button should not have active class when preview item is not in store", () => {
        renderTestComponent(<Preview preview={mockedPreview} />);
        expect(screen.getByRole("heading", { name: /preview title/i })).toBeInTheDocument();
        const bookmarkButton = screen.getByRole("button", { name: /bookmark/i });
        expect(bookmarkButton).not.toHaveClass("bookmark--active");
    });

    test("should navigate to cinema details page after clicking on preview", async () => {
        renderTestComponent(
            <>
                <Router />
                <Preview preview={mockedPreview} />
            </>
        );
        expect(screen.getByRole("heading", { name: /preview title/i })).toBeInTheDocument();
        await user.click(screen.getByRole("heading", { name: /preview title/i }));
        expect(await screen.findByRole("heading", { name: /Test cinema title/i })).toBeInTheDocument();
    });
});
