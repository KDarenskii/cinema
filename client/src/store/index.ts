import { combineReducers, configureStore, PreloadedState } from "@reduxjs/toolkit";
import bookmarksReducer from "./bookmarks/bookmarksSlice";
import reviewsReducer from "./reviews/reviewsSlice";
import userReducer from "./user/userSlice";

const rootReducer = combineReducers({
    bookmarks: bookmarksReducer,
    reviews: reviewsReducer,
    user: userReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];