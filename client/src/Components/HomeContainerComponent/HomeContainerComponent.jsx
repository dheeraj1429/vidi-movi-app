import React from "react";
import * as Home from "./HomeContainerComponent.style";
import BannerComponent from "../BannerComponent/BannerComponent";
import MoviesCardsComponent from "../MoviesCardsComponent/MoviesCardsComponent";
import { useSelector } from "react-redux";

function HomeContainerComponent() {
    const all_movies = useSelector((state) => state.index.all_movies);

    return (
        <Home.div>
            <BannerComponent />
            <Home.Popular>
                <h1>Trending Now</h1>
            </Home.Popular>
            <Home.moviesShowDiv>
                {all_movies !== null && all_movies.success === true && all_movies.allMoviesDataCollection.length > 0
                    ? all_movies.allMoviesDataCollection.map(({ _id, ...otherProps }) => (
                          <MoviesCardsComponent
                              key={_id}
                              {...otherProps}
                              //   data={{
                              //       imagePath: `/thumbnail/${el.thumbnailName}`,
                              //       moviName: `${el.name}`,
                              //       moviAction: `${el.genra}`,
                              //   }}
                          />
                      ))
                    : null}
            </Home.moviesShowDiv>
        </Home.div>
    );
}

export default HomeContainerComponent;
