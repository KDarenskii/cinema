import React from "react";
import { Link } from "react-router-dom";
import { CINEMA_TYPE } from "../../constants/cinemaType";
import { ICinema, ITrailer } from "../../models/cinema";
import formatNumber from "../../utils/formatNumber";
import DescriptionHeader from "../Description/DescriptionHeader";
import DescriptionInfo from "../Description/DescriptionInfo";
import DescriptionInfoItem from "../Description/DescriptionInfo/DescriptionInfoItem";
import DescriptionList from "../Description/DescriptionList";
import DescriptionPoster from "../Description/DescriptionPoster";
import Preview from "../Preview";
import cn from "classnames";
import PreviewLoader from "../Preview/PreviewLoader";
import RetryError from "../RetryError";
import TrailerService from "../../services/TrailerService";
import LightButton from "../LightButton";
import ModalVideo from "react-modal-video";

import "./styles.scss";

type Props = {
    cinema: ICinema;
    className?: string;
};

const Cinema: React.FC<Props> = ({ cinema, className }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [trailer, setTrailer] = React.useState({} as ITrailer);

    const [isVideoActive, setIsVideoActive] = React.useState(false);

    const fetchTrailer = React.useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await TrailerService.fetchTrailerById(cinema.id);
            setTrailer(response.data);
        } catch (error) {
            const err = error as any;
            setError(err.message ?? null);
        } finally {
            setIsLoading(false);
        }
    }, [cinema.id]);

    React.useEffect(() => {
        fetchTrailer();
    }, [fetchTrailer]);

    return (
        <section className={cn("cinema", className)}>
            <div className="cinema__intro">
                <DescriptionPoster className="cinema__intro-poster" src={cinema.posterSrc} />
                {error && <RetryError onClick={fetchTrailer} message={error} />}
                {isLoading && <PreviewLoader className="cinema__intro-loader" />}
                {!error && !isLoading && <Preview className="cinema__intro-preview" onClick={() => setIsVideoActive(true)} preview={trailer} />}
            </div>
            <div className="cinema__content">
                <DescriptionHeader
                    className="cinema__content-header"
                    title={`${cinema.title} (${cinema.year})`}
                    overview={cinema.description}
                />

                <DescriptionPoster className="cinema__content-intro-poster" src={cinema.posterSrc} />

                <LightButton className="cinema__content-btn" onClick={() => setIsVideoActive(true)}>
                    Watch film
                </LightButton>
                <ModalVideo
                    channel="youtube"
                    youtube={{ autoplay: 1, mute: 1 }}
                    isOpen={isVideoActive}
                    videoId={cinema.videoId}
                    onClose={() => setIsVideoActive(false)}
                />

                <div className="cinema__content-about">
                    <DescriptionInfo title={cinema.type === CINEMA_TYPE.MOVIE ? "About film" : "About serial"}>
                        <DescriptionInfoItem name="Production year" value={cinema.year} />
                        <DescriptionInfoItem name="Country" value={cinema.countries} />
                        <DescriptionInfoItem name="Genre" value={cinema.genres} />
                        <DescriptionInfoItem name="Director" value={cinema.directors} />
                        <DescriptionInfoItem name="Screenwriter" value={cinema.screenwriters} />
                        <DescriptionInfoItem name="Composer" value={cinema.composers} />
                        <DescriptionInfoItem name="Budget" value={String(formatNumber(cinema.budget))} />
                        <DescriptionInfoItem name="Profit" value={String(formatNumber(cinema.profit))} />
                        <DescriptionInfoItem name="Age" value={cinema.age + "+"} />
                    </DescriptionInfo>

                    <DescriptionList className="cinema__content-about-list" title="Lead roles">
                        {cinema.actors &&
                            cinema.actors.map((actor, index) => (
                                <Link className="cinema__content-about-link" to={"/cinema/actor/" + actor.id} key={index}>
                                    {actor.name}
                                </Link>
                            ))}
                    </DescriptionList>
                </div>

                <div className="cinema__content-story">
                    <h4 className="cinema__content-story-title">Short story</h4>
                    <p className="cinema__content-story-text">{cinema.story}</p>
                </div>

                <div className="cinema__content-trailer">
                    {error && <RetryError onClick={fetchTrailer} message={error} />}
                    {isLoading && <PreviewLoader className="cinema__content-trailer-loader" />}
                    {!error && !isLoading && <Preview className="cinema__content-trailer-preview" onClick={() => setIsVideoActive(true)} preview={trailer} />}
                </div>
            </div>
        </section>
    );
};

export default Cinema;
