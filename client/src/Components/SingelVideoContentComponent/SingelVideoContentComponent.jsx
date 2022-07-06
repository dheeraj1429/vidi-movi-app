import React, { useState } from "react";
import * as content from "./SingelVideoContentComponent.style";
import { BsDot } from "@react-icons/all-files/bs/BsDot";
import { useSelector } from "react-redux";

function SingelVideoContentComponent() {
    const selectedMovie = useSelector((state) => state.index.selectedMovie);
    const [ShowDis, setShowDis] = useState(false);

    function replaceURLs(message) {
        if (!message) return;

        var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
        return message
            .replace(urlRegex, function (url) {
                var hyperlink = url;
                if (!hyperlink.match("^https?://")) {
                    hyperlink = "http://" + hyperlink;
                }
                return '<a href="' + hyperlink + '" target="_blank" rel="noopener noreferrer">' + url + "</a>";
            })
            .replace(/(?:\r\n|\r|\n)/g, "<br>");
    }

    const ShowDiscriptionHandler = function () {
        setShowDis(!ShowDis);
    };

    return (
        <content.div>
            {selectedMovie && selectedMovie.data && Object.keys(selectedMovie.data) ? (
                <>
                    <h2>{selectedMovie.data.name}</h2>
                    <content.showLessDiv>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: ShowDis
                                    ? replaceURLs(selectedMovie.data.description)
                                    : replaceURLs(selectedMovie.data.description.slice(0, 300)),
                            }}
                        ></p>
                        {selectedMovie.data.description.length > 300 ? (
                            <p onClick={ShowDiscriptionHandler} className="ShowAndLessShow">
                                {ShowDis ? "Less.." : "Show More.."}
                            </p>
                        ) : null}
                    </content.showLessDiv>

                    <content.flexDiv>
                        <content.tag>
                            <span>Views</span>
                        </content.tag>
                        <BsDot />
                        <span>{selectedMovie.data.views}</span>
                    </content.flexDiv>

                    <content.flexDiv>
                        <content.tag>
                            <span>genra</span>
                        </content.tag>
                        <BsDot />
                        <span>{selectedMovie.data.genra}</span>
                    </content.flexDiv>

                    <content.flexDiv>
                        <content.tag>
                            <span>category</span>
                        </content.tag>
                        <BsDot />
                        <span>{selectedMovie.data.category}</span>
                    </content.flexDiv>
                </>
            ) : null}
        </content.div>
    );
}

export default SingelVideoContentComponent;
