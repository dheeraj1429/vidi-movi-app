import React from "react";
import * as Navbar from "./NavbarComponent.style";
import { useSelector } from "react-redux";
import { setUserCookieData } from "../../Redux/Action/authAction";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { BsList } from "react-icons/bs";

import NavbarListItemComponent from "../NavbarListItemComponent/NavbarListItemComponent";
import IconsComponent from "../IconsComponent/IconsComponent";
import CustomButtonComponent from "../CustomButtonComponent/CustomButtonComponent";

function NavbarComponent() {
    const user = useSelector((state) => state.auth.user);
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const dispatch = useDispatch();

    const removeUser = function () {
        dispatch(setUserCookieData(null));
        removeCookie("user");
    };

    return (
        <Navbar.div>
            <Navbar.imageDiv>
                <BsList />
            </Navbar.imageDiv>
            <Navbar.innerDiv className="navbar-search-div">
                {/* <Navbar.list>
                    <NavbarListItemComponent innerContant={"Home"} />
                    <NavbarListItemComponent innerContant={"Movies"} />
                    <NavbarListItemComponent innerContant={"Tv Shows"} />
                    <NavbarListItemComponent innerContant={"Audio Book"} />
                    <NavbarListItemComponent innerContant={"Blog"} />
                </Navbar.list> */}
            </Navbar.innerDiv>
            <Navbar.IconDiv>
                <IconsComponent iconsCl={"fas fa-search"} />
                <IconsComponent>
                    {user !== null && user !== undefined && Object.keys(user.data).length > 0 && user.data ? (
                        <div className="user-login-div">
                            <p>wallcome! {user.data.name}</p>
                            <IconsComponent iconsCl={"fas fa-sign-out"} event={removeUser} />
                        </div>
                    ) : (
                        <CustomButtonComponent innteText={"Sign In"} pathUrl={"/auth/user-signIn"} />
                    )}
                </IconsComponent>
            </Navbar.IconDiv>
        </Navbar.div>
    );
}

export default NavbarComponent;
