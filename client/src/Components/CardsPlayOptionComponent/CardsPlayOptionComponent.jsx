import React from "react";
import * as card from "./CardsPlayOptionComponent.style";

function CardsPlayOptionComponent({ onMouseEnter, onMouseLeave }) {
    return (
        <card.playDiv className="play-div">
            <a class="glightbox_video" onMouseEnter={onMouseEnter ? onMouseEnter : null} onMouseLeave={onMouseLeave ? onMouseLeave : null}>
                <svg width="131" height="131" viewBox="0 0 131 131" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        class="inner-circle"
                        d="M65 21C40.1488 21 20 41.1488 20 66C20 90.8512 40.1488 111 65 111C89.8512 111 110 90.8512 110 66C110 41.1488 89.8512 21 65 21Z"
                        fill="white"
                    ></path>
                    <circle class="outer_circle" cx="65.5" cy="65.5" r="64" stroke="white"></circle>
                    <path class="play" fill-rule="evenodd" clip-rule="evenodd" d="M60 76V57L77 66.7774L60 76Z" fill="#BF2428"></path>
                </svg>
            </a>
        </card.playDiv>
    );
}

export default CardsPlayOptionComponent;
