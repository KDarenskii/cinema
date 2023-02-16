import React from "react";
import cn from "classnames";
import LightButton from "../../LightButton";
import ModalVideo from "react-modal-video";

type Props = {
    className?: string;
    videoId: string;
};

const CinemaWatchButton: React.FC<Props> = ({ className, videoId }) => {

    const [isActive, setIsActive] = React.useState(false);

    return (
        <>
            <LightButton className={cn("cinema-watch-btn", className)} onClick={() => setIsActive(true)} >Watch film</LightButton>
            <ModalVideo channel="youtube" youtube={{ autoplay: 1, mute: 1 }} isOpen={isActive} videoId={videoId} onClose={() => setIsActive(false)} />
        </>
    );
};

export default CinemaWatchButton;
