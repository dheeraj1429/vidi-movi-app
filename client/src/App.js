import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useCookies } from "react-cookie";
import { setUserCookieData } from "./Redux/Action/authAction";
import { useDispatch } from "react-redux";
import useLoad from "./Hooks/useLoad";
import { getAllMovies, getAllLikeMovies, userHistory } from "./Redux/Action/indexAction";

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

// pages
import HomePage from "./pages/HomePage/HomePage";
import SignInAndLogInPage from "./pages/SignInAndLogInPage/SignInAndLogInPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import MoviePlaySinglePage from "./pages/MoviePlaySinglePage/MoviePlaySinglePage";

function App() {
    const [cookies] = useCookies(["user"]);
    const dispatch = useDispatch();
    const loadFunction = useLoad();

    useEffect(() => {
        if (Object.keys(cookies).length > 0) {
            dispatch(setUserCookieData(cookies.user));
        }
        dispatch(getAllMovies());
        dispatch(getAllLikeMovies());
        dispatch(userHistory());
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
