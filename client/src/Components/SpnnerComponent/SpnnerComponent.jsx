import React from "react";
import * as spnner from "./SpnnerComponent.style";

function SpnnerComponent({ image }) {
    return (
        <spnner.div>
            <img src={image ? image : "/images/spnner.svg"} alt="" />
        </spnner.div>
    );
}

export default SpnnerComponent;
