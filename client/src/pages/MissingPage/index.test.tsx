import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../components/App";
import { renderTestComponent } from "../../tests/helpers/renderTestComponent";

describe("Missing page", () => {
    test("should navigate to home page when clicking on link", async () => {
        const user = userEvent.setup();
        await act(async () => {
            renderTestComponent(<App />, { initialRoute: "/12313" });
        });
        const homeLink = screen.getByRole("link", { name: /home page/i });
        await user.click(homeLink);
        expect(await screen.findByRole("heading", { name: /Recommended for you/i })).toBeInTheDocument();
    });
});
