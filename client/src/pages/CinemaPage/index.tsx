import React from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api";
import Alert from "../../components/Alert";
import Cinema from "../../components/Cinema";
import PageLoader from "../../components/PageLoader";
import Reviews from "../../components/Reviews";
import { ALERT } from "../../constants/alertTypes";
import { ICinema } from "../../models/cinema";

import "./styles.scss";

const CinemaPage: React.FC = () => {
    const { id = "" } = useParams();

    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [cinema, setCinema] = React.useState<ICinema>({} as ICinema);

    React.useEffect(() => {
        const fetchCinema = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await api.get("cinemaDescriptions/" + id);
                setCinema(response.data);
            } catch (error) {
                const err = error as any;
                setError(err.message ?? null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCinema();
    }, [id]);

    return (
        <div className="cinema-page">
            {error && <Alert type={ALERT.ERROR} message={error} />}
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