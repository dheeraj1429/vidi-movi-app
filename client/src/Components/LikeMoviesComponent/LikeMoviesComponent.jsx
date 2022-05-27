import React from "react";
import * as like from "./LikeMoviesComponent.style";
import BannerComponent from "../BannerComponent/BannerComponent";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import HeadingComponent from "../HeadingComponent/HeadingComponent";

function LikeMoviesComponent() {
    return (
        <like.div>
            <like.innerDiv>
                <NavbarComponent />
                <BannerComponent
                    backgroundImage={"/images/fal-1.jpg"}
                    heading={"LIKE MOVIES"}
                    textContent={` Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                            dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it`}
                />
                <HeadingComponent heading={"Movies"} />
            </like.innerDiv>
        </like.div>
    );
}

export default LikeMoviesComponent;
