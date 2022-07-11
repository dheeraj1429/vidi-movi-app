import { gapi } from "gapi-script";
import { clientId } from "../Utils/VarifyFunction";

const useLoad = function () {
    return function (auth) {
        gapi.load(auth, function () {
            gapi.auth2.getAuthInstance({
                clientId: clientId,
                scope: "",
            });
        });
    };
};

export default useLoad;
