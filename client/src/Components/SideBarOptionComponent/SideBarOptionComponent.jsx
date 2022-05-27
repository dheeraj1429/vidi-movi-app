import React, { useState } from "react";
import * as sidebar from "./SideBarOptionComponent.style";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ProfileInnerOptionComponent from "../ProfileInnerOptionComponent/ProfileInnerOptionComponent";
import { BiMoon } from "@react-icons/all-files/bi/BiMoon";
import { BiSun } from "@react-icons/all-files/bi/BiSun";

function SideBarOptionComponent({ icon, innerText, event, activeBar, onClick, width, innerOptions }) {
    const [ShowInnerOptions, setShowInnerOptions] = useState(false);
    const location = useLocation();

    const InnerOptionsHandler = function () {
        setShowInnerOptions(true);
    };

    const InnerOptionMouserLeaveHandler = function () {
        setShowInnerOptions(false);
    };

    return (
        <>
            <div onClick={onClick ? onClick : null}>
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
                                    <li>
                                        <ProfileInnerOptionComponent icon={<BiMoon />} innerText={"Dark"} width={"20"} />
                                    </li>
                                    <li>
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
            </div>
        </>
    );
}

export default SideBarOptionComponent;
