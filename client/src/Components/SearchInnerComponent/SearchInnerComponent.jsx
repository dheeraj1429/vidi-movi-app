import React from "react";
import { RiSearchLine } from "@react-icons/all-files/ri/RiSearchLine";
import * as search from "./SearchInnerComponent.style";
import { Link } from "react-router-dom";

function SearchInnerComponent({ innerText, id }) {
    return (
        <Link to={`/movie/play/${innerText}/${id}`}>
            <search.searchCardInnerDiv>
                <div>
                    <RiSearchLine />
                </div>
                <div>
                    <p>{innerText}</p>
                </div>
            </search.searchCardInnerDiv>
        </Link>
    );
}

export default SearchInnerComponent;
