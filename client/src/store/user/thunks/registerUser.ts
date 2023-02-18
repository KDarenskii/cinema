import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../../api";
import { IAuthResponse } from "../../../models/response/AuthResponse";
import { ICredentials } from "../../../models/user";

type KnownError = {
    message: string;
};

export const registerUser = createAsyncThunk<IAuthResponse, ICredentials, { rejectValue: KnownError }>(
    "user/registerUser",
    async function (credentials, { rejectWithValue }) {
        try {
            const response = await api.post<IAuthResponse>("users", credentials);
            return response.data;
        } catch (error) {
            const err = error as any;
            if (axios.isAxiosError(err) && err.response && err.response.status === 400) {
                return rejectWithValue({ message: err.response?.data });
            }
            throw new Error(err.message ?? "Something went wrong");
        }
    }
);
