import React from "react";
import * as heading from "./DashBoardHeadingComponent.style";

function DashBoardHeadingComponent({ title, titleNav, elmCl }) {
    return (
        <heading.div>
            <h4 className={elmCl}>{title}</h4>
            {titleNav ? <p>{titleNav}</p> : null}
        </heading.div>
    );
}

export default DashBoardHeadingComponent;
