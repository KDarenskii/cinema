import React from "react";
import Input from "../FormElements/Input";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDebounceFn } from "ahooks";
import { useSearchParams } from "react-router-dom";

import "./styles.scss";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Search: React.FC<Props> = ({ className, ...rest }) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = React.useState(searchParams.get("q") || "");

    const setParams = (value: string) => {
        if (value.length < 1) searchParams.delete("q");
        else searchParams.set("q", value);
        setSearchParams(searchParams);
    };
    const { run: debounceSetParams } = useDebounceFn(setParams, { wait: 300 });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
        debounceSetParams(event.target.value);
    }

    React.useEffect(() => {
        if (!searchParams.has("q")) setSearchValue("");
    }, [searchParams])

    return (
        <div className={cn("search", className)}>
            <FontAwesomeIcon className="search__icon" icon={"search"} />
            <Input
                {...rest}
                className="search__input"
                value={searchValue}
                onChange={handleChange}
                type="text"
                name="search"
                placeholder="Search for movies or TV series"
            />
        </div>
    );
};

export default Search;