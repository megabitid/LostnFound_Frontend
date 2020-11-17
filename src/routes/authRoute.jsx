import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import { Auth } from "../modules/context"

const AuthRoute = ({ component : Component , ...rest  }) => {

    const [user] = useContext(Auth)

    return (
        <Route
            {...rest}
            render={props => {
                return user
                    ? <Component {...props} />
                    : <Redirect to={"/login"}/>
            }}
        />
    )
};

export default AuthRoute;