import React, { useState } from "react";
import * as movies from "./MoviesCardSecondComponent.style";
import { backendConfigData } from "../../Utils/backendData";
import { AiOutlineEdit } from "@react-icons/all-files/ai/AiOutlineEdit";
import { useDispatch } from "react-redux";
import { togglePopUp } from "../../Redux/Action/indexAction";

function MoviesCardSecondComponent({ Album, category, description, genra, thumbnailName }) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(true);

    return (
        <movies.card
            style={{
                backgroundImage: `url(${backendConfigData.imageUrl}/${thumbnailName})`,
            }}
        >
            <movies.dateDiv className="date">{Album}</movies.dateDiv>
            <div className="content">
                <div className="title">{Album}</div>
                <div className="text">{genra}</div>
            </div>
            <div className="sinopse">
                <div className="content-sinopse">
                    <div className="title">{category}</div>
                    <div className="text">{description.slice(0, 600)}...</div>
                </div>
                <div className="view series_lacasa" onClick={() => dispatch(togglePopUp(true))}>
                    edit <AiOutlineEdit />
                </div>
            </div>
        </movies.card>
    );
}

export default MoviesCardSecondComponent;
