import React from "react";
import SpnnerComponent from "../SpnnerComponent/SpnnerComponent";

const HocSpnner = function (OriginalComponent) {
    const newComponent = function ({ isLoading, spnnerImage, ...otherProps }) {
        return isLoading ? <SpnnerComponent image={spnnerImage} /> : <OriginalComponent {...otherProps} />;
    };

    return newComponent;
};

export default HocSpnner;
