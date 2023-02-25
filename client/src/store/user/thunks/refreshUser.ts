import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { AppDispatch } from "../..";
import UserService from "../../../services/UserService";
import { logoutUser, setIsAuth } from "../userSlice";

export const refreshUser = createAsyncThunk<void, undefined, { dispatch: AppDispatch }>(
    "user/refreshUser",
    async function (_, { dispatch }) {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                await UserService.refreshUser();
                dispatch(setIsAuth(true));
            } catch (error) {
                if (isAxiosError(error) && error.response && error.response.status === 401) {
                    dispatch(logoutUser());
                }
                throw new Error("401 Unauthenticated");
            }
        } else {
            dispatch(logoutUser());
            throw new Error("401 Unauthenticated");
        }
    }
);