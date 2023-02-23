import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import RegisterForm from ".";
import { REGISTER_ROUTE } from "../../constants/routesPathnames";
import { renderTestComponent } from "../../tests/helpers/renderTestComponent";

describe("Register form validation", () => {
    const onSubmit = jest.fn();
    let user: UserEvent;

    beforeEach(() => {
        onSubmit.mockClear();
        user = userEvent.setup();
        renderTestComponent(<RegisterForm />, { initialRoute: REGISTER_ROUTE });
        screen.getByRole("form", { name: /register form/i }).addEventListener("submit", onSubmit);
    });

    afterEach(() => {
        screen.getByRole("form", { name: /register form/i }).removeEventListener("submit", onSubmit);
    });

    test("should submit when all fields pass validation", async () => {
        const { submitButton, email, nickname, password, confirmPassword } = getFormFields();
        await user.type(email, "user@mail.com");
        await user.type(nickname, "user");
        await user.type(password, "123123");
        await user.type(confirmPassword, "123123");
        await user.click(submitButton);
        await waitFor(() => {
            expect(onSubmit).toBeCalledTimes(1);
        });
        expect(onSubmit).toBeCalledTimes(1);
    });

    test("should show required errors with empty fields", async () => {
        const { submitButton, email, nickname, password } = getFormFields();
        await user.click(submitButton);
        await waitFor(() => {
            expect(email).toHaveErrorMessage("Email is required");
        });
        expect(nickname).toHaveErrorMessage("Nickname is required");
        expect(password).toHaveErrorMessage("Password is required");
        expect(onSubmit).toBeCalledTimes(1);
    });

    test("should show an error when password and confirmPassword fields do not match", async () => {
        const { submitButton, email, nickname, password, confirmPassword } = getFormFields();
        await user.type(email, "user@mail.com");
        await user.type(nickname, "user");
        await user.type(password, "123123");
        await user.type(confirmPassword, "123");
        await user.click(submitButton);
        await waitFor(() => {
            expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
        });
    });

    describe("Email field", () => {
        test("should show an error when email is invalid", async () => {
            const { email } = getFormFields();
            await user.type(email, "invalid value");
            await user.tab();
            expect(email).toHaveErrorMessage("Invalid email");
        });
    });

    describe("Nickname field", () => {
        test("should show an error when nickname has less than 2 characters", async () => {
            const { nickname } = getFormFields();
            await user.type(nickname, "x");
            await user.tab();
            expect(nickname).toHaveErrorMessage("Min length: 2");
        });

        test("should show an error when nickname has more than 35 characters", async () => {
            const { nickname } = getFormFields();
            await user.type(nickname, "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            await user.tab();
            expect(nickname).toHaveErrorMessage("Max length: 35");
        });
    });

    describe("Password field", () => {
        test("should show an error when password has less than 4 characters", async () => {
            const { password } = getFormFields();
            await user.type(password, "123");
            await user.tab();
            expect(password).toHaveErrorMessage("Min length: 4");
        });
        test("should show an error when password has more than 35 characters", async () => {
            const { password } = getFormFields();
            await user.type(password, "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            await user.tab();
            expect(password).toHaveErrorMessage("Max length: 35");
        });
    });
});

function getFormFields() {
    return {
        email: screen.getByRole("textbox", { name: /email/i }),
        nickname: screen.getByRole("textbox", { name: /nickname/i }),
        password: screen.getByPlaceholderText("Password"),
        confirmPassword: screen.getByPlaceholderText(/Confirm password/i),
        submitButton: screen.getByRole("button", { name: /Register/i }),
    };
}
