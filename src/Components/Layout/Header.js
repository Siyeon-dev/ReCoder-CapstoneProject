import React, { useState } from 'react'
import { cookies, useCookies } from 'react-cookie';
import { Link, useHistory } from 'react-router-dom'

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
    
  const [loginText, setLoginText] = useState("로그인");
  const history = useHistory();

        //임시
  const loginState = (props) => {
      if(localStorage.getItem('token')) {
        alert("로그아웃 되었습니다.");
          setLoginText("로그아웃");
          localStorage.removeItem('token');
            
            removeCookie("t_email");
            removeCookie("t_name");
            removeCookie("s_email");
            removeCookie("s_name");
            removeCookie("isLogin");
          history.push("/")
          
          setLoginText("로그인");
      }
  }

    return (
        <div id="head">
            <div className="head_area">
                <div className="logo"><Link to="/"><img src="/img/logo.gif" alt="Re:Coder 상단로고" /></Link></div>
                <ul>
                    <li><Link to="/" onClick={loginState}>{loginText}</Link></li>
                    <li><Link to="/signup">회원가입</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Header
