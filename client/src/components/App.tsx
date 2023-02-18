import React from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { refreshUser } from "../store/user/thunks/refreshUser";
import PageLoader from "./PageLoader";
import Router from "./Router";

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    const [isAppLoading, setIsAppLoading] = React.useState(true);

    React.useEffect(() => {
        dispatch(refreshUser()).finally(() => setIsAppLoading(false));
    }, [dispatch]);

    return (
        <>
            {isAppLoading ? <PageLoader /> : <Router /> }
        </>
    )
};

export default App;