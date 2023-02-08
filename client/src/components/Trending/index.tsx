import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import SectionTitle from "../SectionTitle";
import Card from "../Card";
import cn from "classnames";

import "swiper/css";
import "./styles.scss";

type Props = {
    className?: string;
};

const Trending: React.FC<Props> = ({ className }) => {
    return (
        <section className={cn("trending", className)}>
            <SectionTitle className="trending__title" text="Trending" />
            <Swiper
                className="swiper trending__swiper"
                modules={[Autoplay]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                speed={2000}
                spaceBetween={20}
                slidesPerView={3}
                loop={true}
                breakpoints={{
                    991: {
                        slidesPerView: 3,
                    },
                    600: {
                        slidesPerView: 2,
                    },
                    320: {
                        slidesPerView: 1,
                    }
                }}
            >
                <SwiperSlide className="trending__slide">
                    <Card size="big" />
                </SwiperSlide>
                <SwiperSlide className="trending__slide">
                    <Card size="big" />
                </SwiperSlide>
                <SwiperSlide className="trending__slide">
                    <Card size="big" />
                </SwiperSlide>
                <SwiperSlide className="trending__slide">
                    <Card size="big" />
                </SwiperSlide>
                <SwiperSlide className="trending__slide">
                    <Card size="big" />
                </SwiperSlide>
                <SwiperSlide className="trending__slide">
                    <Card size="big" />
                </SwiperSlide>
                <SwiperSlide className="trending__slide">
                    <Card size="big" />
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Trending;
