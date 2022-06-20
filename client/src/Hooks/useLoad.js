import { gapi } from "gapi-script";
import { clientId } from "../Utils/VarifyFunction";

const useLoad = function () {
    return function (auth) {
        gapi.load(auth, function () {
            gapi.auth2.init({
                clientId: clientId,
                scope: "",
            });
        });
    };
};

export default useLoad;
