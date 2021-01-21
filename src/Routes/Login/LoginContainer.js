import React, { useState } from 'react'
import LoginPresenter from "./LoginPresenter";

const LoginContainer = () => {

    const [userLogin, setUserLogin] = useState(null);
    return (
        <LoginPresenter userLogin={userLogin} />
    )
}

export default LoginContainer
