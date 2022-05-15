import React from "react";
import * as Auth from "./SignInAndLogInPage.style";
import SignInComponent from "../../Components/SignInComponent/SignInComponent";

function SignInAndLogInPage() {
    return (
        <Auth.div>
            <SignInComponent />
        </Auth.div>
    );
}

export default SignInAndLogInPage;
