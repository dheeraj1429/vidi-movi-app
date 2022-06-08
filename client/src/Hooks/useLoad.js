import { gapi } from "gapi-script";
import { clientId, userClientScret } from "../Utils/VarifyFunction";

const useLoad = function () {
    return function (auth) {
        gapi.load(auth, function () {
            gapi.client.init({
                apiKey: userClientScret,
                clientId: clientId,
                scope: "",
            });
        });
    };
};

export default useLoad;
