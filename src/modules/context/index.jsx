import React, { useState, createContext, useEffect } from "react";

export const Auth = createContext();
export const API_URL = "https://megabit-lostnfound.herokuapp.com/api/v2"
export const AuthProvider = props => {

    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true);

        const currentUser = JSON.parse(localStorage.getItem("user"));

        const iniateUser = currentUser || null;

        setUser(iniateUser);
        setLoading(false);

    }, []);

    return (
        <Auth.Provider value={[user, setUser]}>
            { !isLoading && props.children}
        </Auth.Provider>
    );
};