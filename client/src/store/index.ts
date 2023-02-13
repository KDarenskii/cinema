import { configureStore } from "@reduxjs/toolkit";
import bookmarksReducer from "./bookmarks/bookmarksSlice";
import reviewsReducer from "./reviews/reviewsSlice";

const store = configureStore({
    reducer: {
        bookmarks: bookmarksReducer,
        reviews: reviewsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;