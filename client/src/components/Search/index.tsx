import React from "react";
import Input from "../FormElements/Input";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./styles.scss";

type Props = {
    className?: string;
};

const Search: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn('search', className)}>
            <FontAwesomeIcon className="search__icon" icon={"search"} />
            <Input
                className="search__input"
                type="text"
                name="search"
                placeholder="Search for movies or TV series"
            />
        </div>
    );
};

export default Search;
