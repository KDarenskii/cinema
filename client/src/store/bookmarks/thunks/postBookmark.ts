import axios from "axios";
import { ITrailer } from "../../../models/cinema";
import BookmarkService from "../../../services/BookmarkService";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { logoutUser } from "../../user/userSlice";

type KnownError = {
    isAuthError?: boolean;
    message: string;
};

export const postBookmark = createAppAsyncThunk<ITrailer, ITrailer, { rejectValue: KnownError }>(
    "bookmark/postBookmark",
    async function (bookmark, { dispatch, rejectWithValue }) {
        try {
            const response = await BookmarkService.postBookmark(bookmark);
            return response.data;
        } catch (error) {
            const err = error as any;
            if (axios.isAxiosError(err) && err.response && err.response.status === 401) {
                dispatch(logoutUser());
                return rejectWithValue({ isAuthError: true, message: "Failed to bookmark" });
            }
            return rejectWithValue({ message: "Failed to bookmark" });
        }
    }
);
