import React from "react";
import * as banner from "./BannerComponent.style";

function BannerComponent({ backgroundImage, subHeading, heading, textContent, date }) {
    return (
        <banner.div>
            <banner.bannerImage
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                }}
            >
                <banner.flexDiv>
                    <banner.contentDiv>
                        <h5>{date}</h5>
                        <h4>{subHeading}</h4>
                        <h1>{heading}</h1>
                        <p>{textContent}</p>

                        <banner.watchDiv></banner.watchDiv>
                    </banner.contentDiv>
                </banner.flexDiv>
            </banner.bannerImage>
        </banner.div>
    );
}

export default BannerComponent;
