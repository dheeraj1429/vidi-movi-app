import React from "react";
import * as content from "./SingelVideoContentComponent.style";
import { BsDot } from "@react-icons/all-files/bs/BsDot";
import { useSelector } from "react-redux";

function SingelVideoContentComponent() {
    const selectedMovie = useSelector((state) => state.index.selectedMovie);

    return (
        <content.div>
            {selectedMovie && selectedMovie.data && Object.keys(selectedMovie.data) ? (
                <>
                    <h2>{selectedMovie.data.name}</h2>
                    <p>
                        {selectedMovie.data.description.length > 200
                            ? `${selectedMovie.data.description.slice(0, 200)}...`
                            : selectedMovie.data.description}
                    </p>

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
