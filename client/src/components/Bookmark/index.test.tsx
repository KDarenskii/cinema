import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import Bookmark from ".";
import { ITrailer } from "../../models/cinema";
import { renderTestComponent } from "../../tests/helpers/renderTestComponent";
import userEvent from "@testing-library/user-event";
import { CINEMA_TYPE } from "../../constants/cinemaType";
import { screen, waitFor } from "@testing-library/react";

describe("Bookmark button component", () => {
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

    test("should have active class when recieves 'isActive=true' prop value", () => {
        renderTestComponent(<Bookmark isActive={true} preview={mockedPreview} />);
        const bookmarkButton = screen.getByRole("button", { name: /bookmark/i });
        expect(bookmarkButton).toBeInTheDocument();
        expect(bookmarkButton).toHaveClass("bookmark--active");
    });

    test("should not have active class when recieves 'isActive=false' prop values", () => {
        renderTestComponent(<Bookmark isActive={false} preview={mockedPreview} />);
        const bookmarkButton = screen.getByRole("button", { name: /bookmark/i });
        expect(bookmarkButton).toBeInTheDocument();
        expect(bookmarkButton).not.toHaveClass("bookmark--active");
    });

    test("should be disabled after clicking on button and to be enabled when request finishes" , async () => {
        renderTestComponent(<Bookmark isActive={false} preview={mockedPreview} />);
        const bookmarkButton = screen.getByRole("button", { name: /bookmark/i });
        expect(bookmarkButton).toBeInTheDocument();
        await user.click(bookmarkButton);
        expect(bookmarkButton).toBeDisabled();
        await waitFor(() => expect(bookmarkButton).not.toBeDisabled());
    })
});
