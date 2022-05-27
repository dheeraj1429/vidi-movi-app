import React from "react";
import * as drop from "./EditDropComponent.style";

function EditDropComponent({ icon, text }) {
    return (
        <drop.li>
            <button class="menu-button">
                {icon}
                {text}
            </button>
        </drop.li>
    );
}

export default EditDropComponent;
