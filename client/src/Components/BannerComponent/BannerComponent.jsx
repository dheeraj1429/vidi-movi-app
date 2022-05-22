import React from "react";
import * as banner from "./BannerComponent.style";

function BannerComponent() {
    return (
        <banner.div>
            <banner.bannerImage
                style={{
                    backgroundImage: `url('/images/title-image-1.webp')`,
                }}
            >
                <banner.flexDiv>
                    <banner.contentDiv>
                        <h5>2019</h5>
                        <h4>ADVENCE, FANTASY, MISTERY</h4>
                        <h1>GREEN BOOK</h1>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                            dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
                        </p>

                        <banner.watchDiv></banner.watchDiv>
                    </banner.contentDiv>
                </banner.flexDiv>
            </banner.bannerImage>
        </banner.div>
    );
}

export default BannerComponent;
