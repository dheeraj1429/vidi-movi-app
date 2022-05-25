import React from "react";
import ReactDOM from "react-dom";
import * as over from "./OverLayComponent.style";

function OverLayComponent({ isShow }) {
    console.log(isShow);

    return ReactDOM.createPortal(
        <over.div
            style={
                isShow
                    ? {
                          visibility: "visible",
                      }
                    : null
            }
        />,
        document.getElementById("overlayDiv")
    );
}

export default OverLayComponent;
