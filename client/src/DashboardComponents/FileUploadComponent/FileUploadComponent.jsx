import React from "react";
import * as file from "./FileUploadComponent.style";

function FileUploadComponent({ change, paraValue, accept, name, ic }) {
    return (
        <file.div>
            <p>{paraValue}</p>
            <file.flexDiv>
                <i class={ic}></i>
            </file.flexDiv>
            <file.uploadDiv>
                <input type="file" accept={accept} name={name} onChange={change} />
            </file.uploadDiv>
        </file.div>
    );
}

export default FileUploadComponent;
