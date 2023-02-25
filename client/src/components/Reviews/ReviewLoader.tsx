import React from "react";
import ContentLoader from "react-content-loader";

const ReviewLoader: React.FC = () => {
    return (
        <ContentLoader
            data-testid="review-loader"
            speed={2}
            width={600}
            height={265}
            viewBox="0 0 600 265"
            backgroundColor="#536593"
            foregroundColor="#8280b7"
        >
            <rect x="20" y="20" rx="9" ry="9" width="150" height="25" />
            <rect x="20" y="60" rx="9" ry="9" width="560" height="97" />
            <rect x="20" y="172" rx="9" ry="9" width="106" height="22" />
            <rect x="480" y="209" rx="9" ry="9" width="100" height="36" />
            <rect x="334" y="209" rx="9" ry="9" width="136" height="36" />
        </ContentLoader>
    );
};

export default ReviewLoader;
