import React from "react";
import * as watching from "./WachingCardComponent.style";
import { backendConfigData } from "../../Utils/backendData";
import CardsPlayOptionComponent from "../CardsPlayOptionComponent/CardsPlayOptionComponent";

function WatchingCardComponent({ data }) {
    return (
        <watching.coverDiv>
            <watching.innerDiv>
                <watching.moveImageDiv
                    style={{
                        backgroundImage: `url(${backendConfigData.imageUrl}/${data.moviesId.thumbnailName})`,
                    }}
                >
                    <CardsPlayOptionComponent classCl={"icons_holder"} id={data.moviesId._id} name={data.moviesId.name} />
                </watching.moveImageDiv>
                <watching.movieContentDiv>
                    <h5>{data.moviesId.name.slice(0, 20)}..</h5>
                    <p>{data.moviesId.genra}</p>
                    <span>{data.moviesId.description.slice(0, 30)}...</span>
                </watching.movieContentDiv>
                <watching.watchTimeLineDiv>
                    <watching.watchTimer
                        style={{
                            width: `${data.videoCurrentTime}%`,
                        }}
                    />
                </watching.watchTimeLineDiv>
            </watching.innerDiv>
        </watching.coverDiv>
    );
}

export default WatchingCardComponent;
