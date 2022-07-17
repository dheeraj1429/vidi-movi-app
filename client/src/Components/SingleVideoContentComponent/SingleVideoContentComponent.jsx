import React from "react";
import * as content from "./SingleVideoContentComponent.style";
import { useSelector } from "react-redux";
import { FcLike } from "@react-icons/all-files/fc/FcLike";
import { BsDot } from "@react-icons/all-files/bs/BsDot";

function SingleVideoContentComponent() {
    const selectedMovie = useSelector((state) => state.index.selectedMovie);

    return (
        <>
            <content.mainDiv>
                {selectedMovie && !!Object.keys(selectedMovie.data).length ? (
                    <content.div>
                        <h5>{selectedMovie.data.name}</h5>
                        <p>{selectedMovie.data.description.slice(0, 300)}...</p>
                        <content.iconDiv>
                            <FcLike />
                            <p>
                                Favorite <BsDot /> {selectedMovie.data.views}
                            </p>
                        </content.iconDiv>

                        <p>
                            Genres <BsDot /> {selectedMovie.data.genra}
                        </p>
                        <p>
                            licensed <BsDot /> {selectedMovie.data.licensed}
                        </p>
                    </content.div>
                ) : null}
            </content.mainDiv>
        </>
    );
}

export default SingleVideoContentComponent;
