import React from "react";
import * as card from "./MoviesCardsComponent.style";
import { backendConfigData } from "../../Utils/backendData";
import CardsPlayOptionComponent from "../CardsPlayOptionComponent/CardsPlayOptionComponent";

function MoviesCardsComponent({ data, closeIcon }) {
    return (
        <card.mainDiv>
            <card.div className="card_div_cl">
                <card.cartContentDiv>
                    {closeIcon ? closeIcon : null}
                    <card.moviDiv
                        style={{
                            backgroundImage: `url(${backendConfigData.imageUrl}/${data.thumbnailName})`,
                        }}
                    >
                        <CardsPlayOptionComponent classCl={"icons_holder"} id={data._id} name={data.name} />
                        <card.progressPosDiv>
                            <card.progress>
                                <card.progressInner />
                            </card.progress>
                        </card.progressPosDiv>
                    </card.moviDiv>
                </card.cartContentDiv>
            </card.div>
        </card.mainDiv>
    );
}

export default MoviesCardsComponent;
