import React from "react";
import * as options from "./SectionOptionsComponent.style";

function SectionOptionsComponent({ optionsData }) {
    return (
        <>
            <options.lable htmlFor="Email">genre</options.lable>
            <options.select name="genre" id="genre">
                {optionsData.data.map((el) => (
                    <option value="Action" key={el.genra}>
                        {el.genra}
                    </option>
                ))}
            </options.select>
        </>
    );
}

export default SectionOptionsComponent;
