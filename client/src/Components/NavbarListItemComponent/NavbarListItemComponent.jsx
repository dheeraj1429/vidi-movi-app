import React from "react";
import * as List from "./NavbarListItemComponent.style";

function NavbarListItemComponent({ innerContant }) {
    return (
        <List.div>
            <h5>{innerContant}</h5>
        </List.div>
    );
}

export default NavbarListItemComponent;
