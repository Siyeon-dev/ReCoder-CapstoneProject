import React, { useEffect, useState } from 'react'
import LoginPresenter from "./LoginPresenter";
import { UserApi } from "api";


const LoginContainer = () => {

    const [userLogin, setUserLogin] = useState(false);
    const [Error, setError] = useState("");
    const connectApi  = async () => {
        const a = await UserApi.userLogin();
        console.log(a) ;
        return a;
    }

    useEffect(() => {
        try {
            connectApi();
        } catch {
            setError("Api Connected Error");
            console.log(setError);
        }
    }, [])
    return (
        <LoginPresenter userLogin={userLogin} />
    )
}

export default LoginContainer;
