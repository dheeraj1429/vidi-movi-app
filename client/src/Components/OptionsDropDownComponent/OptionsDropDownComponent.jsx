import React from "react";
import * as options from "./OptionsDropDownComponent.style";
import { BiLogOut } from "@react-icons/all-files/bi/BiLogOut";
import SideBarOptionComponent from "../SideBarOptionComponent/SideBarOptionComponent";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { setUserCookieData } from "../../Redux/Action/authAction";
import { AiOutlineAccountBook } from "@react-icons/all-files/ai/AiOutlineAccountBook";
import { BiMessageDots } from "@react-icons/all-files/bi/BiMessageDots";
import { AiOutlineUsergroupAdd } from "@react-icons/all-files/ai/AiOutlineUsergroupAdd";
import { BiMoon } from "@react-icons/all-files/bi/BiMoon";
import { changeTheme } from "../../Redux/Action/indexAction";

function OptionsDropDownComponent({ isShow, imageUrl, name, email }) {
    const user = useSelector((state) => state.auth.user);
    const theme = useSelector((state) => state.index.changeTheme);
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const dispatch = useDispatch();

    const removeUser = function () {
        dispatch(setUserCookieData(null));
        removeCookie("user");
    };

    const ChangeThemeHandler = function () {};

    return (
        <options.div id="options_popup" style={!isShow ? { display: "none" } : { display: "block" }}>
            <options.picDiv
                style={
                    imageUrl && imageUrl !== null && imageUrl !== undefined
                        ? null
                        : {
                              backgroundImage:
                                  "url(https://images.pexels.com/photos/7772538/pexels-photo-7772538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
                          }
                }
            >
                {imageUrl && imageUrl !== null && imageUrl !== undefined ? <img class="pic" src={imageUrl} alt="Profile Picture" /> : null}
            </options.picDiv>
            <div class="name">
                <span>{name}</span>
            </div>
            <div class="title">
                <span>{email}</span>
            </div>
            <options.innerDiv>
                <SideBarOptionComponent icon={<AiOutlineAccountBook />} innerText={"Your Account"} width={"30"} />
                <SideBarOptionComponent icon={<BiMessageDots />} innerText={"Send feedback"} width={"30"} />
                <SideBarOptionComponent icon={<AiOutlineUsergroupAdd />} innerText={"Share Account"} width={"30"} />
                <SideBarOptionComponent icon={<BiMoon />} innerText={"Change Theme"} width={"30"} onClick={ChangeThemeHandler} />
                <SideBarOptionComponent icon={<BiLogOut />} innerText={"Log Out"} onClick={removeUser} width={"30"} />
            </options.innerDiv>
        </options.div>
    );
}

export default OptionsDropDownComponent;
