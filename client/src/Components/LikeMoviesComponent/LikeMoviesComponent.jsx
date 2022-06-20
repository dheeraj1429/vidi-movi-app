import React, { useEffect } from "react";
import * as like from "./LikeMoviesComponent.style";
import BannerComponent from "../BannerComponent/BannerComponent";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import HeadingComponent from "../HeadingComponent/HeadingComponent";
import { useSelector, useDispatch } from "react-redux";
import MoviesCardsComponent from "../MoviesCardsComponent/MoviesCardsComponent";
import SpnnerComponent from "../SpnnerComponent/SpnnerComponent";
import { getAllLikeMovies } from "../../Redux/Action/indexAction";

function LikeMoviesComponent() {
    const userLikedVideos = useSelector((state) => state.index.userLikedVideos);
    const loadingHistory = useSelector((state) => state.index.loadingHistory);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllLikeMovies());
    }, []);

    return (
        <like.div>
            <like.innerDiv>
                <NavbarComponent />

                <like.spaceDiv>
                    <like.innerDiv>
                        {userLikedVideos && userLikedVideos.length
                            ? userLikedVideos.map((el) => (
                                  <MoviesCardsComponent componentStyle={"style_tow"} key={el._id} data={el.moviesId} optionsIcon={true} />
                              ))
                            : null}
                        {loadingHistory ? (
                            <like.spnenrDiv>
                                <SpnnerComponent />
                            </like.spnenrDiv>
                        ) : null}
                    </like.innerDiv>
                </like.spaceDiv>
            </like.innerDiv>
        </like.div>
    );
}

export default LikeMoviesComponent;
