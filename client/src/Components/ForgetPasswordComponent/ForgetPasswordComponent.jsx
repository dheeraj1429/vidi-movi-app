import React, { useState } from "react";
import * as signIn from "../SignInComponent/SignInComponent.style";
import * as forget from "./ForgetPassportComponent.style";
import CustomButtonComponent from "../CustomButtonComponent/CustomButtonComponent";
import InputComponent from "../InputComponent/InputComponent";
import { useSelector, useDispatch } from "react-redux";
import { forgetPassword, loadingSpen, forgetResetError } from "../../Redux/Action/authAction";
import { VarifyEmail } from "../../Utils/VarifyFunction";

function ForgetPassportComponent() {
    const [UserEmail, setUserEmail] = useState({
        email: "",
    });
    const [EmailVarify, setEmailVarify] = useState(null);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);
    const userData = useSelector((state) => state.auth.user);

    const ChangeHandler = function (e) {
        const name = e.target.name;
        const value = e.target.value;
        setUserEmail({ ...UserEmail, [name]: value });
    };

    const SendData = function () {
        const { email } = UserEmail;

        const varifyData = VarifyEmail(email);

        if (!email) return;

        if (!varifyData) {
            setEmailVarify(false);
            dispatch(forgetResetError(null));
        }

        if (varifyData) {
            setEmailVarify(true);
            dispatch(forgetPassword({ email: UserEmail.email }));
            dispatch(loadingSpen(true));
        }
    };

    return (
        <signIn.div>
            <signIn.loginDiv>
                <h1 class="login__title">Forget Password</h1>
                <InputComponent
                    lable={"email"}
                    placeHolder={"Enter your email address"}
                    name={"email"}
                    event={ChangeHandler}
                    value={UserEmail.email}
                />

                {EmailVarify !== null ? !EmailVarify ? <p className="error-message">please enter valid email adress</p> : null : null}
                {userData !== null ? <forget.p>{userData.messages}</forget.p> : null}

                <CustomButtonComponent
                    buttonCl={"login__sign-in"}
                    innteText={"Reset Password"}
                    isLoading={loading}
                    type={"submit"}
                    onClick={SendData}
                />
            </signIn.loginDiv>
        </signIn.div>
    );
}

export default ForgetPassportComponent;
