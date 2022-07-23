import React from "react";

import * as Icons from "./IconsComponent.style";

function IconsComponent({ iconsCl, children, event }) {
    return <Icons.IconInnerDiv>{children ? children : <i class={iconsCl} onClick={event ? event : null}></i>}</Icons.IconInnerDiv>;
}

export default IconsComponent;
