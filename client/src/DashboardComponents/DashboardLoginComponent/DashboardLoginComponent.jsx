import React from "react";
import * as login from "./DashboardLoginComponent.style";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CustomButtonComponent from "../../Components/CustomButtonComponent/CustomButtonComponent";

function DashboardLoginComponent() {
    return (
        <login.div>
            <login.heading>
                <h5 className="text-center">Login In</h5>
                <p className="text-center">Login to stay connected.</p>
            </login.heading>
            <login.group>
                <Box>
                    <TextField fullWidth label="Email" type={"email"} id="fullWidth" />
                </Box>
                <Box
                    sx={{
                        marginTop: "2rem",
                    }}
                >
                    <TextField fullWidth label="Password" type={"password"} id="fullWidth" />
                </Box>

                <CustomButtonComponent innteText={"Log In"} buttonCl={"google__sign-in "} />
            </login.group>
        </login.div>
    );
}

export default DashboardLoginComponent;
