import { selectUser } from ".";
import { USER_ROLES } from "../../../constants/userRoles";
import { UserState } from "../userSlice";
import { RootState } from "../..";

describe("User selectors", () => {
    test("select user from state", () => {
        const user: UserState = {
            isAuth: false,
            user: {
                roles: [USER_ROLES.USER, USER_ROLES.ADMIN],
                email: "",
                nickname: "",
                id: "",
            },
        };

        const result = selectUser({ user } as RootState);

        expect(result).toEqual(user);
    });
});
