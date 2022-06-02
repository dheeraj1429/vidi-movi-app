import { useLocation } from "react-router";
import { useState, useEffect } from "react";

const useNav = function (data) {
    const loaction = useLocation();
    const [ActiveBar, setActiveBar] = useState("");

    useEffect(() => {
        const upFn = function (str, index) {
            return str[index].charAt(0).toUpperCase() + str[index].slice(1);
        };

        const path = loaction.pathname.split("/").slice(-1)[0];
        if (path.split("-").length >= 2) {
            console.log(path.split("-").length);
            const strSplit = path.split("-");
            const splitText = upFn(strSplit, 0) + " " + upFn(strSplit, 1);
            setActiveBar(splitText);
        } else {
            const str = path.charAt(0).toUpperCase() + path.slice(1);
            setActiveBar(str);
        }
    });

    return ActiveBar;
};

export default useNav;
