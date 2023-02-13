import React from "react";
import ContentLoader from "react-content-loader";

type Props = {
    className?: string;
};

const PreviewLoader: React.FC<Props> = ({ className }) => {
    return (
        <ContentLoader
            speed={2}
            width="100%"
            height="100%"
            viewBox="0 0 326 253"
            backgroundColor="#0e1834"
            foregroundColor="#1e1d3e"
            className={className ?? ""}
        >
            <rect x="0" y="0" rx="10" ry="10" width="326" height="208" />
            <rect x="0" y="215" rx="10" ry="10" width="40" height="14" />
            <rect x="45" y="215" rx="10" ry="10" width="40" height="14" />
            <rect x="89" y="215" rx="10" ry="10" width="40" height="14" />
            <rect x="0" y="234" rx="10" ry="10" width="140" height="18" />
        </ContentLoader>
    );
};

export default PreviewLoader;
