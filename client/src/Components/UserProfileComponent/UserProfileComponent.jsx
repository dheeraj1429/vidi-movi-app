import React from "react";
import * as profile from "./UserProfileComponentstyle";
import CustomButtonComponent from "../CustomButtonComponent/CustomButtonComponent";
import { AiOutlineUser } from "@react-icons/all-files/ai/AiOutlineUser";
import { useSelector, useDispatch } from "react-redux";
import { showOptionPopup } from "../../Redux/Action/appAction";
import OptionsDropDownComponent from "../OptionsDropDownComponent/OptionsDropDownComponent";

function UserProfileComponent({ optionsShows }) {
    const user = useSelector((state) => state.auth.user);
    const showOptionsPopUp = useSelector((state) => state.index.showOptionsPopUp);
    const dispatch = useDispatch();

    const showPopUpHandler = function () {
        dispatch(showOptionPopup(!showOptionsPopUp));
    };

    return (
        <profile.div>
            {user !== null && user !== undefined && Object.keys(user.data).length > 0 && user.data ? (
                <div className="user-login-div">
                    <div id="profile_div">
                        <profile.profileDiv
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
                        </profile.profileDiv>
                        <OptionsDropDownComponent optionsShows={optionsShows} isShow={showOptionsPopUp} {...user.data} icon={<AiOutlineUser />} />
                    </div>
                </div>
            ) : (
                <CustomButtonComponent innteText={"Sign In"} pathUrl={"/auth/user-signIn"} />
            )}
        </profile.div>
    );
}

export default UserProfileComponent;
