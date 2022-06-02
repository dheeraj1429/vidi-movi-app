import React, { useEffect } from "react";
import * as history from "./HistoryPageComponent.style";
import DateHadingComponent from "../DateHadingComponent/DateHadingComponent";
import MoviesCardsComponent from "../MoviesCardsComponent/MoviesCardsComponent";
import { userHistory as historyFunction } from "../../Redux/Action/indexAction";
import { useSelector, useDispatch } from "react-redux";
import SpnnerComponent from "../SpnnerComponent/SpnnerComponent";
import { IoIosClose } from "@react-icons/all-files/io/IoIosClose";
import BannerComponent from "../BannerComponent/BannerComponent";
import { removeUserOneMovieHistory } from "../../Redux/Action/indexAction";

function HistoryPageComponent() {
    const dispatch = useDispatch();
    const userHistoryObject = useSelector((state) => state.index.userHistory);
    const loadingHistory = useSelector((state) => state.index.loadingHistory);

    useEffect(() => {
        dispatch(historyFunction());
    }, []);

    return (
        <history.div>
            <BannerComponent
                backgroundImage={"/images/history-bd.jpg"}
                heading={"HISTORY"}
                textContent={` Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                            dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it`}
            />
            {/* <history.h1>History</history.h1> */}
            {/* <DateHadingComponent innerText={"Today"} /> */}

            <history.moviesShowDiv>
                {userHistoryObject !== null && userHistoryObject.length > 0 && userHistoryObject[0] !== null ? (
                    userHistoryObject.map(({ ...otherProps }) => (
                        <MoviesCardsComponent
                            style_change={"style-two"}
                            key={otherProps._id}
                            {...otherProps}
                            data={otherProps}
                            closeIcon={
                                <IoIosClose
                                    className="close_icons"
                                    onClick={() => dispatch(removeUserOneMovieHistory({ movieSelectedId: otherProps._id }))}
                                />
                            }
                        />
                    ))
                ) : userHistoryObject !== null && userHistoryObject.success === true && userHistoryObject.message ? (
                    <>
                        <p>{userHistoryObject.message}</p>
                    </>
                ) : null}
                {loadingHistory ? (
                    <history.spnenrDiv>
                        <SpnnerComponent />
                    </history.spnenrDiv>
                ) : null}
            </history.moviesShowDiv>
        </history.div>
    );
}

export default HistoryPageComponent;
