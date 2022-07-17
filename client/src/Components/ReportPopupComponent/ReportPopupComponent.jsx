import React, { useState } from "react";
import ReactDOM from "react-dom";
import * as report from "./ReportPopupComponent.style";
import { useSelector, useDispatch } from "react-redux";
import { IoIosClose } from "@react-icons/all-files/io/IoIosClose";
import { showRepoertComponent } from "../../Redux/Action/appAction";
import { Checkbox } from "antd";
import CustomButtonComponent from "../CustomButtonComponent/CustomButtonComponent";
import { bugReport } from "../../Redux/Action/indexAction";
import { reportLoadingButton, removeReportMessage } from "../../Redux/Action/appAction";
import { useCookies } from "react-cookie";
import { Spin } from "antd";

const reportAr = [
    { comment: "Abuse Comment", id: 1 },
    { comment: "It's spam", id: 2 },
    { comment: `I just don't like it`, id: 3 },
    { comment: `Hate speech or symbols`, id: 4 },
];

function ReportPopupComponent({ isShow }) {
    const showReportComponent = useSelector((state) => state.index.showReportComponent);
    const commentReportLoading = useSelector((state) => state.index.commentReportLoading);
    const commentReport = useSelector((state) => state.index.commentReport);

    const dispatch = useDispatch();
    const [Report, setReport] = useState([]);
    const [cookies] = useCookies(["user"]);

    const ShowAndHideHandler = function () {
        dispatch(showRepoertComponent(null));
        dispatch(removeReportMessage(false));
        setReport([]);
    };

    const CheckBoxChangeHandler = (e) => {
        if (e.target.checked) {
            setReport([...Report, e.target.id]);
        }
    };

    const bugReportHandler = function () {
        console.log(Report);
        if (cookies.user && cookies.user.data && !!Report.length) {
            dispatch(reportLoadingButton(true));
            const bugReportObject = new Object();
            bugReportObject.selectedData = showReportComponent;
            bugReportObject.report = Report;
            bugReportObject.userReportId = cookies.user.data._id;
            bugReportObject.userReportProvider = cookies.user.data.provider;

            if (!!showRepoertComponent) {
                dispatch(bugReport(bugReportObject));
            }
        }
    };

    return ReactDOM.createPortal(
        <report.div
            className="report-popup"
            style={
                !!isShow
                    ? {
                          display: "flex",
                      }
                    : {
                          display: "none",
                      }
            }
        >
            <report.innerDiv>
                <IoIosClose onClick={ShowAndHideHandler} className="close_icon" />
                <h5>What's happenning?</h5>
                <p>Why are you reporting this comment.</p>
                {reportAr.map((el) => (
                    <report.mr key={el.id}>
                        <Checkbox id={el.comment} onChange={CheckBoxChangeHandler}>
                            {el.comment}
                        </Checkbox>
                    </report.mr>
                ))}

                {commentReportLoading ? (
                    <Spin />
                ) : (
                    <CustomButtonComponent innteText="Report Comment" buttonCl="report-button" onClick={bugReportHandler} />
                )}
                {!!commentReport ? <p className="report_message">{commentReport}</p> : null}
            </report.innerDiv>
        </report.div>,
        document.getElementById("report_div")
    );
}

export default ReportPopupComponent;
