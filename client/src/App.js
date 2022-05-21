import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useCookies } from "react-cookie";
import { setUserCookieData } from "./Redux/Action/authAction";
import { useDispatch } from "react-redux";
import { gapi } from "gapi-script";
import { clientId } from "./Utils/VarifyFunction";

// components
import SignInComponent from "./Components/SignInComponent/SignInComponent";
import LogInComponent from "./Components/LogInComponent/LogInComponent";
import ForgetPasswordComponent from "./Components/ForgetPasswordComponent/ForgetPasswordComponent";
import UserPasswordChangeRequiestComponent from "./Components/UserPasswordChangeRequiestComponent/UserPasswordChangeRequiestComponent";

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

        gapi.load("client:auth2", function () {
            gapi.client.init({
                clientId: clientId,
                scope: "",
            });
        });
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<SignInAndLogInPage />}>
                    <Route path="user-signIn" element={<SignInComponent />} />
                    <Route path="user-logIn" element={<LogInComponent />} />
                    <Route path="forget-password" element={<ForgetPasswordComponent />} />
                    <Route path="password-reset-request/:id" element={<UserPasswordChangeRequiestComponent />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
