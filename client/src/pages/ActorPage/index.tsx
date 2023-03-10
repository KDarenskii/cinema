import axios, { CancelTokenSource } from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Actor from "../../components/Actor";
import PageLoader from "../../components/PageLoader";
import RetryError from "../../components/RetryError";
import { IActor } from "../../models/actor";
import ActorService from "../../services/ActorService";

import "./styles.scss";

const ActorPage: React.FC = () => {
    
    const { id = "" } = useParams();

    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [actor, setActor] = React.useState({} as IActor);

    const fetchActor = React.useCallback(async (cancelToken?: CancelTokenSource) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await ActorService.fetchActortById(id, { cancelToken: cancelToken?.token });
            setActor(response.data);
        } catch (error) {
            const err = error as any;
            setError(err.message ?? null);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    React.useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        fetchActor(cancelToken);
        return () => {
            cancelToken.cancel();
        }
    }, [fetchActor]);

    return (
        <div className="actor-page">
            {error && <RetryError onClick={() => fetchActor(axios.CancelToken.source())} message={error} data-testid="actor-error" />}
            {isLoading && <PageLoader />}
            {!error && !isLoading && <Actor actor={actor} />}
        </div>
    );
};

export default ActorPage;
