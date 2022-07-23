import React from "react";
import * as movies from "./DashboardMoviesComponent.style";
import DashBoardHeadingComponent from "../DashBoardHeadingComponent/DashBoardHeadingComponent";
import MoviesCardSecondComponent from "../../Components/MoviesCardSecondComponent/MoviesCardSecondComponent";
import { useSelector } from "react-redux";
import DashboardBannerComponent from "../DashboardBannerComponent/DashboardBannerComponent";

function DashboardMoviesComponent() {
    const allMoives = useSelector((state) => state.index.all_movies);

    return (
        <movies.div>
            <DashboardBannerComponent imgUrl={"/images/dashboard/top-header.png"} innerPara={"walcome the dahsboard."} />
            {/* <DashBoardHeadingComponent title={"All Moives"} titleNav={"Dashboard / all movies"} /> */}
            <movies.innderDiv>
                {allMoives !== null && allMoives !== undefined && allMoives.allMoviesDataCollection.length > 0
                    ? allMoives.allMoviesDataCollection.map(({ _id, ...otherProps }) => <MoviesCardSecondComponent key={_id} {...otherProps} />)
                    : null}
            </movies.innderDiv>
        </movies.div>
    );
}

export default DashboardMoviesComponent;
