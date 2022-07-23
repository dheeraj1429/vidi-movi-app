import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import store from "./Redux/Store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import "slick-carousel/slick/slick.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick-theme.css";
import "antd/dist/antd.css";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <ThemeProvider theme={darkTheme}>
        <Provider store={store}>
            <CookiesProvider>
                <BrowserRouter>
                    {/* <React.StrictMode> */}
                    <App />
                    {/* </React.StrictMode> */}
                </BrowserRouter>
            </CookiesProvider>
        </Provider>
    </ThemeProvider>
);
