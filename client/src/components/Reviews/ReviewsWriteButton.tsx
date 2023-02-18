import React from "react";
import { useUser } from "../../hooks/useUser";
import LightButton from "../LightButton";
import { LOGIN_ROUTE } from "../../constants/routesPathnames";
import { useFromNavigate } from "../../hooks/useFromNavigate";

type Props = {
    setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
    isCreating: boolean;
    className?: string;
};

const ReviewsWriteButton: React.FC<Props> = ({ className, isCreating, setIsCreating }) => {
    const { isAuth } = useUser();

    const navigateFrom = useFromNavigate();

    const handleClick = () => {
        if (isAuth) setIsCreating(true);
        else navigateFrom(LOGIN_ROUTE);
    };

    return (
        <>
            {!isCreating && (
                <>
                    <LightButton className={className ?? ""} onClick={handleClick}>
                        {" "}
                        + Write review
                    </LightButton>
                </>
            )}
        </>
    );
};

export default ReviewsWriteButton;
