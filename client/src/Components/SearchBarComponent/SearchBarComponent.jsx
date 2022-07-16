import React, { useState, useRef, useEffect } from "react";
import { RiSearchLine } from "@react-icons/all-files/ri/RiSearchLine";
import * as search from "./SearchBarComponent.style";
import SearchInnerComponent from "../SearchInnerComponent/SearchInnerComponent";
import { debounce } from "lodash";
import { searchMovieName, getAllSearchMovies } from "../../Redux/Action/indexAction";
import { loadingSearchMovies } from "../../Redux/Action/appAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function SearchBarComponent() {
    const [Search, setSearch] = useState("");
    const [dbValue, saveToDb] = useState("");
    const [ShowSearchList, setShowSearchList] = useState(false);
    const input = useRef(null);

    let searchData = useSelector((state) => state.index.searchData);
    const dispatch = useDispatch();
    const location = useLocation();

    const debouncedSave = useRef(
        debounce((nextValue) => {
            saveToDb(nextValue);
        }, 200)
    ).current;

    const handleChange = (event) => {
        const { value: nextValue } = event.target;
        setSearch(nextValue);

        let searchQueryString;

        if (searchData && !!searchData.findMoviesData.length) {
            searchQueryString = searchData.findMoviesData.filter((el) => el.name.toLowerCase().includes(Search.toLowerCase()));

            if (!searchQueryString.length) {
                debouncedSave(nextValue);
            } else {
                return;
            }
        }

        if (!searchQueryString) {
            debouncedSave(nextValue);
        }
    };

    useEffect(() => {
        if (!dbValue) return;
        dispatch(searchMovieName({ movieName: dbValue }));
        setShowSearchList(true);
    }, [dbValue]);

    useEffect(() => {
        if (!!Search.length) {
            setShowSearchList(true);
        } else {
            setShowSearchList(false);
        }
    }, [Search]);

    const SearchHandler = function () {
        // setShowSearchList(false);
        if (Search.length) {
            dispatch(getAllSearchMovies({ searchQuery: Search }));
            dispatch(loadingSearchMovies(true));
            setShowSearchList(false);
        }
    };

    return (
        <search.div>
            <search.flexDiv>
                <Link to={Search.length ? `/movies-search/${Search}` : location.pathname}>
                    <RiSearchLine onClick={SearchHandler} />
                </Link>
                <search.searchBarDiv className={ShowSearchList ? "active_search_bar" : null}>
                    <input
                        type="text"
                        name="search"
                        value={Search}
                        onChange={handleChange}
                        placeholder="Search.."
                        autoComplete="off"
                        ref={(el) => (input.current = el)}
                    />
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
