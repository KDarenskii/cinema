import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { USER_ROLES } from "../../../constants/userRoles";
import { IUser } from "../../../models/user";
import { loginUser } from "../thunks/loginUser";
import { registerUser } from "../thunks/registerUser";

export type UserState = {
    isAuth: boolean;
    user: IUser;
};

const initialState: UserState = {
    isAuth: false,
    user: {
        roles: [USER_ROLES.USER, USER_ROLES.ADMIN],
        email: "",
        nickname: "",
        id: "",
    },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = {} as IUser;
            state.isAuth = false;
        },
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        setUser: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload.user;
            state.isAuth = action.payload.isAuth;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuth = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuth = true;
            });
    },
});

export const { logoutUser, setIsAuth, setUser } = userSlice.actions;
export default userSlice.reducer;
