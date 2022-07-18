import React, { useRef, useState } from "react";
import * as profile from "./UserSettingProfileComponent.style";
import { useSelector } from "react-redux";
import { BsUpload } from "@react-icons/all-files/bs/BsUpload";

function UserSettingProfileComponent({ edit, fn }) {
    const user = useSelector((state) => state.auth.user);
    const uploadProfileRef = useRef(null);
    const [Image, setImage] = useState(null);

    const ProfileHandler = function () {
        uploadProfileRef.current.click();
    };

    const UploadImageFileHandler = function (e) {
        const image = e.target.files[0];
        if (image) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(image);
            fileReader.addEventListener("load", function () {
                setImage(this.result);
            });
        }
        fn(image);
    };

    return (
        <>
            {user && user.data ? (
                <profile.div edit={edit}>
                    <profile.profile
                        style={
                            user.data.imageUrl
                                ? {
                                      backgroundImage: `url(${
                                          !!Image
                                              ? Image
                                              : !!user.data.uploadCustomProfileImage
                                              ? `/compressUserProfileImages/${user.data.imageUrl}`
                                              : user.data.imageUrl
                                      })`,
                                  }
                                : {
                                      backgroundColor: `${!!Image ? "transparent" : "var(--watch-cl)"}`,
                                      backgroundImage: `url(${!!Image ? Image : null})`,
                                  }
                        }
                    >
                        {edit ? <BsUpload onClick={ProfileHandler} /> : null}
                        {edit ? (
                            <input type="file" id="imgupload" onChange={UploadImageFileHandler} ref={(el) => (uploadProfileRef.current = el)} />
                        ) : null}

                        {user.data.imageUrl ? null : edit ? null : <p>{user.data.name}</p>}
                    </profile.profile>
                    <profile.profileContnet edit={edit}>
                        <p>{user.data.email}</p>
                        <h1>{user.data.name}</h1>
                    </profile.profileContnet>
                </profile.div>
            ) : null}
        </>
    );
}

export default UserSettingProfileComponent;
