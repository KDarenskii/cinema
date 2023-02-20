import { ITrailer } from "../../../models/cinema";
import BookmarkService from "../../../services/BookmarkService";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { logoutUser } from "../../user/userSlice";

export const fetchBookmarks = createAppAsyncThunk<ITrailer[], undefined>(
    "bookmarks/fetchBookmarks",
    async function (_, { dispatch }) {
        try {
            const response = await BookmarkService.fetchBookmarks();
            return response.data;
        } catch (error) {
            dispatch(logoutUser());
            throw new Error(error as any);
        }
    }
);
