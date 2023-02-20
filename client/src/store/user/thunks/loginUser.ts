import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { IAuthResponse } from "../../../models/response/AuthResponse";
import { TLoginCredentials } from "../../../models/user";
import UserService from "../../../services/UserService";

type KnownError = {
    message: string;
};

export const loginUser = createAsyncThunk<IAuthResponse, TLoginCredentials, { rejectValue: KnownError }>(
    "user/loginUser",
    async function (credentials, { rejectWithValue }) {
        try {
            const response = await UserService.loginUser(credentials);
            return response.data;
        } catch (error) {
            const err = error as any;
            if (isAxiosError(err) && err.response && err.response.status === 400) {
                return rejectWithValue({ message: err.response?.data });
            }
            throw new Error(err.message ?? "Something went wrong");
        }
    }
);
