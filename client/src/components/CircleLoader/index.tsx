import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import cn from "classnames";

import "./styles.scss";
import { LoaderSizeProps } from "react-spinners/helpers/props";

const override: React.CSSProperties = {
    borderWidth: "3px",
};

interface Props extends LoaderSizeProps {
    className?: string;
}

const CircleLoader: React.FC<Props> = ({ className, size = 30, ...rest }) => {
    return (
        <div className={cn("circle-loader", className)}>
            <ClipLoader {...rest} cssOverride={override} color="#3a3a88" size={size} />
        </div>
    );
};

export default CircleLoader;
