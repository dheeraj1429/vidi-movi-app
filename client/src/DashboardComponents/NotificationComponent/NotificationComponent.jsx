import React from "react";
import * as notification from "./NotificationComponent.style";
import { AiFillSetting } from "@react-icons/all-files/ai/AiFillSetting";

function NotificationComponent({ heading, message, activeClass, children }) {
    return (
        <notification.mainDiv>
            <notification.div className={activeClass ? activeClass : null}>
                <notification.innerDiv>
                    <div>
                        <h4>{heading}</h4>
                    </div>
                    {message > 0 ? <div className="notification_div">{message} message</div> : null}
                </notification.innerDiv>
                <notification.overFlowDiv>{children}</notification.overFlowDiv>
                <notification.settingDiv>
                    <div>
                        <h4>All Notification</h4>
                    </div>
                    <AiFillSetting />
                </notification.settingDiv>
            </notification.div>
        </notification.mainDiv>
    );
}

export default NotificationComponent;
