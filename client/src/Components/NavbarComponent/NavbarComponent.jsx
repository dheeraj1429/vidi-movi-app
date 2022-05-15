import React from "react";
import * as Navbar from "./NavbarComponent.style";

import NavbarListItemComponent from "../NavbarListItemComponent/NavbarListItemComponent";
import IconsComponent from "../IconsComponent/IconsComponent";
import CustomButtonComponent from "../CustomButtonComponent/CustomButtonComponent";

function NavbarComponent() {
    return (
        <Navbar.div>
            <Navbar.imageDiv>
                <img src="/images/logo@2x.png" alt="" />
            </Navbar.imageDiv>
            <Navbar.innerDiv>
                {/* <Navbar.list>
                    <NavbarListItemComponent innerContant={"Home"} />
                    <NavbarListItemComponent innerContant={"Movies"} />
                    <NavbarListItemComponent innerContant={"Tv Shows"} />
                    <NavbarListItemComponent innerContant={"Audio Book"} />
                    <NavbarListItemComponent innerContant={"Blog"} />
                </Navbar.list> */}
            </Navbar.innerDiv>
            <Navbar.IconDiv>
                <IconsComponent iconsCl={"fas fa-search"} />
                <IconsComponent iconsCl={"fas fa-bookmark"} />
                <IconsComponent>
                    <CustomButtonComponent innteText={"Sign In"} />
                </IconsComponent>
            </Navbar.IconDiv>
        </Navbar.div>
    );
}

export default NavbarComponent;
