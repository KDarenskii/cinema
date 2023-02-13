import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api";
import { ITrailer } from "../../../models/cinema";

export const fetchBookmarks = createAsyncThunk<ITrailer[]>(
    "bookmarks/fetchBookmarks",
    async function() {
        const response = await api.get<ITrailer[]>('bookmarks');
        return response.data;
    }
)