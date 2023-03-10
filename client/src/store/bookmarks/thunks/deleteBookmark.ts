import axios from "axios";
import BookmarkService from "../../../services/BookmarkService";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { logoutUser } from "../../user/userSlice";

type KnownError = {
    isAuthError?: boolean;
    message: string;
};

export const deleteBookmark = createAppAsyncThunk<string, string, { rejectValue: KnownError }>(
    "bookmark/deleteBookmark",
    async function (id, { dispatch, rejectWithValue }) {
        try {
            await BookmarkService.deleteBookmark(id);
            return id;
        } catch (error) {
            const err = error as any;
            if (axios.isAxiosError(err) && err.response && err.response.status === 401) {
                dispatch(logoutUser());
                return rejectWithValue({ isAuthError: true, message: "Falied to delete bookmark" });
            }
            return rejectWithValue({ message: "Failed to delete bookmark" });
        }
    }
);
