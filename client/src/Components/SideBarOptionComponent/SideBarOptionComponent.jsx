import React from "react";
import * as sidebar from "./SideBarOptionComponent.style";
import { Link } from "react-router-dom";

function SideBarOptionComponent({ icon, innerText, event, activeBar }) {
    return (
        <>
            <Link to={innerText === "Home" ? "/" : innerText === "Dashboard" ? "/admin/dashboard" : innerText.split(" ").join("-").toLowerCase()}>
                <sidebar.div onClick={event ? event : null} data-target={innerText} className={activeBar === innerText ? "active-bar" : null}>
                    <sidebar.innerDiv>
                        <sidebar.svgDiv>{icon}</sidebar.svgDiv>
                        <p>{innerText}</p>
                    </sidebar.innerDiv>
                </sidebar.div>
            </Link>
        </>
    );
}

export default SideBarOptionComponent;
