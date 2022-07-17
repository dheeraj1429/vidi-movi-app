import React from "react";
import ReactDOM from "react-dom";
import * as fetch from "./FetchingProgressComponent.style";

function FetchingProgressComponent() {
    return ReactDOM.createPortal(
        <fetch.div>
            <fetch.innerDiv></fetch.innerDiv>
        </fetch.div>,
        document.getElementById("fetch-wating")
    );
}

export default FetchingProgressComponent;
