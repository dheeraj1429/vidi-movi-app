import React from "react";

import * as Icons from "./IconsComponent.style";

function IconsComponent({ iconsCl, children }) {
    return <Icons.IconInnerDiv>{children ? children : <i class={iconsCl}></i>}</Icons.IconInnerDiv>;
}

export default IconsComponent;
