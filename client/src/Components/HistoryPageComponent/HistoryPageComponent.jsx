import React, { useEffect } from "react";
import * as history from "./HistoryPageComponent.style";
import DateHadingComponent from "../DateHadingComponent/DateHadingComponent";
import MoviesCardsComponent from "../MoviesCardsComponent/MoviesCardsComponent";
import { userHistory as historyFunction } from "../../Redux/Action/indexAction";
import { useSelector, useDispatch } from "react-redux";
import SpnnerComponent from "../SpnnerComponent/SpnnerComponent";

function HistoryPageComponent() {
    const dispatch = useDispatch();
    const userHistoryObject = useSelector((state) => state.index.userHistory);
    const loadingHistory = useSelector((state) => state.index.loadingHistory);

    useEffect(() => {
        dispatch(historyFunction());
    }, []);

    return (
        <history.div>
            <history.h1>History</history.h1>
            {/* <DateHadingComponent innerText={"Today"} /> */}

            <history.moviesShowDiv>
                {userHistoryObject !== null && userHistoryObject.length > 0 ? (
                    userHistoryObject.map(({ ...otherProps }) => <MoviesCardsComponent {...otherProps} data={otherProps} />)
                ) : (
                    <>
                        <p>{userHistoryObject.message}</p>
                    </>
                )}
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
