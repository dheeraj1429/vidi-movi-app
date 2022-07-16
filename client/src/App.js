import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useCookies } from "react-cookie";
import { setUserCookieData } from "./Redux/Action/authAction";
import { useDispatch } from "react-redux";
import useLoad from "./Hooks/useLoad";
import { getAllMovies } from "./Redux/Action/indexAction";
// import { useNavigate } from "react-router";

// components
import SignInComponent from "./Components/SignInComponent/SignInComponent";
import LogInComponent from "./Components/LogInComponent/LogInComponent";
import ForgetPasswordComponent from "./Components/ForgetPasswordComponent/ForgetPasswordComponent";
import UserPasswordChangeRequiestComponent from "./Components/UserPasswordChangeRequiestComponent/UserPasswordChangeRequiestComponent";
import HomeContainerComponent from "./Components/HomeContainerComponent/HomeContainerComponent";
import MoviesUploadComponent from "./DashboardComponents/MoviesUploadComponent/MoviesUploadComponent";
import DashboardMoviesComponent from "./DashboardComponents/DashboardMoviesComponent/DashboardMoviesComponent";
import LikeMoviesComponent from "./Components/LikeMoviesComponent/LikeMoviesComponent";
import HistoryPageComponent from "./Components/HistoryPageComponent/HistoryPageComponent";
import UserComponent from "./DashboardComponents/UserComponent/UserComponent";
import DashboardLandingComponent from "./DashboardComponents/DashboardLandingComponent/DashboardLandingComponent";
import MoviesPlayListComponent from "./Components/MoviesPlayListComponent/MoviesPlayListComponent";
import SearchMoviesComponent from "./Components/SearchMoviesComponent/SearchMoviesComponent";
import TrandingMoviesComponent from "./Components/TrandingMoviesComponent/TrandingMoviesComponent";

// pages
import HomePage from "./pages/HomePage/HomePage";
import SignInAndLogInPage from "./pages/SignInAndLogInPage/SignInAndLogInPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import MoviePlaySinglePage from "./pages/MoviePlaySinglePage/MoviePlaySinglePage";

function App() {
    const [cookies] = useCookies(["user"]);
    const dispatch = useDispatch();
    const loadFunction = useLoad();
    // const navigation = useNavigate();

    useEffect(() => {
        dispatch(getAllMovies());

        if (Object.keys(cookies).length) {
            dispatch(setUserCookieData(cookies.user));
        }

        // if (!!cookies.user && !!cookies.user.data) {
        //     return;
        // } else {
        //     navigation("/auth/user-signIn");
        // }

        loadFunction("client:auth2");
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />}>
                    <Route path="/" element={<HomeContainerComponent />} />
                    <Route path="/like" element={<LikeMoviesComponent />} />
                    <Route path="/movie/play/:name/:id" element={<MoviePlaySinglePage />} />
                    <Route path="/history" element={<HistoryPageComponent />} />
                    <Route path="/playlist" element={<MoviesPlayListComponent />} />
                    <Route path="/movies-search/:name" element={<SearchMoviesComponent />} />
                    <Route path="/tranding" element={<TrandingMoviesComponent />} />
                </Route>
                <Route path="/auth" element={<SignInAndLogInPage />}>
                    <Route path="user-signIn" element={<SignInComponent />} />
                    <Route path="user-logIn" element={<LogInComponent />} />
                    <Route path="forget-password" element={<ForgetPasswordComponent />} />
                    <Route path="password-reset-request/:id" element={<UserPasswordChangeRequiestComponent />} />
                </Route>
                <Route path="/admin/dashboard" element={<DashboardPage />}>
                    <Route path="" element={<DashboardLandingComponent />} />
                    <Route path="movies-upload" element={<MoviesUploadComponent />} />
                    <Route path="movies" element={<DashboardMoviesComponent />} />
                    <Route path="users" element={<UserComponent />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
