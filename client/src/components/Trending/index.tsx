import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import SectionTitle from "../SectionTitle";
import Preview from "../Preview";
import cn from "classnames";
import PreviewLoader from "../Preview/PreviewLoader";
import RetryError from "../RetryError";
import { ITrailer } from "../../models/cinema";
import TrendsService from "../../services/TrendsService";
import axios from "axios";

import "swiper/swiper.min.css";
import "./styles.scss";

type Props = {
    className?: string;
};

const Trending: React.FC<Props> = ({ className }) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [list, setList] = React.useState<ITrailer[]>([]);

    const fetchTrends = React.useCallback(async () => {
        const cancelToken = axios.CancelToken.source();

        setError(null);
        setIsLoading(true);
        try {
            const response = await TrendsService.fetchTrends({ cancelToken: cancelToken.token });
            setList(response.data);
        } catch (error) {
            const err = error as any;
            setError(err.message ?? null);
        } finally {
            setIsLoading(false);
        }
        return () => {
            cancelToken.cancel();
        };
    }, []);

    React.useEffect(() => {
        fetchTrends();
    }, [fetchTrends]);

    return (
        <section className={cn("trending", className)}>
            <SectionTitle className="trending__title" text="Trending" />
            {error && <RetryError message={error} onClick={fetchTrends} data-testid="trends-error" />}
            {isLoading && (
                <div className="trending__wrapper" data-testid="trends-loading">
                    {[...new Array(3)].map((item, index) => (
                        <PreviewLoader className="trending__loader" key={index} />
                    ))}
                </div>
            )}
            {!error && !isLoading && (
                <Swiper
                    className="swiper trending__swiper"
                    modules={[Autoplay]}
                    autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    loop={true}
                    speed={2000}
                    spaceBetween={20}
                    slidesPerView={3}
                    breakpoints={{
                        991: {
                            slidesPerView: 3,
                        },
                        600: {
                            slidesPerView: 2,
                        },
                        320: {
                            slidesPerView: 1,
                        },
                    }}
                >
                    {list.map((trend) => (
                        <SwiperSlide className="trending__slide" key={trend.id}>
                            <Preview preview={trend} size="big" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </section>
    );
};

export default Trending;
