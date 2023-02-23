import { screen, waitFor } from "@testing-library/react";
import LoginForm from ".";
import { LOGIN_ROUTE } from "../../constants/routesPathnames";
import { renderTestComponent } from "../../tests/helpers/renderTestComponent";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";

describe("Login form validation", () => {
    const onSubmit = jest.fn();
    let user: UserEvent;

    beforeEach(() => {
        onSubmit.mockClear();
        user = userEvent.setup();
        renderTestComponent(<LoginForm />, { initialRoute: LOGIN_ROUTE });
        getForm().addEventListener("submit", onSubmit);
    });

    afterEach(() => {
        getForm().removeEventListener("submit", onSubmit);
    });

    test("should submit when all fields pass validation ", async () => {
        const submitButton = getSubmitButton();
        const email = getEmail();
        const password = getPassword();
        await user.type(email, "user@mail.com");
        await user.type(password, "123123");
        await user.click(submitButton);
        await waitFor(() => {
            expect(submitButton).toBeDisabled();
            expect(email).toBeDisabled();
            expect(password).toBeDisabled();
            expect(onSubmit).toBeCalledTimes(1);
        });
    });

    test("should show required error with empty fileds", async () => {
        await user.click(getSubmitButton());
        await waitFor(() => {
            expect(getEmail()).toHaveErrorMessage("Email is required");
        });
        expect(getPassword()).toHaveErrorMessage("Password is required");
    });

    describe("Email field", () => {
        test("should show an error when email is invalid", async () => {
            const email = getEmail();
            await user.type(email, "invalid value");
            await user.tab();
            expect(email).toHaveErrorMessage("Invalid email");
        });
    });

    describe("Password field", () => {
        test("should show an error when password has less than 4 characters", async () => {
            const password = getPassword();
            await user.type(password, "123");
            await user.tab();
            expect(password).toHaveErrorMessage("Min length: 4");
        });

        test("should show an error when password has more than 35 characters", async () => {
            const password = getPassword();
            await user.type(password, "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            await user.tab();
            expect(password).toHaveErrorMessage("Max length: 35");
        });
    });
});

function getEmail() {
    return screen.getByRole("textbox", { name: /email/i });
}

function getPassword() {
    return screen.getByPlaceholderText(/password/i);
}

function getSubmitButton() {
    return screen.getByRole("button", {
        name: /log in/i,
    });
}

function getForm() {
    return screen.getByRole("form", {
        name: /login form/i,
    });
}
