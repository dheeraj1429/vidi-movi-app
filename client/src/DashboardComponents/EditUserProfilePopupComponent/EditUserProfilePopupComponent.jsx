import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import * as edit from "./EditUserProfilePopupComponent.style";
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import CustomButtonComponent from "../../Components/CustomButtonComponent/CustomButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { userProfilePupup } from "../../Redux/Action/appAction";
import { updateUserProfile } from "../../Redux/Action/adminAction";

const adminOptions = [
    {
        value: "admin",
        label: "admin",
    },
    {
        value: "user",
        label: "user",
    },
];

function EditUserProfilePopupComponent({ isShow }) {
    const [AdminDataInfo, setAdminDataInfo] = useState("");
    const [UserInfo, setUserInfo] = useState({
        name: "",
        email: "",
    });
    const dispatch = useDispatch();
    const userProfileSelected = useSelector((state) => state.index.userProfileSelected);
    const loading = useSelector((state) => state.movie.loading);

    useEffect(() => {
        if (userProfileSelected) {
            const { isAdmin, name, email } = userProfileSelected;
            setAdminDataInfo(isAdmin);
            setUserInfo({ ...UserInfo, name: name, email: email });
        }
    }, [userProfileSelected]);

    const ChangeInputHandler = function (e) {
        const name = e.target.name;
        const value = e.target.value;
        setUserInfo({ ...UserInfo, [name]: value });
    };

    const handleChange = (event) => {
        setAdminDataInfo(event.target.value);
    };

    const ClosePopupHandler = function () {
        dispatch(userProfilePupup(false));
    };

    const Updatehandler = function () {
        const { name, email } = UserInfo;
        if (name !== userProfileSelected.name || email !== userProfileSelected.email || AdminDataInfo !== userProfileSelected.isAdmin) {
            dispatch(updateUserProfile({ name, email, AdminDataInfo, provider: userProfileSelected.provider, _id: userProfileSelected.id }));
            dispatch(userProfilePupup(false));
        } else {
            return;
        }
    };

    return ReactDOM.createPortal(
        <edit.div className={isShow ? "showEditPopup" : "hideEditPupup"}>
            <edit.innerDiv>
                <h1>Edit Profile</h1>
                <IoMdClose className="close_icons_elm" onClick={ClosePopupHandler} />
                <Box
                    component="form"
                    sx={{
                        "& > :not(style)": { width: "100%" },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="Name" variant="outlined" name="name" value={UserInfo.name} onChange={ChangeInputHandler} />
                    <TextField
                        id="outlined-basic"
                        label="Email Address"
                        variant="outlined"
                        name="email"
                        value={UserInfo.email}
                        onChange={ChangeInputHandler}
                    />

                    <TextField id="outlined-select-currency" select label="Select" value={AdminDataInfo} onChange={handleChange}>
                        {adminOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                <edit.flexDiv>
                    <CustomButtonComponent
                        innteText={"Update"}
                        onClick={Updatehandler}
                        buttonCl={"upload-button"}
                        isLoading={loading}
                        spnnerImage={"/images/spnner-black.svg"}
                    />
                </edit.flexDiv>
            </edit.innerDiv>
        </edit.div>,
        document.getElementById("edit-user-profile")
    );
}

export default EditUserProfilePopupComponent;
