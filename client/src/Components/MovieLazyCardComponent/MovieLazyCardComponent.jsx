import React, { Suspense, lazy, useState } from "react";
import * as card from "./MovieLazyCardComponent.style";
import { Card } from "antd";
import Skeleton from "@mui/material/Skeleton";
const MoviesCardsComponent = lazy(() => import("../MoviesCardsComponent/MoviesCardsComponent"));

function MovieLazyCardComponent({ data }) {
    return (
        <card.div>
            <Suspense
                fallback={
                    <>
                        <Card
                            style={{
                                width: "100%",
                                marginTop: 16,
                            }}
                        >
                            <Skeleton variant="rectangular" width={"100%"} height={200} />
                        </Card>
                    </>
                }
            >
                <MoviesCardsComponent data={data} />
            </Suspense>
        </card.div>
    );
}

export default MovieLazyCardComponent;
