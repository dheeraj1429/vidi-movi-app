import React from "react";
import * as Navbar from "./NavbarComponent.style";
import { useSelector, useDispatch } from "react-redux";
import { BsList } from "react-icons/bs";
import IconsComponent from "../IconsComponent/IconsComponent";
import CustomButtonComponent from "../CustomButtonComponent/CustomButtonComponent";
import { AiOutlineUser } from "@react-icons/all-files/ai/AiOutlineUser";
import OptionsDropDownComponent from "../OptionsDropDownComponent/OptionsDropDownComponent";
import { showOptionPopup } from "../../Redux/Action/indexAction";

function NavbarComponent() {
    const user = useSelector((state) => state.auth.user);
    const showOptionsPopUp = useSelector((state) => state.index.showOptionsPopUp);
    const dispatch = useDispatch();

    const showPopUpHandler = function () {
        dispatch(showOptionPopup(!showOptionsPopUp));
    };

    return (
        <Navbar.div>
            <Navbar.imageDiv>
                <BsList />
            </Navbar.imageDiv>
            <Navbar.IconDiv>
                <IconsComponent iconsCl={"fas fa-search"} />
                <IconsComponent>
                    {user !== null && user !== undefined && Object.keys(user.data).length > 0 && user.data ? (
                        <div className="user-login-div">
                            <div id="profile_div">
                                <Navbar.profileDiv
                                    onClick={showPopUpHandler}
                                    style={
                                        user.data.imageUrl
                                            ? {
                                                  backgroundImage: `url(${user.data.imageUrl})`,
                                              }
                                            : null
                                    }
                                >
                                    {user.data.imageUrl ? null : <AiOutlineUser />}
                                </Navbar.profileDiv>
                                <OptionsDropDownComponent isShow={showOptionsPopUp} {...user.data} icon={<AiOutlineUser />} />
                            </div>
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
