import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

const Header = () => {

    
  const [loginText, setLoginText] = useState("로그인");
  const history = useHistory();

  const loginState = () => {
      if(localStorage.getItem('token')) {
        alert("로그아웃 되었습니다.");
          setLoginText("로그아웃");
          localStorage.removeItem('token');
          history.push("/")
      } else {
          setLoginText("로그인");
      }
  }

    return (
        <div id="head">
            <div className="head_area">
                <div className="logo"><Link to="/"><img src="./img/logo.gif" alt="Re:Coder 상단로고" /></Link></div>
                <ul>
                    <li><Link to="/" onClick={loginState}>{loginText}</Link></li>
                    <li><Link to="/signup">회원가입</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Header
