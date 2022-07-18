import React from "react";
import * as heading from "./CartHeadingComponent.style";

function CartHeadingComponent({ text }) {
    return (
        <heading.div>
            <heading.heading>
                <h1>{text}</h1>
            </heading.heading>
        </heading.div>
    );
}

export default CartHeadingComponent;
