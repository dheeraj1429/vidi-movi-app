import React from "react";
import * as popup from "./MoviesUpdatePopUpComponent.style";
import ReactDom from "react-dom";
import { AiOutlineCloseCircle } from "@react-icons/all-files/ai/AiOutlineCloseCircle";
import { togglePopUp } from "../../Redux/Action/indexAction";
import { useSelector, useDispatch } from "react-redux";

function MoviesUpdatePopUpComponent({ isShow }) {
    const selector = useSelector((state) => state.index.showPopUp);
    const dispatch = useDispatch();

    return ReactDom.createPortal(
        <popup.div
            style={
                isShow
                    ? {
                          visibility: "visible",
                      }
                    : {
                          visibility: "hidden",
                      }
            }
        >
            <popup.innerDiv>
                <popup.closeIcon onClick={() => dispatch(togglePopUp(!selector))}>
                    <AiOutlineCloseCircle onClick={() => dispatch(togglePopUp(true))} />
                </popup.closeIcon>
            </popup.innerDiv>
        </popup.div>,
        document.getElementById("edit_popup")
    );
}

export default MoviesUpdatePopUpComponent;
