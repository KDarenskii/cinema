import { authApi } from "../../../api";
import { ITrailer } from "../../../models/cinema";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { logoutUser } from "../../user/userSlice";

export const fetchBookmarks = createAppAsyncThunk<ITrailer[], undefined>(
    "bookmarks/fetchBookmarks",
    async function(_, { dispatch }) {
        try {
            const response = await authApi.get<ITrailer[]>('bookmarks');
            return response.data;
        } catch (error) {
            dispatch(logoutUser());
            throw new Error(error as any);
        }
    }
)