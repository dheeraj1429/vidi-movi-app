import React, { useState } from "react";
import * as card from "./MoviesCardsComponent.style";
import { backendConfigData } from "../../Utils/backendData";
import CardsPlayOptionComponent from "../CardsPlayOptionComponent/CardsPlayOptionComponent";
import { BsDot } from "@react-icons/all-files/bs/BsDot";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BiDotsVerticalRounded } from "@react-icons/all-files/bi/BiDotsVerticalRounded";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import { useDispatch, useSelector } from "react-redux";
import { deleteLikeVideo } from "../../Redux/Action/indexAction";
import { Checkbox } from "antd";
import { storeSelectedMoviesId, removeSelectedMoviesId } from "../../Redux/Action/appAction";

const options = [{ name: "delete", icon: AiOutlineDelete }];
const ITEM_HEIGHT = 48;

function MoviesCardsComponent({ data, closeIcon, componentStyle, optionsIcon, checkBox }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const showSelectedOptions = useSelector((state) => state.index.showSelectedOptions);

    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const SelectedHandler = function () {
        dispatch(deleteLikeVideo({ movieId: data._id }));
    };

    const CheckBoxHandler = function (e) {
        const checked = e.target.checked;

        if (checked) {
            dispatch(storeSelectedMoviesId(data._id));
        } else {
            dispatch(removeSelectedMoviesId(data._id));
        }
    };

    return (
        <card.mainDiv>
            <card.div className={componentStyle ? `card_div_cl ${componentStyle}` : "card_div_cl"}>
                <card.cartContentDiv className={componentStyle ? "card_inner_div" : null}>
                    {closeIcon ? closeIcon : null}
                    <card.moviDiv
                        className={componentStyle ? "movie_show_card_div" : null}
                        style={{
                            backgroundImage: `url(${backendConfigData.imageUrl}/${data.thumbnailName})`,
                        }}
                    >
                        <CardsPlayOptionComponent classCl={"icons_holder"} id={data._id} name={data.name} />
                        <card.progressPosDiv>
                            <card.progress>
                                <card.progressInner />
                            </card.progress>
                        </card.progressPosDiv>
                    </card.moviDiv>
                </card.cartContentDiv>

                {componentStyle ? (
                    <card.contentDiv>
                        {optionsIcon ? (
                            <>
                                <IconButton
                                    aria-label="more"
                                    id="long-button"
                                    aria-controls={open ? "long-menu" : undefined}
                                    aria-expanded={open ? "true" : undefined}
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                >
                                    <BiDotsVerticalRounded className="Options_icon" />
                                </IconButton>
                                <Menu
                                    id="long-menu"
                                    MenuListProps={{
                                        "aria-labelledby": "long-button",
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    PaperProps={{
                                        style: {
                                            maxHeight: ITEM_HEIGHT * 4,
                                            width: "20ch",
                                        },
                                    }}
                                >
                                    {options.map((option) => (
                                        <MenuItem
                                            key={option.name}
                                            selected={option === "Pyxis"}
                                            onClick={() => {
                                                handleClose();
                                                SelectedHandler();
                                            }}
                                        >
                                            {
                                                <option.icon
                                                    className="options-show-icon"
                                                    style={{
                                                        fontSize: "20px",
                                                        marginRight: "8px",
                                                    }}
                                                />
                                            }{" "}
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        ) : null}
                        <h5>{data.name}</h5>
                        <span>
                            {data.views} views <BsDot />{" "}
                            {checkBox && showSelectedOptions ? <Checkbox onClick={CheckBoxHandler} id={data._id} /> : null}
                        </span>
                        <p>{data.description.length > 200 ? `${data.description.slice(0, 200)}..` : data.description}</p>
                    </card.contentDiv>
                ) : null}
            </card.div>
        </card.mainDiv>
    );
}

export default MoviesCardsComponent;
