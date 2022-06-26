import React, { useEffect } from "react";
import * as history from "./HistoryPageComponent.style";
import DateHadingComponent from "../DateHadingComponent/DateHadingComponent";
import MoviesCardsComponent from "../MoviesCardsComponent/MoviesCardsComponent";
import { useSelector, useDispatch } from "react-redux";
import SpnnerComponent from "../SpnnerComponent/SpnnerComponent";
import { IoIosClose } from "@react-icons/all-files/io/IoIosClose";
import BannerComponent from "../BannerComponent/BannerComponent";
import { removeUserOneMovieHistory, userHistory } from "../../Redux/Action/indexAction";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import HeadingComponent from "../HeadingComponent/HeadingComponent";
import MoviesSidebarFilterComponent from "../MoviesSidebarFilterComponent/MoviesSidebarFilterComponent";

function HistoryPageComponent() {
    const dispatch = useDispatch();
    const userHistoryObject = useSelector((state) => state.index.userHistory);
    const loadingHistory = useSelector((state) => state.index.loadingHistory);

    useEffect(() => {
        dispatch(userHistory());
    }, []);

    return (
        <history.div>
            <history.flexDiv>
                <MoviesSidebarFilterComponent />
                <history.relativeDiv>
                    <NavbarComponent />

                    {/* <history.h1>History</history.h1> */}
                    {/* <DateHadingComponent innerText={"Today"} /> */}
                    <history.filterDiv>
                        <history.spaceDiv>
                            {/* <HeadingComponent heading={"Today"} /> */}
                            <history.innerDiv>
                                {userHistoryObject && userHistoryObject.length
                                    ? userHistoryObject.map((el) => (
                                          <MoviesCardsComponent
                                              key={el._id}
                                              data={el.moviesId}
                                              componentStyle={"style_tow"}
                                              checkBox={true}
                                              closeIcon={
                                                  <IoIosClose
                                                      className="close_icons"
                                                      onClick={() => dispatch(removeUserOneMovieHistory({ movieSelectedId: el.moviesId._id }))}
                                                  />
                                              }
                                          />
                                      ))
                                    : null}
                                {loadingHistory ? (
                                    <history.spnenrDiv>
                                        <SpnnerComponent />
                                    </history.spnenrDiv>
                                ) : null}
                            </history.innerDiv>
                        </history.spaceDiv>
                    </history.filterDiv>
                </history.relativeDiv>
            </history.flexDiv>
        </history.div>
    );
}

export default HistoryPageComponent;
