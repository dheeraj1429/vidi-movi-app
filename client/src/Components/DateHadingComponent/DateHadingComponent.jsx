import React from "react";
import * as date from "./DateHadingComponent.style";

function DateHadingComponent({ innerText }) {
    return (
        <date.div>
            <h1>{innerText}</h1>
        </date.div>
    );
}

export default DateHadingComponent;
