import React, { useEffect } from "react";
import * as options from "./OptionsDropDownComponent.style";
import { BiLogOut } from "@react-icons/all-files/bi/BiLogOut";
import SideBarOptionComponent from "../SideBarOptionComponent/SideBarOptionComponent";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { setUserCookieData } from "../../Redux/Action/authAction";
import { FiSettings } from "@react-icons/all-files/fi/FiSettings";
import { BiMessageDots } from "@react-icons/all-files/bi/BiMessageDots";
import { AiOutlineUsergroupAdd } from "@react-icons/all-files/ai/AiOutlineUsergroupAdd";
import { BiMoon } from "@react-icons/all-files/bi/BiMoon";
import { removeClientHistory, removerLikeVideoFromClient } from "../../Redux/Action/appAction";
import { useNavigate } from "react-router";

function OptionsDropDownComponent({ isShow, imageUrl, uploadCustomProfileImage, name, email, optionsShows }) {
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const dispatch = useDispatch();
    const themeSelector = useSelector((state) => state.index.changeTheme);
    const navigation = useNavigate();

    const removeUser = function () {
        dispatch(setUserCookieData(null));
        removeCookie("user");
        dispatch(removeClientHistory(null));
        dispatch(removerLikeVideoFromClient(null));
        navigation("/auth/user-signIn");
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", themeSelector);
    }, [themeSelector]);

    return (
        <options.div id="options_popup" style={!isShow ? { display: "none" } : { display: "block" }}>
            <options.picDiv>
                {imageUrl && !!imageUrl ? (
                    <img class="pic" src={!!uploadCustomProfileImage ? `/compressUserProfileImages/${imageUrl}` : imageUrl} alt="Profile Picture" />
                ) : null}
            </options.picDiv>
            <div class="name">
                <span>{name}</span>
            </div>
            <div class="title">
                <span>{email}</span>
            </div>
            <options.innerDiv>
                {optionsShows ? (
                    <>
                        <SideBarOptionComponent icon={<FiSettings />} innerText={"Setting"} width={"30"} />
                        {/* <SideBarOptionComponent icon={<BiMessageDots />} innerText={"Send feedback"} width={"30"} />
                        <SideBarOptionComponent icon={<AiOutlineUsergroupAdd />} innerText={"Share Account"} width={"30"} /> */}
                        <SideBarOptionComponent icon={<BiMoon />} innerText={"Change Theme"} width={"30"} innerOptions={true} />
                        <SideBarOptionComponent icon={<BiLogOut />} innerText={"Log Out"} onClick={removeUser} width={"30"} />
                    </>
                ) : (
                    <SideBarOptionComponent icon={<BiLogOut />} innerText={"Log Out"} onClick={removeUser} width={"30"} />
                )}
            </options.innerDiv>
        </options.div>
    );
}

export default OptionsDropDownComponent;
