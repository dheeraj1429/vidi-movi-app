import React from "react";
import { Progress } from "antd";
import * as upload from "./MovieUploadProgressComponent.style";
import { useSelector } from "react-redux";

function MovieUploadProgressComponent() {
    const movieUploadProgress = useSelector((state) => state.movie.movieUploadProgress);

    return (
        <upload.div>
            {!!movieUploadProgress ? (
                <Progress
                    strokeColor={{
                        from: "#108ee9",
                        to: "#87d068",
                    }}
                    percent={movieUploadProgress}
                    status="active"
                />
            ) : null}
        </upload.div>
    );
}

export default MovieUploadProgressComponent;
