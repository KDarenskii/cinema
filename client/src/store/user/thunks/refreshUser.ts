import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../..";
import { authApi } from "../../../api";
import { logoutUser, setIsAuth } from "../userSlice";

export const refreshUser = createAsyncThunk<void, undefined, { dispatch: AppDispatch }>(
    "user/refreshUser",
    async function (_, { dispatch }) {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                await authApi.get("refresh");
                dispatch(setIsAuth(true));
            } catch (error) {
                const err = error as any;
                if (axios.isAxiosError(err) && err.response && err.response.status === 401) {
                    dispatch(logoutUser());
                }
            }
        } else {
            dispatch(logoutUser());
        }
    }
);
