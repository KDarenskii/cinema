import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api";

export const deleteBookmark = createAsyncThunk<string, string>(
    "bookmark/deleteBookmark",
    async function(id) {
        await api.delete("bookmarks/" + id);
        return id;
    }
)