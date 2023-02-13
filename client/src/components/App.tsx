import React from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchBookmarks } from "../store/bookmarks/thunks/fetchBookmarks";
import Router from "./Router";

const App: React.FC = () => {

    const dispatch = useAppDispatch();

    const [isAppLoading, setIsAppLoading] = React.useState(true);

    React.useEffect(() => {
        dispatch(fetchBookmarks()).finally(() => setIsAppLoading(false));
    }, [dispatch]);

    return (
        <>
            {!isAppLoading && <Router />}
        </>
    )
};

export default App;