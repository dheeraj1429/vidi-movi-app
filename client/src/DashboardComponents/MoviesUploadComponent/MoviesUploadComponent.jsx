import React, { useState } from "react";
import * as Movies from "./MoviesUploadComponent.style";
import DashBoardHeadingComponent from "../DashBoardHeadingComponent/DashBoardHeadingComponent";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FileUploadComponent from "../FileUploadComponent/FileUploadComponent";
import { useSelector, useDispatch } from "react-redux";
import { movieUpload, loadingAction } from "../../Redux/Action/adminAction";
import CustomButtonComponent from "../../Components/CustomButtonComponent/CustomButtonComponent";

const genresData = [
    { value: "Action", label: "Action" },
    { value: "Comedy", label: "Comedy" },
    { value: "Drama", label: "Drama" },
    { value: "Fantasy", label: "Fantasy" },
    { value: "Horror", label: "Horror" },
    { value: "Mystery", label: "Mystery" },
    { value: "Romance", label: "Romance" },
    { value: "Thriller", label: "Thriller" },
];

function MoviesUploadComponent() {
    const [MovieData, setMovieData] = useState({
        name: "",
        category: "",
        genra: "",
        artist: "",
        Album: "",
        licensed: "",
        description: "",
        thumbnail: "",
        file: "",
    });
    const dispatch = useDispatch();
    const movieStatus = useSelector((state) => state.movie.movie_status);
    const loading = useSelector((state) => state.movie.loading);

    console.log(movieStatus);

    const CahngeHander = function (e) {
        const name = e.target.name;
        const value = e.target.value;
        setMovieData({ ...MovieData, [name]: value });
    };

    const changeMusicFileHandler = function (e) {
        const data = e.target.files[0];
        const name = e.target.name;

        if (!name) return;
        if (!data) return;

        setMovieData({ ...MovieData, [name]: data });
    };

    const SendData = function () {
        const { name, category, genra, artist, Album, licensed, description, thumbnail } = MovieData;

        if (name && category && genra && artist && Album && licensed && description && thumbnail) {
            const file = MovieData.file;
            const formData = new FormData();

            formData.append("file", file);
            formData.append("thumbnail", thumbnail);
            formData.append("name", name);
            formData.append("category", category);
            formData.append("genra", genra);
            formData.append("artist", artist);
            formData.append("Album", Album);
            formData.append("description", description);
            formData.append("licensed", licensed);
            formData.append("thumbnail", thumbnail);

            dispatch(movieUpload(formData));
            dispatch(loadingAction(true));
        }
    };

    return (
        <Movies.div>
            <DashBoardHeadingComponent title={"Movies Upload"} titleNav={"Form / movies upload"} />
            <Movies.formGroup>
                <DashBoardHeadingComponent title={"Form Elements"} elmCl={"extra-sm"} />
                <Movies.innerDiv className="flex-div-inner ">
                    <TextField id="outlined-basic" label="Movie name" variant="outlined" value={MovieData.name} name="name" onChange={CahngeHander} />
                    <TextField
                        id="outlined-basic"
                        label="Movie category"
                        variant="outlined"
                        value={MovieData.category}
                        name="category"
                        onChange={CahngeHander}
                    />
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Select"
                        helperText="Please select movie genra"
                        name="genra"
                        value={MovieData.genra}
                        onChange={CahngeHander}
                    >
                        {genresData.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Movies.innerDiv>
                <Movies.innerDiv className="flex-div-inner margin-bottom">
                    <TextField
                        id="outlined-basic"
                        label="Artist name"
                        variant="outlined"
                        value={MovieData.artist}
                        name="artist"
                        onChange={CahngeHander}
                    />
                    <TextField id="outlined-basic" label="Album" variant="outlined" value={MovieData.Album} name="Album" onChange={CahngeHander} />
                    <TextField
                        id="outlined-basic"
                        label="Licensed to"
                        variant="outlined"
                        value={MovieData.licensed}
                        name="licensed"
                        onChange={CahngeHander}
                    />
                </Movies.innerDiv>
                <TextField
                    id="outlined-multiline-static"
                    label="Movie Description"
                    multiline
                    rows={9}
                    defaultValue="Default Value"
                    value={MovieData.description}
                    onChange={CahngeHander}
                    name="description"
                />

                <Movies.innerDiv>
                    <FileUploadComponent
                        value={MovieData.file}
                        change={changeMusicFileHandler}
                        accept="video/mp4,video/x-m4v,video/*"
                        name={"file"}
                        ic={"fas fa-image"}
                        paraValue={MovieData.file.name}
                    />
                    <FileUploadComponent
                        value={MovieData.thumbnail}
                        change={changeMusicFileHandler}
                        accept="image/*"
                        name={"thumbnail"}
                        ic={"fas fa-image"}
                        paraValue={MovieData.thumbnail.name}
                    />
                </Movies.innerDiv>

                <Movies.endDiv>
                    {movieStatus !== null && movieStatus.success ? <p>{movieStatus.message}</p> : null}
                    <CustomButtonComponent
                        onClick={SendData}
                        buttonCl="upload-button"
                        innteText="Upload"
                        isLoading={loading}
                        spnnerImage={"/images/spnner-black.svg"}
                    />
                </Movies.endDiv>
            </Movies.formGroup>
        </Movies.div>
    );
}

export default MoviesUploadComponent;
