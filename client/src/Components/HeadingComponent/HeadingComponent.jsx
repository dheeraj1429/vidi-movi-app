import React from "react";
import * as head from "./HeadingComponent.style";

function HeadingComponent({ heading }) {
    return (
        <head.Popular>
            <head.innerDiv>
                <h1>{heading}</h1>
            </head.innerDiv>
        </head.Popular>
    );
}

export default HeadingComponent;
