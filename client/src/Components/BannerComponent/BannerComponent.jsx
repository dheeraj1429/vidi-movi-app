import React from "react";
import * as Banner from "./BannerComponent.style";
import CustomButtonComponent from "../CustomButtonComponent/CustomButtonComponent";

function BannerComponent() {
    return (
        <Banner.bannerDiv
            className="side_padding"
            style={{
                backgroundImage: `url('/images/slide03.jpg')`,
            }}
        >
            <Banner.contentDiv>
                <h5>Netflix Original</h5>
                <h1>Future Hell</h1>

                <Banner.contentFlex>
                    <p>2015</p>
                    <p>2 Seasons</p>
                    <p className="activeBr">Action</p>
                </Banner.contentFlex>

                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore perferendis est dolorem, eveniet voluptatibus exercitationem dolores a ea error neque
                    excepturi temporibus. Nisi dicta vero, ex distinctio provident magni, velit, error repellendus excepturi libero esse ducimus. Aliquam, velit veritatis?
                    Aspernatur.
                </p>

                <CustomButtonComponent innteText={"Watch Now"} buttonCl={"banner-button"} buttonIcon={"fas fa-play"} />
            </Banner.contentDiv>
        </Banner.bannerDiv>
    );
}

export default BannerComponent;
