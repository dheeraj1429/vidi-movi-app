import React, { useEffect } from "react";
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
        <>
            {!!user && !!Object.keys(user.data).length && user.data ? (
                <div className="user-login-div">
                    <div id="profile_div">
                        <profile.profileDiv
                            onClick={showPopUpHandler}
                            style={
                                user.data.imageUrl
                                    ? {
                                          backgroundImage: `url(${
                                              !!user.data.uploadCustomProfileImage
                                                  ? `/compressUserProfileImages/${user.data.imageUrl}`
                                                  : user.data.imageUrl
                                          })`,
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
        </>
    );
}

export default UserProfileComponent;
