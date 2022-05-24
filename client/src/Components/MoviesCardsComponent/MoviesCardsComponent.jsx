import React from "react";
import * as card from "./MoviesCardsComponent.style";
import { BsPlay } from "@react-icons/all-files/bs/BsPlay";

function MoviesCardsComponent({ data }) {
    return (
        <card.div>
            <card.cartContentDiv>
                <card.moviDiv
                    style={{
                        backgroundImage: `url(${data.imagePath})`,
                    }}
                >
                    <card.playDiv className="play-div">
                        <BsPlay />
                    </card.playDiv>

                    <card.cartAllDes className="movi-information-div">
                        <h3>{data.moviName}</h3>
                        <card.info>
                            <p>{data.totalTime}</p>
                            <span>{data.moviAction}</span>
                        </card.info>
                    </card.cartAllDes>

                    <card.progressPosDiv>
                        <card.progress>
                            <card.progressInner
                            // style={{
                            //     width: "50%",
                            // }}
                            />
                        </card.progress>
                    </card.progressPosDiv>
                </card.moviDiv>
            </card.cartContentDiv>
        </card.div>
    );
}

export default MoviesCardsComponent;
