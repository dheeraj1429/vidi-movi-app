import React from "react";
import * as card from "./NotificationCardComponent.style";

function NotificationCardComponent({ icon, data }) {
    return (
        <card.innerCardDiv>
            <div className="message_icon_div">{icon}</div>
            <div>
                <p>{data.message}</p>
                <span>{data.time}</span>
            </div>
        </card.innerCardDiv>
    );
}

export default NotificationCardComponent;
