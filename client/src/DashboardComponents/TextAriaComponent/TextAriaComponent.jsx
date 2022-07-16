import React from "react";
import * as textarea from "./TextAriaComponent.style";

function TextAriaComponent({ value, onChange }) {
    return (
        <textarea.div>
            {/* <textarea.label className="textaria-lable">Movie Description</textarea.label> */}
            <textarea.text placeholder="Movie Description" name="description" value={value} onChange={onChange ? onChange : null} />
        </textarea.div>
    );
}

export default TextAriaComponent;
