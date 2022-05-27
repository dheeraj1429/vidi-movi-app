import React from "react";
import * as sidebar from "./SideBarOptionComponent.style";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function SideBarOptionComponent({ icon, innerText, event, activeBar, onClick, width }) {
    const location = useLocation();

    return (
        <>
            <Link
                to={
                    innerText === "Home"
                        ? "/"
                        : innerText === "Dashboard"
                        ? "/admin/dashboard"
                        : innerText === "Log Out" || innerText === "Change Theme"
                        ? location.pathname
                        : innerText.split(" ").join("-").toLowerCase()
                }
                onClick={onClick ? onClick : null}
            >
                <sidebar.div onClick={event ? event : null} data-target={innerText} className={activeBar === innerText ? "active-bar" : null}>
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
        </>
    );
}

export default SideBarOptionComponent;
