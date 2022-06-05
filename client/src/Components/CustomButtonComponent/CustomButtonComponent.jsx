import React from "react";
import * as CustomButton from "./CustomButtonComponent.style";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import HocSpnner from "../HocSpnnerComponent/HocSpnnerComponent";

function CustomButtonComponent({ innteText, buttonCl, buttonIcon, pathUrl, type, onClick }) {
    const loaction = useLocation();

    return (
        <CustomButton.div>
            <Link to={pathUrl ? pathUrl : loaction.pathname}>
                <CustomButton.button className={buttonCl ? buttonCl : null} type={type ? type : "button"} onClick={onClick ? onClick : null}>
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
            </Link>
        </CustomButton.div>
    );
}

export default HocSpnner(CustomButtonComponent);
