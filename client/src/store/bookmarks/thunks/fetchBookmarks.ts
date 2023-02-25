import { ITrailer } from "../../../models/cinema";
import BookmarkService from "../../../services/BookmarkService";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const fetchBookmarks = createAppAsyncThunk<ITrailer[]>(
    "bookmarks/fetchBookmarks",
    async function () {
        const response = await BookmarkService.fetchBookmarks();
        return response.data;
    }
);
