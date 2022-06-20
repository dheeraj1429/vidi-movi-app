import React from "react";
import * as listFilter from "./MoviesFilterListComponent.style";

function MoviesFilterListComponent({ innertext, icon, onClick }) {
    return (
        <listFilter.list onClick={onClick}>
            {icon}
            <p>{innertext}</p>
        </listFilter.list>
    );
}

export default MoviesFilterListComponent;
