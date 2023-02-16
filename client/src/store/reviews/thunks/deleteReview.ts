import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../api";

export const deleteReview = createAsyncThunk<string, string>(
    "reviews/deleteReview", 
    async function(id) {
        await api.delete("reviews/" + id);
        return id;
    }
)