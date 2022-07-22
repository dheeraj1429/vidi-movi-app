import React from "react";
import * as file from "./FileUploadComponent.style";

function FileUploadComponent({ change, paraValue, accept, name, ic }) {
    return (
        <file.div>
            <p className="uploadFile_data">{paraValue}</p>
            <p>file - {accept}</p>
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
