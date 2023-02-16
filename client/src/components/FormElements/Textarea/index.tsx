import React from "react";
import TextareaAutosize, { TextareaAutosizeProps } from "react-textarea-autosize";
import cn from "classnames";

import "./styles.scss";

type Props = TextareaAutosizeProps;

const Textarea: React.FC<Props> = ({ className, ...rest }) => {
    return (
        <TextareaAutosize
            {...rest}
            className={cn("textarea", className)}
        />
    );
};

export default Textarea;
