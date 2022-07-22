import React, { useState, useEffect } from "react";
import * as sideBar from "./SideBarComponent.style";
import { VscHome } from "@react-icons/all-files/vsc/VscHome";
import { VscHeart } from "@react-icons/all-files/vsc/VscHeart";
import { BsClockHistory } from "@react-icons/all-files/bs/BsClockHistory";
import SideBarOptionComponent from "../SideBarOptionComponent/SideBarOptionComponent";
import useNav from "../../Hooks/useNav";
import { useLocation } from "react-router";
// import { MdLibraryBooks } from "@react-icons/all-files/md/MdLibraryBooks";
import { DiHackernews } from "@react-icons/all-files/di/DiHackernews";
import { AiOutlineBars } from "@react-icons/all-files/ai/AiOutlineBars";
import { BsMusicNote } from "@react-icons/all-files/bs/BsMusicNote";

function SideBarComponent() {
    const [ActiveBar, setActiveBar] = useState("Home");
    const [SmSideBar, setSmSideBar] = useState(false);
    const nav = useNav();
    const location = useLocation();

    const ActiveBarHandler = function (e) {
        const target = e.currentTarget;
        const targetData = target.getAttribute("data-target");
        setActiveBar(targetData);
    };

    const SideBarHandler = function () {
        setSmSideBar(!SmSideBar);
    };

    useEffect(() => {
        if (location.pathname === "/") {
            return;
        } else {
            setActiveBar(nav);
        }
    }, [nav]);

    return (
        <sideBar.div>
            <sideBar.mainDiv className={SmSideBar ? "small_sideBar" : null}>
                <sideBar.barsDiv>
                    <AiOutlineBars onClick={SideBarHandler} />
                </sideBar.barsDiv>
                <sideBar.innerDiv>
                    <SideBarOptionComponent
                        icon={<VscHome />}
                        innerText={"Home"}
                        event={ActiveBarHandler}
                        activeBar={ActiveBar}
                    />
                    <SideBarOptionComponent
                        icon={<VscHeart />}
                        innerText={"Like"}
                        event={ActiveBarHandler}
                        activeBar={ActiveBar}
                    />
                    <SideBarOptionComponent
                        icon={<BsClockHistory />}
                        innerText={"History"}
                        event={ActiveBarHandler}
                        activeBar={ActiveBar}
                    />
                    <SideBarOptionComponent
                        icon={<DiHackernews />}
                        innerText={"Tranding"}
                        event={ActiveBarHandler}
                        activeBar={ActiveBar}
                    />
                    <SideBarOptionComponent
                        icon={<BsMusicNote />}
                        innerText={"Music"}
                        event={ActiveBarHandler}
                        activeBar={ActiveBar}
                    />
                    {/* <SideBarOptionComponent icon={<MdLibraryBooks />} innerText={"Library"} event={ActiveBarHandler} activeBar={ActiveBar} /> */}
                </sideBar.innerDiv>
            </sideBar.mainDiv>
        </sideBar.div>
    );
}

export default SideBarComponent;
