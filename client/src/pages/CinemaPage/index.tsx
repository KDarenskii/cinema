import axios, { CancelTokenSource } from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import Cinema from "../../components/Cinema";
import PageLoader from "../../components/PageLoader";
import RetryError from "../../components/RetryError";
import Reviews from "../../components/Reviews";
import { ICinema } from "../../models/cinema";
import CinemaService from "../../services/CinemaService";

import "./styles.scss";

const CinemaPage: React.FC = () => {
    const { id = "" } = useParams();

    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [cinema, setCinema] = React.useState<ICinema>({} as ICinema);

    const fetchCinema = React.useCallback(async (cancelToken?: CancelTokenSource) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await CinemaService.fetchCinemaById(id, { cancelToken: cancelToken?.token });
            setCinema(response.data);
        } catch (error) {
            const err = error as any;
            setError(err.message ?? null);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    React.useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        fetchCinema(cancelToken);
        return () => cancelToken.cancel();
    }, [fetchCinema]);

    return (
        <div className="cinema-page">
            {error && <RetryError message={error} onClick={fetchCinema} />}
            {isLoading && <PageLoader />}
            {!error && !isLoading && (
                <>
                    <Cinema className="cinema-page__info" cinema={cinema} />
                    <Reviews />
                </>
            )}
        </div>
    );
};

export default CinemaPage;
