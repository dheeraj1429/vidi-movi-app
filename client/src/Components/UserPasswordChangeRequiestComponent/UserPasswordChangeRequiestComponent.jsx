import React, { useState } from "react";
import * as forgetRequiest from "./UserPasswordChangeRequiestComponent.style";
import * as singIn from "../SignInComponent/SignInComponent.style";
import CustomButtonComponent from "../CustomButtonComponent/CustomButtonComponent";
import { useSelector, useDispatch } from "react-redux";
import { userForgetPasswordRequiest, loadingSpen } from "../../Redux/Action/authAction";
import InputComponent from "../InputComponent/InputComponent";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function UserPasswordChangeRequiestComponent() {
    const [UserPassword, setPassword] = useState({
        password: "",
        newPassword: "",
    });
    const [ErrorPassword, setErrorPassword] = useState(null);
    const loading = useSelector((state) => state.auth.loading);
    const forgetPassword = useSelector((state) => state.auth.forgetPassword);

    const dispatch = useDispatch();
    const parms = useParams();

    const ChangeHandler = function (e) {
        const name = e.target.name;
        const value = e.target.value;

        setPassword({ ...UserPassword, [name]: value });
    };

    const SendData = function () {
        const { password, newPassword } = UserPassword;

        if (password !== newPassword) {
            setErrorPassword("password and confirm password is not match");
        }

        if (password && newPassword && password === newPassword) {
            dispatch(userForgetPasswordRequiest({ password: password, id: parms.id }));
            dispatch(loadingSpen(true));
        }
    };

    return (
        <singIn.div>
            <singIn.loginDiv>
                <h1 class="login__title">Reset Password</h1>
                <InputComponent
                    type={"password"}
                    lable={"New Password"}
                    placeHolder={"Enter New password"}
                    name={"password"}
                    value={UserPassword.password}
                    event={ChangeHandler}
                />
                <InputComponent
                    type={"password"}
                    lable={"Confirm New Password"}
                    placeHolder={"Enter confirm new password"}
                    name={"newPassword"}
                    value={UserPassword.newPassword}
                    event={ChangeHandler}
                />
                {forgetPassword !== null && forgetPassword.success === true ? (
                    <forgetRequiest.div>
                        <forgetRequiest.p>{forgetPassword.messages}</forgetRequiest.p>
                    </forgetRequiest.div>
                ) : ErrorPassword !== null ? (
                    <forgetRequiest.div>
                        <forgetRequiest.p className="error_para">{ErrorPassword}</forgetRequiest.p>
                    </forgetRequiest.div>
                ) : null}
                {forgetPassword !== null && forgetPassword.success === true ? (
                    <forgetRequiest.div>
                        <Link to={"/auth/user-logIn"}>
                            <p>login</p>
                        </Link>
                    </forgetRequiest.div>
                ) : (
                    <CustomButtonComponent buttonCl={"login__sign-in"} innteText={"Reset Password"} isLoading={loading} onClick={SendData} />
                )}
            </singIn.loginDiv>
        </singIn.div>
    );
}

export default UserPasswordChangeRequiestComponent;
