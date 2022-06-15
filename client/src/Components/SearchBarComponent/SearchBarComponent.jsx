import React, { useState, useRef, useEffect } from "react";
import { RiSearchLine } from "@react-icons/all-files/ri/RiSearchLine";
import * as search from "./SearchBarComponent.style";
import SearchInnerComponent from "../SearchInnerComponent/SearchInnerComponent";
import { debounce } from "lodash";
import { searchMovieName } from "../../Redux/Action/indexAction";
import { useDispatch, useSelector } from "react-redux";

function SearchBarComponent() {
    const [Search, setSearch] = useState();
    const [dbValue, saveToDb] = useState("");

    const searchData = useSelector((state) => state.index.searchData);

    const dispatch = useDispatch();

    const debouncedSave = useRef(
        debounce((nextValue) => {
            saveToDb(nextValue);
        }, 500)
    ).current;

    const handleChange = (event) => {
        const { value: nextValue } = event.target;
        setSearch(nextValue);
        debouncedSave(nextValue);
    };

    useEffect(() => {
        if (!dbValue) return;
        dispatch(searchMovieName({ movieName: dbValue }));
    }, [dbValue]);

    return (
        <search.div>
            <search.flexDiv>
                <RiSearchLine />
                <search.searchBarDiv className={!!Search ? "active_search_bar" : ""}>
                    <input type="text" name="search" value={Search} onChange={handleChange} placeholder="Search.." />
                    <search.searchCard>
                        {searchData && !!searchData.findMoviesData.length
                            ? searchData.findMoviesData.map((el) => <SearchInnerComponent innerText={el.name} key={el._id} id={el._id} />)
                            : null}
                    </search.searchCard>
                </search.searchBarDiv>
            </search.flexDiv>
        </search.div>
    );
}

export default SearchBarComponent;
