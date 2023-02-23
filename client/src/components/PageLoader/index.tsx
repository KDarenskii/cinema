import React from "react";
import CircleLoader from "../CircleLoader";

import "./styles.scss";

const PageLoader: React.FC = () => {
    return (
        <div className="page-loader" data-testid="page-loading">
            <CircleLoader size={50} />
        </div>
    );
};

export default PageLoader;
