import React, { useEffect } from "react";
import * as user from "./UserComponent.style";
import { getAllUsers } from "../../Redux/Action/adminAction";
import { useSelector, useDispatch } from "react-redux";
import DashboardBannerComponent from "../DashboardBannerComponent/DashboardBannerComponent";
import UserAuthenticationComponent from "../UserAuthenticationComponent/UserAuthenticationComponent";
import SpnnerComponent from "../../Components/SpnnerComponent/SpnnerComponent";
import EditUserProfilePopupComponent from "../EditUserProfilePopupComponent/EditUserProfilePopupComponent";

function UserComponent() {
    const dispatch = useDispatch();
    const allUsers = useSelector((state) => state.index.allUsers);
    const userProfilePopUp = useSelector((state) => state.index.userProfilePopUp);

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    return (
        <user.div>
            <EditUserProfilePopupComponent isShow={userProfilePopUp} />
            <DashboardBannerComponent imgUrl={"/images/dashboard/top-header.png"} innerPara={"walcome the dahsboard."} />
            <user.authentication>
                <div className="container-fluid heading-div">
                    <div className="row">
                        <div className="col-2">
                            <p>name</p>
                        </div>
                        <div className="col-3">
                            <p>Identifier</p>
                        </div>
                        <div className="col-1">
                            <p>Providers</p>
                        </div>
                        <div className="col-2">
                            <p>Created</p>
                        </div>
                        <div className="col-3">
                            <p>User UID</p>
                        </div>
                        <div className="col-1">
                            <p>Admin</p>
                        </div>
                    </div>
                </div>

                {allUsers !== null && allUsers.success === true && allUsers.userLoginData.length > 0 ? (
                    allUsers.userLoginData.map(({ _id, ...otherProps }) => <UserAuthenticationComponent key={_id} {...otherProps} id={_id} />)
                ) : (
                    <SpnnerComponent image={"/images/spnner-black.svg"} />
                )}
            </user.authentication>
        </user.div>
    );
}

export default UserComponent;
