import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useCookies } from "react-cookie";
import { setUserCookieData } from "./Redux/Action/authAction";
import { useDispatch } from "react-redux";

// components

// pages
import HomePage from "./pages/HomePage/HomePage";
import SignInAndLogInPage from "./pages/SignInAndLogInPage/SignInAndLogInPage";

function App() {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(cookies).length > 0) {
            dispatch(setUserCookieData(cookies.user));
        }
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signIn" element={<SignInAndLogInPage />} />
            </Routes>
        </div>
    );
}

export default App;
