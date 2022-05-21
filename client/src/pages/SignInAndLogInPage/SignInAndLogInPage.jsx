import React from "react";
import * as Auth from "./SignInAndLogInPage.style";
import { Outlet } from "react-router";

function SignInAndLogInPage() {
    return (
        <Auth.div>
            <Outlet />
        </Auth.div>
    );
}

export default SignInAndLogInPage;
