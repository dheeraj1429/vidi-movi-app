import React, { useState, useEffect } from "react";
import * as SignIn from "./SignInComponent.style";
import InputComponent from "../InputComponent/InputComponent";
import CustomButtonComponent from "../CustomButtonComponent/CustomButtonComponent";
import { useSelector, useDispatch } from "react-redux";
import { userSignIn, loadingSpen } from "../../Redux/Action/authAction";
import { VarifyEmail } from "../../Utils/VarifyFunction";
import { Link, useNavigate } from "react-router-dom";
// import GoogleLogin from "react-google-login";

function SignInComponent() {
    const [SignInData, setSigninData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [EmailVarify, setEmailVarify] = useState(null);
    const loading = useSelector((state) => state.auth.loading);
    const userData = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (userData !== null && userData.data && userData.status !== 500 && userData.success === true) {
            navigate("/");
        }
    }, [userData]);

    const ChangeHandler = function (e) {
        const name = e.target.name;
        const value = e.target.value;
        setSigninData({ ...SignInData, [name]: value });
    };

    const SendData = function () {
        const { name, email, password, confirmPassword } = SignInData;

        const varifyData = VarifyEmail(email);

        if (email) {
            if (!varifyData) setEmailVarify(false);
        }

        if (name && email && password && confirmPassword && password === confirmPassword && varifyData !== false) {
            setEmailVarify(true);
            dispatch(userSignIn({ name, email, password, confirmPassword }));
            dispatch(loadingSpen(true));
        }
    };

    // const onSuccess = function (response) {
    //     console.log(response);
    // };

    // const onFailure = function (response) {
    //     console.log(response);
    // };

    return (
        <SignIn.div>
            <SignIn.loginDiv>
                <h1 class="login__title">Sign In</h1>
                <SignIn.loginGroup>
                    <div>
                        <InputComponent lable={"name"} placeHolder={"Enter your name"} name={"name"} event={ChangeHandler} value={SignInData.name} />
                        <InputComponent
                            lable={"email"}
                            placeHolder={"Enter your email"}
                            name={"email"}
                            event={ChangeHandler}
                            value={SignInData.email}
                        />
                        <InputComponent
                            lable={"password"}
                            placeHolder={"Enter your password"}
                            name={"password"}
                            event={ChangeHandler}
                            value={SignInData.password}
                            type={"password"}
                        />
                        <InputComponent
                            lable={"confirm password"}
                            placeHolder={"Enter the confirm password"}
                            name={"confirmPassword"}
                            event={ChangeHandler}
                            value={SignInData.confirmPassword}
                            type={"password"}
                        />
                    </div>
                </SignIn.loginGroup>
                {EmailVarify !== null ? !EmailVarify ? <p>please enter valid email adress</p> : null : null}
                {userData !== null && userData.status ? <p className="error-message">{userData.data.messages}</p> : null}
                <CustomButtonComponent buttonCl={"login__sign-in"} innteText={"Sign In"} isLoading={loading} type={"submit"} onClick={SendData} />

                {/* <GoogleLogin
                    clientId="293495706232-v2e80a9osn58vl4oh6h2qr6j6v22gki1.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={"single_host_origin"}
                    isSignedIn={true}
                /> */}

                <SignIn.options>
                    <p>Already have account login</p>
                    <div>
                        <Link to={"/auth/forget-password"}>
                            <span>Forget Password</span>
                        </Link>
                    </div>
                    <Link to={"/auth/user-logIn"}>
                        <span>login</span>
                    </Link>
                </SignIn.options>
            </SignIn.loginDiv>
        </SignIn.div>
    );
}

export default SignInComponent;
