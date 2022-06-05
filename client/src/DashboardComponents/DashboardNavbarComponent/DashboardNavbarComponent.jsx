import React, { useState } from "react";
import * as nav from "./DashboardNavbarComponent.style";
import Badge from "@mui/material/Badge";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { IoIosNotificationsOutline } from "@react-icons/all-files/io/IoIosNotificationsOutline";
import { FiMail } from "@react-icons/all-files/fi/FiMail";
import { BsFillChatDotsFill } from "@react-icons/all-files/bs/BsFillChatDotsFill";
import NotificationComponent from "../NotificationComponent/NotificationComponent";
import NotificationCardComponent from "../NotificationCardComponent/NotificationCardComponent";
import { FcViewDetails } from "@react-icons/all-files/fc/FcViewDetails";
import { FcSupport } from "@react-icons/all-files/fc/FcSupport";
import { FcSms } from "@react-icons/all-files/fc/FcSms";
import { useSelector, useDispatch } from "react-redux";
import { showOptionPopup } from "../../Redux/Action/indexAction";
import UserProfileComponent from "../../Components/UserProfileComponent/UserProfileComponent";

function DashboardNavbarComponent() {
    const [SelectedIcon, setSelectedIcon] = useState("");
    const showOptionsPopUp = useSelector((state) => state.index.showOptionsPopUp);

    const dispatch = useDispatch();

    const ShowProfileDiv = function () {
        dispatch(showOptionPopup(!showOptionsPopUp));
        setSelectedIcon("");
    };

    const ShowPopupHandler = function (e) {
        const target = e.currentTarget;
        const dataTarget = target.getAttribute("data-target");
        dispatch(showOptionPopup(false));

        if (SelectedIcon === dataTarget) {
            setSelectedIcon("");
        } else {
            setSelectedIcon(dataTarget);
        }
    };

    return (
        <nav.header>
            <nav.headerInner>
                <nav.logoDiv>
                    <div class="logo">
                        <svg width="46" height="33" xmlns="http://www.w3.org/2000/svg">
                            <g transform="translate(0 -.53)" fill="none" fill-rule="evenodd">
                                <rect fill="#AEA6E2" transform="rotate(45 29.586 17)" x="17.586" y="5" width="24" height="24" rx="2" />
                                <path
                                    d="m18.414 1.444 14.142 14.142a2 2 0 0 1 0 2.828L18.414 32.556a2 2 0 0 1-2.828 0L1.444 18.414a2 2 0 0 1 0-2.828L15.586 1.444a2 2 0 0 1 2.828 0Zm-.707.707a1 1 0 0 0-1.414 0L2.15 16.293a1 1 0 0 0 0 1.414L16.293 31.85a1 1 0 0 0 1.414 0L31.85 17.707a1 1 0 0 0 0-1.414L17.707 2.15Z"
                                    fill="#CBC8E1"
                                    fill-rule="nonzero"
                                />
                            </g>
                        </svg>
                    </div>
                </nav.logoDiv>
                <nav.flexDiv>
                    <nav.serchDiv>
                        <AiOutlineSearch />
                    </nav.serchDiv>
                    <nav.action>
                        <nav.iconsDiv>
                            <Badge badgeContent={1} color="primary">
                                <div onClick={(e) => ShowPopupHandler(e)} data-target="inbox">
                                    <FiMail color="action" />
                                </div>
                                <div className="notificationDiv">
                                    <NotificationComponent
                                        heading={"Inbox"}
                                        message={"2"}
                                        activeClass={SelectedIcon === "inbox" ? "showPupUp_div" : null}
                                    >
                                        <NotificationCardComponent
                                            icon={<FcViewDetails />}
                                            data={{ time: "5 hour ago", message: "A new order has been placed" }}
                                        />
                                        <NotificationCardComponent icon={<FcSupport />} data={{ time: "2 hour ago", message: "setting update" }} />
                                        <NotificationCardComponent icon={<FcSms />} data={{ time: "2 hour ago", message: "Message received" }} />
                                    </NotificationComponent>
                                </div>
                            </Badge>
                        </nav.iconsDiv>
                        <nav.iconsDiv>
                            <Badge badgeContent={2} color="primary">
                                <div onClick={(e) => ShowPopupHandler(e)} data-target="notification">
                                    <IoIosNotificationsOutline color="action" />
                                </div>
                                <NotificationComponent
                                    heading={"NOTIFICATIONS"}
                                    message={"5"}
                                    activeClass={SelectedIcon === "notification" ? "showPupUp_div" : null}
                                />
                            </Badge>
                        </nav.iconsDiv>
                        <nav.iconsDiv>
                            <Badge badgeContent={9} color="primary">
                                <div onClick={(e) => ShowPopupHandler(e)} data-target="chat">
                                    <BsFillChatDotsFill color="action" />
                                </div>
                                <NotificationComponent
                                    heading={"Messages"}
                                    message={"1000"}
                                    activeClass={SelectedIcon === "chat" ? "showPupUp_div" : null}
                                />
                            </Badge>
                        </nav.iconsDiv>
                        <nav.iconsDiv>
                            <UserProfileComponent optionsShows={false} />
                        </nav.iconsDiv>
                    </nav.action>
                </nav.flexDiv>
            </nav.headerInner>
        </nav.header>
    );
}

export default DashboardNavbarComponent;
