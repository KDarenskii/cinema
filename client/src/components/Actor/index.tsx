import React from "react";
import { Link } from "react-router-dom";
import { IActor } from "../../models/actor";
import DescriptionHeader from "../Description/DescriptionHeader";
import DescriptionInfo from "../Description/DescriptionInfo";
import DescriptionInfoItem from "../Description/DescriptionInfo/DescriptionInfoItem";
import DescriptionList from "../Description/DescriptionList";
import DescriptionPoster from "../Description/DescriptionPoster";

import "./styles.scss";

type Props = {
    actor: IActor;
    className?: string;
};

const Actor: React.FC<Props> = ({ actor }) => {
    return (
        <section className="actor">
            <div className="actor__intro">
                <DescriptionPoster className="actor__intro-poster" src={actor.posterSrc} />
            </div>

            <div className="actor__content">
                <DescriptionHeader className="actor__content-header" title={actor.name} />

                <DescriptionPoster className="actor__content-intro-poster" src={actor.posterSrc} />

                <div className="actor__content-about">
                    <DescriptionInfo title="About person">
                        <DescriptionInfoItem name="Career" value={actor.career} />
                        <DescriptionInfoItem name="Height" value={actor.height + " cm"} />
                        <DescriptionInfoItem
                            name="Birthplace"
                            value={[actor.birthplace?.city, actor.birthplace?.state, actor.birthplace?.country]}
                        />
                        <DescriptionInfoItem name="Genres" value={actor.genres} />
                        <DescriptionInfoItem name="Movies amount" value={String(actor.filmsNumber)} />
                    </DescriptionInfo>

                    <DescriptionList className="actor__content-about-list" title="Best films">
                        {actor.bestWorks &&
                            actor.bestWorks.map((work, index) => (
                                <Link className="actor__content-about-link" to={"/cinema/film/" + work.id} key={index}>
                                    {work.title}
                                </Link>
                            ))}
                    </DescriptionList>
                </div>
            </div>
        </section>
    );
};

export default Actor;
