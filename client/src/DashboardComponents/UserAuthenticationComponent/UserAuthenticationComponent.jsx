import React, { useState } from "react";
import * as auth from "./UserAuthenticationComponent.style";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import { MdEdit } from "@react-icons/all-files/md/MdEdit";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { profileSelected, userProfilePupup } from "../../Redux/Action/appAction";
import { MdDeleteForever } from "@react-icons/all-files/md/MdDeleteForever";
import { Popconfirm } from "antd";
import { deleteAccount } from "../../Redux/Action/adminAction";

const options = ["Edit"];
const ITEM_HEIGHT = 48;

function UserAuthenticationComponent({ name, email, provider, id, isAdmin, createdAt }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const SelectedHandler = function () {
        dispatch(profileSelected({ name, email, isAdmin, provider, id }));
        dispatch(userProfilePupup(true));
    };

    const confirm = () => {
        dispatch(deleteAccount({ id, provider }));
    };

    return (
        <auth.div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2 d-flex">
                        <Popconfirm
                            title="After you have deleted an account, it will be permanently deleted. Accounts cannot be recovered."
                            onConfirm={confirm}
                        >
                            <MdDeleteForever className="userEdit_button mt-1 me-2" />
                        </Popconfirm>

                        <p>{name}</p>
                    </div>
                    <div className="col-3">
                        <p>{email}</p>
                    </div>
                    <div className="col-1">
                        <p>{provider === "google" ? <FcGoogle /> : provider}</p>
                    </div>
                    <div className="col-2">
                        <p>{new Date(createdAt).toDateString()}</p>
                    </div>
                    <div className="col-3">
                        <p>{id}</p>
                    </div>
                    <div className="col-1">
                        <div className="d-flex align-items-center">
                            <p className="mb-0">{isAdmin}</p>

                            <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls={open ? "long-menu" : undefined}
                                aria-expanded={open ? "true" : undefined}
                                aria-haspopup="true"
                                onClick={handleClick}
                            >
                                <MdEdit className="userEdit_button" />
                            </IconButton>
                            <Menu
                                id="long-menu"
                                MenuListProps={{
                                    "aria-labelledby": "long-button",
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    style: {
                                        maxHeight: ITEM_HEIGHT * 4,
                                        width: "20ch",
                                    },
                                }}
                            >
                                {options.map((option) => (
                                    <MenuItem
                                        key={option}
                                        selected={option === "Pyxis"}
                                        onClick={() => {
                                            handleClose();
                                            SelectedHandler();
                                        }}
                                    >
                                        {option}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    </div>
                </div>
            </div>
        </auth.div>
    );
}

export default UserAuthenticationComponent;
