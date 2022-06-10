import React, { useState } from "react";
import * as card from "./MoviesCardsComponent.style";
import { backendConfigData } from "../../Utils/backendData";
import CardsPlayOptionComponent from "../CardsPlayOptionComponent/CardsPlayOptionComponent";

function MoviesCardsComponent({ data, closeIcon, style_change }) {
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
        <card.mainDiv>
            <card.div className={style_change ? "second_card_styled" : null}>
                <card.cartContentDiv className={IsEnter ? "Active-movie-card" : null}>
                    {closeIcon ? closeIcon : null}
                    <card.moviDiv
                        style={
                            !ShowVideo
                                ? {
                                      backgroundImage: `url(${backendConfigData.imageUrl}/${data.thumbnailName})`,
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
                {/* {style_change ? (
                    <>
                        <card.styledSecond>
                            <h4>{name}</h4>
                            <p>{description.slice(0, 200)}..</p>
                        </card.styledSecond>
                    </>
                ) : null} */}
            </card.div>
        </card.mainDiv>
    );
}

export default MoviesCardsComponent;
