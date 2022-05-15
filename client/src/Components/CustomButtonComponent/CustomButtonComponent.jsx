import React from "react";

import * as CustomButton from "./CustomButtonComponent.style";

function CustomButtonComponent({ innteText, buttonCl, buttonIcon }) {
    return (
        <CustomButton.div>
            <CustomButton.button className={buttonCl ? buttonCl : null}>
                {buttonIcon ? (
                    <div>
                        <i
                            className={buttonIcon}
                            style={{
                                marginRight: ".6rem",
                            }}
                        ></i>
                        {innteText}
                    </div>
                ) : (
                    innteText
                )}
            </CustomButton.button>
        </CustomButton.div>
    );
}

export default CustomButtonComponent;
