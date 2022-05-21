import React, { useState, useEffect } from "react";
import * as signIn from "../SignInComponent/SignInComponent.style";
import InputComponent from "../InputComponent/InputComponent";
import CustomButtonComponent from "../CustomButtonComponent/CustomButtonComponent";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logInUser, loadingSpen } from "../../Redux/Action/authAction";
import { VarifyEmail } from "../../Utils/VarifyFunction";
import { useNavigate } from "react-router";

function LogInComponent() {
    const [User, setUser] = useState({
        email: "",
        password: "",
    });
    const [EmailVarify, setEmailVarify] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector((state) => state.auth.loading);
    const userData = useSelector((state) => state.auth.user);

    const ChangeHandler = function (e) {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...User, [name]: value });
    };

    const SendData = function () {
        const { email, password } = User;

        const varifyData = VarifyEmail(email);

        if (!varifyData) {
            setEmailVarify(false);
        }

        if (email && password && varifyData) {
            setEmailVarify(true);
            dispatch(logInUser({ email, password }));
            dispatch(loadingSpen(true));
        }
    };

    useEffect(() => {
        if (userData !== null && userData !== undefined && userData.data && userData.status !== 500 && userData.success === true) {
            navigate("/");
        }
    }, [userData]);

    return (
        <signIn.div>
            <signIn.loginDiv>
                <h1 class="login__title">Log In</h1>
                <signIn.loginGroup>
                    <InputComponent lable={"email"} placeHolder={"Enter your email"} name={"email"} value={User.email} event={ChangeHandler} />
                    <InputComponent
                        lable={"password"}
                        placeHolder={"Enter your password"}
                        name={"password"}
                        value={User.password}
                        event={ChangeHandler}
                        type={"password"}
                    />
                    {EmailVarify !== null ? !EmailVarify ? <p>please enter valid email adress</p> : null : null}
                    {userData !== null && userData !== undefined && userData.success === false ? <p>{userData.messages}</p> : null}
                    <CustomButtonComponent buttonCl={"login__sign-in"} innteText={"Sign In"} isLoading={loading} onClick={SendData} />
                </signIn.loginGroup>

                <signIn.options>
                    <p>Don't have a account</p>
                    <Link to={"/auth/user-signIn"}>
                        <span>login</span>
                    </Link>
                </signIn.options>
            </signIn.loginDiv>
        </signIn.div>
    );
}

export default LogInComponent;
