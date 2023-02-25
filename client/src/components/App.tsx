import React from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchBookmarks } from "../store/bookmarks/thunks/fetchBookmarks";
import { refreshUser } from "../store/user/thunks/refreshUser";
import PageLoader from "./PageLoader";
import Router from "./Router";

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    const [isAppLoading, setIsAppLoading] = React.useState(true);

    React.useEffect(() => {
        const initialize = async () => {
            try {
                await dispatch(refreshUser()).unwrap();
                dispatch(fetchBookmarks())
            } catch (error) {  
            } finally {
                setIsAppLoading(false)
            }
        }
        initialize();
    }, [dispatch]);

    return <>{isAppLoading ? <PageLoader /> : <Router />}</>;
};

export default App;
