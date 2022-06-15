import React from "react";
import * as Navbar from "./NavbarComponent.style";
import { BsList } from "react-icons/bs";
import IconsComponent from "../IconsComponent/IconsComponent";
import UserProfileComponent from "../UserProfileComponent/UserProfileComponent";
import SearchBarComponent from "../SearchBarComponent/SearchBarComponent";

function NavbarComponent() {
    return (
        <Navbar.div>
            {/* <Navbar.imageDiv>
                <BsList />
            </Navbar.imageDiv> */}
            <div>
                <SearchBarComponent />
            </div>
            <Navbar.IconDiv>
                <IconsComponent>
                    <UserProfileComponent optionsShows={true} />
                </IconsComponent>
            </Navbar.IconDiv>
        </Navbar.div>
    );
}

export default NavbarComponent;
