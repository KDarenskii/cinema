import { screen } from "@testing-library/react";
import AccessCheck from ".";
import { USER_ROLES } from "../../constants/userRoles";
import { renderTestComponent } from "../../tests/helpers/renderTestComponent";

describe("Component for access checking", () => {
    describe("Authenticated user", () => {
        test("should return children when user has the necessary role", () => {
            renderTestComponent(
                <AccessCheck children={<button>test text</button>} roles={[USER_ROLES.USER, USER_ROLES.ADMIN]} />,
                {
                    preloadedState: {
                        user: {
                            isAuth: true,
                            user: {
                                email: "user@mail.com",
                                nickname: "user",
                                id: "1",
                                roles: [USER_ROLES.USER, USER_ROLES.ADMIN],
                            },
                        },
                    },
                }
            );
            expect(screen.getByRole("button", { name: /test text/i }));
        });

        test("should return null when user does not have the necessary role", () => {
            renderTestComponent(<AccessCheck children={<button>test text</button>} roles={[USER_ROLES.ADMIN]} />, {
                preloadedState: {
                    user: {
                        isAuth: true,
                        user: {
                            email: "user@mail.com",
                            nickname: "user",
                            id: "1",
                            roles: [USER_ROLES.USER],
                        },
                    },
                },
            });
            expect(screen.queryByRole("button", { name: /test text/i })).not.toBeInTheDocument();
        });
    });

    describe("Unauthenticated user", () => {
        test("should return null", () => {
            renderTestComponent(<AccessCheck children={<button>test text</button>} roles={[USER_ROLES.ADMIN]} />);
            expect(screen.queryByRole("button", { name: /test text/i })).not.toBeInTheDocument();
        });
    });
});
