import React, { useRef, useEffect } from "react";
import { AiOutlineCamera } from "@react-icons/all-files/ai/AiOutlineCamera";
import * as banner from "./UserProfileBannerComponent.style";
import { useState } from "react";
import { updateUserProfileBanner } from "../../Redux/Action/indexAction";
import { useDispatch, useSelector } from "react-redux";
import CustomButtonComponent from "../CustomButtonComponent/CustomButtonComponent";
import { useCookies } from "react-cookie";
import { message } from "antd";

function UserProfileBannerComponent() {
    const bannerRef = useRef(null);
    const key = "updatable";
    const [Image, setImage] = useState("");
    const userProfileBanner = useSelector((state) => state.auth.userProfileBanner);
    const [BannerImage, setBannerImage] = useState("");
    const user = useSelector((state) => state.auth.user);
    console.log(user);
    const [cookie] = useCookies(["user"]);
    const dispatch = useDispatch();

    const OpenFile = () => {
        bannerRef.current.click();
    };

    const UploadFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const rendrer = new FileReader();
            rendrer.readAsDataURL(file);
            rendrer.addEventListener("load", function () {
                setImage(this.result);
            });
        }
        setBannerImage(file);
    };

    const openMessage = () => {
        message.loading({
            content: "Loading...",
            key,
        });
    };

    const updateUserProfileBannerPhoto = function () {
        if (cookie && cookie?.user && cookie?.user?.data) {
            const token = cookie.user.data.token;
            const formDate = new FormData();
            formDate.append("bannerFile", BannerImage);
            formDate.append("token", token);
            dispatch(updateUserProfileBanner(formDate));

            openMessage();
        }
    };

    useEffect(() => {
        if (userProfileBanner && userProfileBanner.message) {
            message.success({
                content: userProfileBanner.message,
                key,
                duration: 2,
            });

            setBannerImage("");
        }
    }, [userProfileBanner]);

    return (
        <banner.div>
            <banner.profileBanner
                style={
                    Image
                        ? {
                              backgroundImage: `url(${Image})`,
                          }
                        : {
                              backgroundImage: `url(/UserProfileBannerImage/${user.data.userProfileBannerImage})`,
                          }
                }
            >
                {" "}
                <input type="file" onChange={UploadFile} ref={(el) => (bannerRef.current = el)} />
                <banner.innerDiv>
                    <div className={BannerImage ? "button_div showButtonDiv" : "button_div"}>
                        <CustomButtonComponent
                            innteText={"Update Profile"}
                            buttonCl={"Profile_upload_button"}
                            onClick={updateUserProfileBannerPhoto}
                        />
                    </div>
                    <AiOutlineCamera onClick={OpenFile} />
                </banner.innerDiv>
            </banner.profileBanner>
        </banner.div>
    );
}

export default UserProfileBannerComponent;
