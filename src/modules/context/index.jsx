import React, { useState, createContext } from "react";

export const Auth = createContext();

export const AuthProvider = props => {

    const currentUser = JSON.parse(localStorage.getItem("user"))

    const iniateUser = currentUser ? currentUser : null;

    const [user, setUser] = useState(iniateUser);

    return (
        <Auth.Provider value={[user, setUser]}>
            {props.children}
        </Auth.Provider>
    );
};