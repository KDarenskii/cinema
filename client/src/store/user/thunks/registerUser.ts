import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { IAuthResponse } from "../../../models/response/AuthResponse";
import { ICredentials } from "../../../models/user";
import UserService from "../../../services/UserService";

type KnownError = {
    message: string;
};

export const registerUser = createAsyncThunk<IAuthResponse, ICredentials, { rejectValue: KnownError }>(
    "user/registerUser",
    async function (credentials, { rejectWithValue }) {
        try {
            const response = await UserService.registerUser(credentials);
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
