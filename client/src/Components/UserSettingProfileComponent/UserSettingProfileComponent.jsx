import React from "react";
import * as profile from "./UserSettingProfileComponent.style";
import { useSelector } from "react-redux";

function UserSettingProfileComponent() {
    const user = useSelector((state) => state.auth.user);
    console.log(user);

    return (
        <>
            {user && user.data ? (
                <profile.div>
                    <profile.profile
                        style={
                            user.data.imageUrl
                                ? {
                                      backgroundImage: `url(${user.data.imageUrl})`,
                                  }
                                : {
                                      backgroundColor: "var(--watch-cl)",
                                  }
                        }
                    >
                        {user.data.imageUrl ? null : <p>{user.data.name}</p>}
                    </profile.profile>
                    <profile.profileContnet>
                        <p>{user.data.email}</p>
                        <h1>{user.data.name}</h1>
                    </profile.profileContnet>
                </profile.div>
            ) : null}
        </>
    );
}

export default UserSettingProfileComponent;
