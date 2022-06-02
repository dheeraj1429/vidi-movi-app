import React, { useState } from "react";
import * as card from "./MoviesCardsComponent.style";
import { backendConfigData } from "../../Utils/backendData";
import CardsPlayOptionComponent from "../CardsPlayOptionComponent/CardsPlayOptionComponent";

function MoviesCardsComponent({ name, movieVideo, genra, thumbnailName, data, closeIcon }) {
    const [IsEnter, setIsEnter] = useState(false);
    const [ShowVideo, setShowVideo] = useState(false);

    const MouseEnterHanlder = async function () {
        setIsEnter(true);
    };

    const MouseLeaveHanlder = async function () {
        setIsEnter(false);
        setShowVideo(false);
    };

    return (
        <card.div>
            <card.cartContentDiv className={IsEnter ? "Active-movie-card" : null}>
                {closeIcon ? closeIcon : null}
                <card.moviDiv
                    style={
                        !ShowVideo
                            ? {
                                  backgroundImage: `url(${backendConfigData.imageUrl}/${thumbnailName})`,
                              }
                            : null
                    }
                >
                    <CardsPlayOptionComponent onMouseEnter={MouseEnterHanlder} onMouseLeave={MouseLeaveHanlder} id={data._id} name={data.name} />
                    <card.progressPosDiv>
                        <card.progress>
                            <card.progressInner />
                        </card.progress>
                    </card.progressPosDiv>
                </card.moviDiv>
            </card.cartContentDiv>
        </card.div>
    );
}

export default MoviesCardsComponent;
