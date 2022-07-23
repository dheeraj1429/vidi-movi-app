import React from "react";
import * as Home from "./HomeContainerComponent.style";
import BannerComponent from "../BannerComponent/BannerComponent";
import HeadingComponent from "../HeadingComponent/HeadingComponent";
import NavbarComponent from "../NavbarComponent/NavbarComponent";
import ContinueWatchingComponent from "../ContinueWatchingComponent/ContinueWatchingComponent";
import MoviesSliderComponent from "../MoviesSliderComponent/MoviesSliderComponent";
// import { useDispatch, useSelector } from "react-redux";
// import { getMovieInScroll } from "../../Redux/Action/indexAction";

function HomeContainerComponent() {
    // const dispatch = useDispatch();
    // const all_movies = useSelector((state) => state.index.all_movies);

    // const ScrollEventHandler = function (event) {
    //     const scroll = window.scrollY;
    //     const scrollHight = window.innerHeight;
    //     const pageHeight = document.body.scrollHeight;

    //     if (scroll + scrollHight >= pageHeight) {
    //         dispatch(getMovieInScroll(all_movies.allMoviesDataCollection.length));
    //     }
    // };

    // useEffect(() => {
    //     if (all_movies && all_movies.allMoviesDataCollection) {
    //         window.addEventListener("scroll", ScrollEventHandler, true);
    //     }

    //     return () => {
    //         window.removeEventListener("scroll", ScrollEventHandler, true);
    //     };
    // }, [all_movies]);

    return (
        <Home.div>
            <NavbarComponent />
            <BannerComponent
                date={"2019"}
                backgroundImage={"/images/3034049.jpg"}
                heading={"GREEN BOOK"}
                subHeading={"ADVENCE, FANTASY, MISTERY"}
                textContent={` Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                            dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it`}
            />

            {/* {user ? (
                <Home.spaceDiv>
                    <ContinueWatchingComponent />
                </Home.spaceDiv>
            ) : null} */}

            {/* <Home.spaceDiv> */}
            <HeadingComponent heading={"Movies"} />
            <Home.moviesShowDiv>
                <MoviesSliderComponent />
            </Home.moviesShowDiv>
            {/* </Home.spaceDiv> */}

            {/* <Home.spaceDiv> */}
            <HeadingComponent heading={"Songs"} />
            <Home.moviesShowDiv>
                <MoviesSliderComponent filterBy={"Song"} />
            </Home.moviesShowDiv>
            {/* </Home.spaceDiv> */}
        </Home.div>
    );
}

export default HomeContainerComponent;
