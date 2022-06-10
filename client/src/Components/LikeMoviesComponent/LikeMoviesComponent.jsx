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
        if (userLikedVideos) {
            dispatch(getAllLikeMovies());
            console.log(userLikedVideos);
        }
    }, []);

    return (
        <like.div>
            <like.innerDiv>
                <NavbarComponent />
                <BannerComponent
                    backgroundImage={"/images/fal-1.jpg"}
                    heading={"LIKE MOVIES"}
                    textContent={` Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                            dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it`}
                />
                <HeadingComponent heading={"Movies"} />

                <like.moviesShowDiv>
                    {userLikedVideos && userLikedVideos.length
                        ? userLikedVideos.map((el) => <MoviesCardsComponent key={el._id} data={el.moviesId} />)
                        : null}
                    {loadingHistory ? (
                        <like.spnenrDiv>
                            <SpnnerComponent />
                        </like.spnenrDiv>
                    ) : null}
                </like.moviesShowDiv>
            </like.innerDiv>
        </like.div>
    );
}

export default LikeMoviesComponent;
