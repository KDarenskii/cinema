import { USER_ROLES } from "../../../constants/userRoles";
import { IUser } from "../../../models/user";
import { loginUser } from "../thunks/loginUser";
import reducer, { UserState, logoutUser, setIsAuth } from "./index";
import { IAuthResponse } from "../../../models/response/AuthResponse";
import { PayloadAction } from "@reduxjs/toolkit";
import { registerUser } from "../thunks/registerUser";

describe("User slice", () => {
    let initialState: UserState;
    let mockedUser: IUser;

    beforeEach(() => {
        initialState = {
            isAuth: false,
            user: {
                roles: [USER_ROLES.USER, USER_ROLES.ADMIN],
                email: "",
                nickname: "",
                id: "",
            },
        };
        mockedUser = {
            email: "user@mail.com",
            id: "1",
            nickname: "User Nickname",
            roles: [USER_ROLES.ADMIN, USER_ROLES.USER],
        };
    });

    test("should return the initial state", () => {
        const initialState: UserState = {
            isAuth: false,
            user: {
                roles: [USER_ROLES.USER, USER_ROLES.ADMIN],
                email: "",
                nickname: "",
                id: "",
            },
        };
        expect(reducer(undefined, { type: undefined })).toEqual(initialState);
    });

    describe("Reducers", () => {
        test("should handle logout with empty user", () => {
            const initialState: UserState = {
                isAuth: false,
                user: {
                    roles: [USER_ROLES.USER, USER_ROLES.ADMIN],
                    email: "",
                    nickname: "",
                    id: "",
                },
            };
            expect(reducer(initialState, logoutUser())).toEqual({ user: {} as IUser, isAuth: false });
        });

        test("should handle logout with user credentials", () => {
            const initialState: UserState = {
                isAuth: true,
                user: {
                    roles: [USER_ROLES.USER, USER_ROLES.ADMIN],
                    email: "user@mail.com",
                    nickname: "User nickname",
                    id: "123",
                },
            };
            expect(reducer(initialState, logoutUser())).toEqual({ user: {} as IUser, isAuth: false });
        });

        test("should handle a user auth status beeing setted", () => {
            const initialState: UserState = {
                isAuth: true,
                user: {
                    roles: [USER_ROLES.USER, USER_ROLES.ADMIN],
                    email: "user@mail.com",
                    nickname: "User nickname",
                    id: "123",
                },
            };
            expect(reducer(initialState, setIsAuth(false))).toEqual({ ...initialState, isAuth: false });
        });
    });

    describe("loginUser action with extraReducers", () => {
        test("should set user credentials & auth status with 'loginUser.fulfilled' action", () => {
            const action: PayloadAction<IAuthResponse> = {
                type: loginUser.fulfilled.type,
                payload: { user: mockedUser, accessToken: "Some token" },
            };

            expect(reducer(initialState, action)).toEqual({ user: mockedUser, isAuth: true });
        });
    });

    describe("registerUser action with extraReducers", () => {
        test("should set user credentials & auth status with 'registerUser.fulfilled' action", () => {
            const action: PayloadAction<IAuthResponse> = {
                type: registerUser.fulfilled.type,
                payload: { user: mockedUser, accessToken: "Some token" },
            };

            expect(reducer(initialState, action)).toEqual({ user: mockedUser, isAuth: true });
        });
    });
});
