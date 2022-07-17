import React from "react";
import * as listFilter from "./MoviesFilterListComponent.style";

function MoviesFilterListComponent({ innertext, icon, onClick, children }) {
    return (
        <listFilter.list onClick={onClick}>
            {children ? (
                children
            ) : (
                <>
                    {icon}
                    <p>{innertext}</p>
                </>
            )}
        </listFilter.list>
    );
}

export default MoviesFilterListComponent;
