// https://demo.gloriathemes.com/noxe/demo/movie-studio-v1/

import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useCookies } from "react-cookie";
import { setUserCookieData } from "./Redux/Action/authAction";
import { useDispatch } from "react-redux";
import useLoad from "./Hooks/useLoad";

// components
import SignInComponent from "./Components/SignInComponent/SignInComponent";
import LogInComponent from "./Components/LogInComponent/LogInComponent";
import ForgetPasswordComponent from "./Components/ForgetPasswordComponent/ForgetPasswordComponent";
import UserPasswordChangeRequiestComponent from "./Components/UserPasswordChangeRequiestComponent/UserPasswordChangeRequiestComponent";
import HomeContainerComponent from "./Components/HomeContainerComponent/HomeContainerComponent";
import MoviesUploadComponent from "./DashboardComponents/MoviesUploadComponent/MoviesUploadComponent";

// pages
import HomePage from "./pages/HomePage/HomePage";
import SignInAndLogInPage from "./pages/SignInAndLogInPage/SignInAndLogInPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";

function App() {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const dispatch = useDispatch();
    const loadFunction = useLoad();

    useEffect(() => {
        if (Object.keys(cookies).length > 0) {
            dispatch(setUserCookieData(cookies.user));
        }

        loadFunction("client:auth2");
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />}>
                    <Route path="/" element={<HomeContainerComponent />} />
                </Route>
                <Route path="/auth" element={<SignInAndLogInPage />}>
                    <Route path="user-signIn" element={<SignInComponent />} />
                    <Route path="user-logIn" element={<LogInComponent />} />
                    <Route path="forget-password" element={<ForgetPasswordComponent />} />
                    <Route path="password-reset-request/:id" element={<UserPasswordChangeRequiestComponent />} />
                </Route>
                <Route path="/admin/dashboard" element={<DashboardPage />}>
                    <Route path="movies-upload" element={<MoviesUploadComponent />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
