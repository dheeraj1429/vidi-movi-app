import React from "react";
import * as head from "./HeadingComponent.style";

function HeadingComponent({ heading }) {
    return (
        <head.Popular>
            <h1>{heading}</h1>
        </head.Popular>
    );
}

export default HeadingComponent;
