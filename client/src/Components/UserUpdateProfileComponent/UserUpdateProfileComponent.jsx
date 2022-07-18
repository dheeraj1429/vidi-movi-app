import React, { useState, useEffect } from "react";
import * as profile from "./UserUpdateProfileComponent.style";
import CartHeadingComponent from "../CartHeadingComponent/CartHeadingComponent";
import UserProfileInputComponent from "../UserProfileInputComponent/UserProfileInputComponent";
import CustomButtonComponent from "../CustomButtonComponent/CustomButtonComponent";
import UserSettingProfileComponent from "../UserSettingProfileComponent/UserSettingProfileComponent";
import { useSelector, useDispatch } from "react-redux";
import { uploadUserProfile } from "../../Redux/Action/indexAction";
import { useCookies } from "react-cookie";
import { message } from "antd";

function UserUpdateProfileComponent() {
    const user = useSelector((state) => state.auth.user);
    const userProfileUpdate = useSelector((state) => state.auth.userProfileUpdate);
    const key = "updatable";
    const [UserData, setUserData] = useState({
        name: "",
        email: "",
        bio: "",
    });
    const [cookie] = useCookies(["user"]);
    const [UserProfile, setUserProfile] = useState("");
    const dispatch = useDispatch();

    const ChangeHandler = function (e) {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({ ...UserData, [name]: value });
    };

    useEffect(() => {
        if (user) {
            setUserData({
                name: user?.data?.name ? user?.data?.name : "",
                email: user?.data?.email ? user?.data?.email : "",
                bio: user?.data?.bio ? user?.data?.bio : "",
            });
        }
    }, [user]);

    const GetUserImageHandler = function (data) {
        setUserProfile(data);
    };

    const openMessage = () => {
        message.loading({
            content: "Loading...",
            key,
        });
    };

    useEffect(() => {
        if (userProfileUpdate && !!userProfileUpdate && userProfileUpdate.message) {
            message.success({
                content: userProfileUpdate.message,
                key,
                duration: 2,
            });
        }
    }, [userProfileUpdate]);

    const uploadFile = function () {
        if (cookie?.user && cookie?.user?.data) {
            const token = cookie.user.data.token;
            openMessage();

            const formData = new FormData();
            formData.append("name", UserData.name);
            formData.append("email", UserData.email);
            formData.append("bio", UserData.bio);
            formData.append("file", UserProfile);
            formData.append("token", token);

            dispatch(uploadUserProfile(formData));
        } else {
            console.log("plase login in first");
        }
    };

    return (
        <profile.div>
            {!!user && user.data ? (
                <>
                    <CartHeadingComponent text={"Profile"} />
                    <profile.container>
                        <UserSettingProfileComponent edit={true} fn={GetUserImageHandler} />
                        <UserProfileInputComponent
                            heading={"Name"}
                            subHeading={`We're big on real names around here. So people know who's who.`}
                            placeHolder={UserData.name}
                            onChange={ChangeHandler}
                            name={"name"}
                        />
                        <UserProfileInputComponent name={"email"} heading={"Email"} placeHolder={UserData.email} onChange={ChangeHandler} />
                        <UserProfileInputComponent
                            heading={"Bio"}
                            subHeading={`Maximun 200 charechters`}
                            placeHolder={"Add a short bio"}
                            textAria={true}
                            value={UserData.bio}
                            onChange={ChangeHandler}
                            name={"bio"}
                        />

                        <profile.uploadButtonDiv>
                            <CustomButtonComponent innteText={"Update Profile"} buttonCl={"Profile_upload_button"} onClick={uploadFile} />
                        </profile.uploadButtonDiv>
                    </profile.container>
                </>
            ) : null}
        </profile.div>
    );
}

export default UserUpdateProfileComponent;
