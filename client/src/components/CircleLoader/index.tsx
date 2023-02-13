import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import cn from "classnames";

import "./styles.scss";

const override: React.CSSProperties = {
    borderWidth: "3px",
};

type Props = {
    className?: string;
};

const CircleLoader: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn("circle-loader", className)}>
            <ClipLoader cssOverride={override} color="#3a3a88" size={30} />
        </div>
    );
};

export default CircleLoader;
