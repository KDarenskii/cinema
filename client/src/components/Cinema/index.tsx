import React from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../api";
import { CINEMA_TYPE } from "../../constants/cinemaType";
import { ICinema, ITrailer } from "../../models/cinema";
import formatNumber from "../../utils/formatNumber";
import DescriptionHeader from "../Description/DescriptionHeader";
import DescriptionInfo from "../Description/DescriptionInfo";
import DescriptionInfoItem from "../Description/DescriptionInfo/DescriptionInfoItem";
import DescriptionList from "../Description/DescriptionList";
import DescriptionPoster from "../Description/DescriptionPoster";
import LightButton from "../LightButton";
import Preview from "../Preview";
import cn from "classnames";

import "./styles.scss";

type Props = {
    className?: string;
};

const Cinema: React.FC<Props> = ({ className }) => {
    const { id = "" } = useParams();

    const [isDescriptionLoading, setIsDescriptionLoading] = React.useState(false);
    const [descriptionError, setDescriptionError] = React.useState<string | null>(null);
    const [cinema, setCinema] = React.useState<ICinema>({} as ICinema);

    const [isTrailerLoading, setIsTrailerLoading] = React.useState(false);
    const [trailerError, setTrailerError] = React.useState<string | null>(null);
    const [trailer, setTrailer] = React.useState({} as ITrailer);

    React.useEffect(() => {
        const fetchCinema = async () => {
            setIsDescriptionLoading(true);
            setDescriptionError(null);
            try {
                const response = await api.get("cinemaDescriptions/" + id);
                setCinema(response.data);
            } catch (error) {
                const err = error as any;
                setDescriptionError(err.message ?? null);
            } finally {
                setIsDescriptionLoading(false);
            }
        };
        const fetchTrailer = async () => {
            setIsTrailerLoading(true);
            setTrailerError(null);
            try {
                const response = await api.get("trailers/" + id);
                setTrailer(response.data);
                console.log(response);
            } catch (error) {
                const err = error as any;
                setTrailerError(err.message ?? null);
            } finally {
                setIsTrailerLoading(false);
            }
        };
        fetchTrailer();
        fetchCinema();
    }, [id]);

    return (
        <section className={cn("cinema", className)}>
            <div className="cinema__intro">
                <DescriptionPoster className="cinema__intro-poster" src={cinema.posterSrc} />
                <Preview className="cinema__intro-preview" preview={trailer} />
            </div>
            <div className="cinema__content">
                <DescriptionHeader
                    className="cinema__content-header"
                    title={`${cinema.title} (${cinema.year})`}
                    overview={cinema.description}
                />

                <DescriptionPoster className="cinema__content-intro-poster" src={cinema.posterSrc} />

                <LightButton className="cinema__content-btn">Watch film</LightButton>

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
                                <Link className="cinema__content-about-link" to={"/actor/" + actor.id} key={index}>
                                    {actor.name}
                                </Link>
                            ))}
                    </DescriptionList>
                </div>

                <div className="cinema__content-story">
                    <h4 className="cinema__content-story-title">Short story</h4>
                    <p className="cinema__content-story-text">{cinema.story}</p>
                </div>

                <Preview className="cinema__content-intro-preview" preview={trailer} />
            </div>
        </section>
    );
};

export default Cinema;
