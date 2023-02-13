import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api";
import { ITrailer } from "../../../models/cinema";

export const postBookmark = createAsyncThunk<ITrailer, ITrailer>(
    "bookmark/postBookmark",
    async function(bookmark) {
        const response = await api.post<ITrailer>('bookmarks', bookmark);
        return response.data;
    }
)