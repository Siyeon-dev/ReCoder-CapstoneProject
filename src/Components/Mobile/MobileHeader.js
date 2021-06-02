import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { Cookies, useCookies } from "react-cookie";

function Header() {
    const [userName, setUserName]               = useState();
    const [cookies, setCookie, removeCookie]    = useCookies(["token"]);
    const history                               = useHistory();

    useEffect(() => {
        setUserName(cookies.s_name);
    }, []);

    const onClickLogout = () => {
        localStorage.removeItem("token");
        removeCookie("s_email");
        removeCookie("s_name");
        removeCookie("s_number");
        removeCookie("isLogin");
        alert("로그아웃 되었습니다");
        history.push("/");
    }

    return (
        <div>
            <header className="HeaderTitle">
            <div>
                <span>
                    {userName ? (
                    <div>
                        <a className="LoginHeader">Re:coder</a>
                        <div className="LoginHeaderInfo">
                            <button className="LogoutButton" onClick={onClickLogout}>로그아웃</button>
                        </div>
                    </div>
                ): <div>Re:coder</div>}
                </span>
            </div>
            </header>
        </div>
    );
}
export default Header;