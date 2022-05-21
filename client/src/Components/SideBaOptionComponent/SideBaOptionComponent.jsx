import React from "react";
import * as sidebar from "./SideBaOptionComponent.style";

function SideBaOptionComponent({ icon, innerText, event, activeBar }) {
    return (
        <sidebar.div onClick={event ? event : null} data-target={innerText} className={activeBar === innerText ? "active-bar" : null}>
            <sidebar.innerDiv>
                <sidebar.svgDiv>{icon}</sidebar.svgDiv>
                <p>{innerText}</p>
            </sidebar.innerDiv>
        </sidebar.div>
    );
}

export default SideBaOptionComponent;
