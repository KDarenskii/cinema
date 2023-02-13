import { createSlice } from "@reduxjs/toolkit";
import { ITrailer } from "../../models/cinema";
import { deleteBookmark } from "./thunks/deleteBookmark";
import { fetchBookmarks } from "./thunks/fetchBookmarks";
import { postBookmark } from "./thunks/postBookmark";

type SliceState = {
    isLoading: boolean;
    error: string | null;
    list: ITrailer[];
}

const initialState: SliceState = {
    isLoading: false,
    error: null,
    list: []
}

const bookmarksSlice = createSlice({
    name: "bookmarks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookmarks.pending, (state) => {
                state.error = null;
                state.isLoading = true;
                state.list = [];
            }) 
            .addCase(fetchBookmarks.fulfilled, (state, action) => {
                state.error = null;
                state.isLoading = false;
                state.list = action.payload;
            })
            .addCase(fetchBookmarks.rejected, (state, action) => {
                state.isLoading = false;
                state.list = [];
                state.error = action.error.message ?? null;
            })
            .addCase(postBookmark.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(deleteBookmark.fulfilled, (state, action) => {
                state.list = state.list.filter(bookmark => bookmark.id !== action.payload);
            })
    }
})

export default bookmarksSlice.reducer;