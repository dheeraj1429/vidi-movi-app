import React from "react";
import * as watching from "./ContinueWatchingComponent.style.js";
import WatchingCardComponent from "../WatchingCardComponent/WatchingCardComponent.jsx";

function ContinueWatchingComponent() {
    return (
        <watching.div>
            <WatchingCardComponent
                image={`url(images/popular.jpg)`}
                heading={"13 Reason Why"}
                subHeading={"Episode 01"}
                description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
                watchTime={"70%"}
            />
        </watching.div>
    );
}

export default ContinueWatchingComponent;
