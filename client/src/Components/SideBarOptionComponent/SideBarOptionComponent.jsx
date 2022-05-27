import React, { useState, useEffect } from "react";
import * as sidebar from "./SideBarOptionComponent.style";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ProfileInnerOptionComponent from "../ProfileInnerOptionComponent/ProfileInnerOptionComponent";
import { BiMoon } from "@react-icons/all-files/bi/BiMoon";
import { BiSun } from "@react-icons/all-files/bi/BiSun";
import { themChange, showOptionPopup } from "../../Redux/Action/indexAction";
import { useDispatch } from "react-redux";

function SideBarOptionComponent({ icon, innerText, event, activeBar, onClick, width, innerOptions }) {
    const [ShowInnerOptions, setShowInnerOptions] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();

    const InnerOptionsHandler = function () {
        setShowInnerOptions(true);
    };

    const InnerOptionMouserLeaveHandler = function () {
        setShowInnerOptions(false);
    };

    const changeThemeHandler = function (data) {
        dispatch(themChange(data));
        dispatch(showOptionPopup(false));
    };

    return (
        <>
            <sidebar.parentDiv onClick={onClick ? onClick : null}>
                <Link
                    to={
                        innerText === "Home" ||
                        innerText === "Log Out" ||
                        innerText === "Change Theme" ||
                        innerText === "Dark" ||
                        innerText === "Light"
                            ? "/"
                            : innerText === "Dashboard"
                            ? "/admin/dashboard"
                            : null
                            ? location.pathname
                            : innerText.split(" ").join("-").toLowerCase()
                    }
                >
                    <sidebar.div
                        onClick={event ? event : null}
                        data-target={innerText}
                        className={activeBar === innerText ? "active-bar" : null}
                        onMouseEnter={innerOptions ? InnerOptionsHandler : null}
                        onMouseLeave={innerOptions ? InnerOptionMouserLeaveHandler : null}
                    >
                        {innerOptions ? (
                            <sidebar.sideBarInnerOptionsDiv className={ShowInnerOptions ? "showInenrOptions" : null}>
                                <ul>
                                    <li onClick={() => changeThemeHandler("Dark")}>
                                        <ProfileInnerOptionComponent icon={<BiMoon />} innerText={"Dark"} width={"20"} />
                                    </li>
                                    <li onClick={() => changeThemeHandler("Light")}>
                                        <ProfileInnerOptionComponent icon={<BiSun />} innerText={"Light"} width={"20"} />
                                    </li>
                                </ul>
                            </sidebar.sideBarInnerOptionsDiv>
                        ) : null}

                        <sidebar.innerDiv>
                            <sidebar.svgDiv
                                style={
                                    width
                                        ? {
                                              width: `${width}px`,
                                          }
                                        : null
                                }
                            >
                                {icon}
                            </sidebar.svgDiv>
                            <p>{innerText}</p>
                        </sidebar.innerDiv>
                    </sidebar.div>
                </Link>
            </sidebar.parentDiv>
        </>
    );
}

export default SideBarOptionComponent;
