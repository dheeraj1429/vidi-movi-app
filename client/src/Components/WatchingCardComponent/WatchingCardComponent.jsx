import React from "react";
import * as watching from "./WachingCardComponent.style";

function WatchingCardComponent({ image, heading, subHeading, description, watchTime }) {
    return (
        <watching.coverDiv>
            <watching.innerDiv>
                <watching.moveImageDiv
                    style={{
                        backgroundImage: image,
                    }}
                ></watching.moveImageDiv>
                <watching.movieContentDiv>
                    <h5>{heading}</h5>
                    <p>{subHeading}</p>
                    <span>{description}</span>
                </watching.movieContentDiv>
                <watching.watchTimeLineDiv>
                    <watching.watchTimer
                        style={
                            watchTime
                                ? {
                                      width: `${watchTime}`,
                                  }
                                : null
                        }
                    />
                </watching.watchTimeLineDiv>
            </watching.innerDiv>
        </watching.coverDiv>
    );
}

export default WatchingCardComponent;
