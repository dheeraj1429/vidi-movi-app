import React from "react";
import SpnnerComponent from "../SpnnerComponent/SpnnerComponent";

const HocSpnner = function (OriginalComponent) {
    const newComponent = function ({ isLoading, ...otherProps }) {
        return isLoading ? <SpnnerComponent /> : <OriginalComponent {...otherProps} />;
    };

    return newComponent;
};

export default HocSpnner;
