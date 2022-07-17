import React from "react";
import ReportPopupComponent from "../ReportPopupComponent/ReportPopupComponent";
import * as container from "./ReportConatianerComponent.style";
import { useSelector } from "react-redux";

function ReportConatianerComponent() {
    const showReportComponent = useSelector((state) => state.index.showReportComponent);

    return (
        <container.div>
            <ReportPopupComponent isShow={showReportComponent} />
        </container.div>
    );
}

export default ReportConatianerComponent;
