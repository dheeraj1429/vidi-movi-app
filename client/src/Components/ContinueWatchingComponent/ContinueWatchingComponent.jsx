import React, { useEffect } from "react";
import * as watching from "./ContinueWatchingComponent.style.js";
import WatchingCardComponent from "../WatchingCardComponent/WatchingCardComponent.jsx";
import { userHistory } from "../../Redux/Action/indexAction.js";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";

function ContinueWatchingComponent({ data }) {
    const userHistoryObject = useSelector((state) => state.index.userHistory);
    const dispatch = useDispatch();

    var settings = {
        dots: false,
        infinite: true,
        speed: 200,
        slidesToShow: 4,
        slidesToScroll: 3,
        arrows: false,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
        ],
    };

    useEffect(() => {
        dispatch(userHistory());
    }, []);

    return (
        <>
            <watching.div>
                {!!userHistoryObject && userHistoryObject?.length >= 4 ? (
                    <Slider {...settings}>
                        {userHistoryObject.map((el) => (
                            <WatchingCardComponent key={el._id} data={el} />
                        ))}
                    </Slider>
                ) : !!userHistoryObject && !!userHistoryObject?.length ? (
                    <watching.flexDiv>
                        {userHistoryObject.map((el) => (
                            <WatchingCardComponent key={el._id} data={el} />
                        ))}
                    </watching.flexDiv>
                ) : null}
            </watching.div>
        </>
    );
}

export default ContinueWatchingComponent;
