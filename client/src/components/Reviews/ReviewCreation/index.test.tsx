import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import ReviewCreation from ".";
import { CINEMA_ROUTE } from "../../../constants/routesPathnames";
import { renderTestComponent } from "../../../tests/helpers/renderTestComponent";

describe("Review creating form", () => {
    const onSubmit = jest.fn();
    let user: UserEvent;

    beforeEach(() => {
        onSubmit.mockClear();
        user = userEvent.setup();
        renderTestComponent(<ReviewCreation id="2" setIsCreating={jest.fn} />, { initialRoute: CINEMA_ROUTE });
        screen.getByRole("form", { name: /review form/i }).addEventListener("submit", onSubmit);
    });

    afterEach(() => {
        screen.getByRole("form", { name: /review form/i }).removeEventListener("submit", onSubmit);
    });

    test("should submit when all fields pass validation", async () => {
        const { typeSelect, title, text, submitButton } = getFormFields();
        await user.selectOptions(typeSelect, within(typeSelect).getByRole("option", { name: "Positives" }));
        await user.type(title, "Review title");
        await user.type(
            text,
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing."
        );
        await user.click(submitButton);
        await waitFor(() => {
            expect(submitButton).toBeDisabled();
        });
        expect(onSubmit).toBeCalledTimes(1);

    });

    test("should show required errors with empty fields", async () => {
        const { submitButton, typeSelect, title, text } = getFormFields();
        await user.click(submitButton);
        await waitFor(() => {
            expect(typeSelect).toHaveErrorMessage("Review type is required");
        });
        expect(title).toHaveErrorMessage("Title is required");
        expect(text).toHaveErrorMessage("Text is required");
    });

    describe("Title field", () => {
        test("should show an error when title has less than 2 characters", async () => {
            const { title } = getFormFields();
            await user.type(title, "x");
            await user.tab();
            expect(title).toHaveErrorMessage("Min length: 2 characters");
        });

        test("should show an error whan title has more than 100 characters", async () => {
            const { title } = getFormFields();
            await user.type(
                title,
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi conet sinab eno. sit amet consectetur"
            );
            await user.tab();
            expect(title).toHaveErrorMessage("Max length: 100 characters");
        });
    });

    describe("Text field", () => {
        test("should show an error when text has less than 100 characters", async () => {
            const { text } = getFormFields();
            await user.type(text, "Lorem ipsum dolor sit");
            await user.tab();
            expect(text).toHaveErrorMessage("Min length: 100 characters");
        });
    });
});

function getFormFields() {
    return {
        typeSelect: screen.getByRole("combobox", { name: /type/i }),
        title: screen.getByRole("textbox", { name: /title/i }),
        text: screen.getByRole("textbox", { name: /text/i }),
        submitButton: screen.getByRole("button", { name: /publish review/i }),
    };
}
