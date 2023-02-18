import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../../api";
import { IAuthResponse } from "../../../models/response/AuthResponse";
import { TLoginCredentials } from "../../../models/user";

type KnownError = {
    message: string;
};

export const loginUser = createAsyncThunk<IAuthResponse, TLoginCredentials, { rejectValue: KnownError }>(
    "user/loginUser",
    async function (credentials, { rejectWithValue }) {
        try {
            const response = await api.post<IAuthResponse>("login", credentials);
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
