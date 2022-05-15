import React from "react";
import * as In from "./InputComponent.style";

function InputComponent({ lable, placeHolder, name, event, value }) {
    return (
        <>
            <In.lable htmlFor="Email">{lable}</In.lable>
            <In.input class="login__group__input" type="text" required="true" placeholder={placeHolder} name={name} onChange={event} value={value} />
        </>
    );
}

export default InputComponent;
