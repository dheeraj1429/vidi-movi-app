import React from "react";
import * as input from "./UserProfileInputComponent.style";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function UserProfileInputComponent({ heading, subHeading, placeHolder, textAria, value, onChange, name }) {
    return (
        <input.div>
            <h5>{heading}</h5>
            {subHeading ? <p>{subHeading}</p> : null}

            <Box
                component="form"
                sx={{
                    "& > :not(style)": { width: "100%" },
                }}
                noValidate
                autoComplete="off"
            >
                {textAria ? (
                    <TextField id="outlined-multiline-static" name={name} label={placeHolder} multiline rows={10} value={value} onChange={onChange} />
                ) : (
                    <TextField id="outlined-basic" label={placeHolder} name={name} variant="standard" onChange={onChange} />
                )}
            </Box>
        </input.div>
    );
}

export default UserProfileInputComponent;
