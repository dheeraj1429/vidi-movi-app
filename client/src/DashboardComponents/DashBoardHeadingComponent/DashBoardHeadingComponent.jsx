import React from "react";
import * as heading from "./DashBoardHeadingComponent.style";

function DashBoardHeadingComponent({ title, titleNav, elmCl, total }) {
    return (
        <heading.div>
            <h4 className={elmCl}>
                {title} <span>{total > 0 ? `${total} users` : null}</span>
            </h4>
            {titleNav ? <p>{titleNav}</p> : null}
        </heading.div>
    );
}

export default DashBoardHeadingComponent;
