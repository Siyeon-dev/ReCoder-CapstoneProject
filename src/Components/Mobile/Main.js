import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from "axios";

import { TextField } from "@material-ui/core";
import Header from './MobileHeader';




const Main = () => {
    const [userId, setUserId]                   = useState();
    const [userPw, setUserPw]                   = useState();
    const [userNumber, setUserNumber]           = useState();
    const [data, setData]                       = useState();
    const [cookies, setCookie, removeCookie]    = useCookies();
    const history                               = useHistory();

    useEffect(() => {
        removeCookie("s_email");
        removeCookie("s_name");
        removeCookie("s_number");
        removeCookie("isLogin");
        history.push("/");
    }, [])

    const getUserData = (e) => {
        
        let data = {
            s_email: userId,
            s_password: userPw
        };

        setData(data);

        console.log(data);

        axios
        .post("http://18.215.120.133:3000/login", data)
        .then((res)=> {
            console.log(res);
            localStorage.setItem("token", res.data.token);

            const { accessToken } = res.data;
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            console.log(res.data)
            
            if(res.data.login == "success") {
                alert("로그인 되었습니다");
                setCookie("s_email", data.s_email);
                setCookie("s_name", res.data.s_name);
                setCookie("s_number", res.data.s_number);
                setCookie("isLogin", true);

                history.push("/Guide");
            }
            else {
                alert("로그인에 실패했습니다\n아이디 또는 비밀번호를 확인하여 주세요");

                history.push("/");
            }
        })
        .catch((err) => {
            console.log(err.res);
            localStorage.removeItem("token");
        })
    }
    
    const onEnterPress = (e) => {
        if(e.key === "Enter") {
            getUserData();
        }
    }

    return (
        <div>
            <Header />
            <div className="MainBox">
                <span className="BoxTextTitle">
                온라인 코딩 시험 플랫폼 Re:Coder 입니다
                </span>
                <span className="BoxTextConnect">
                온라인 시험 감독을 위해 카메라 사용 권한 허용이 필요합니다.
                </span>
            
                <div className="MainSubBox">
                    <span className="SubBoxText">
                    원활한 시험 응시를 위하여 ID와 PW를 입력 후 로그인 해 주세요.
                    </span>
                </div>
                <div className="LoginBox">
                    <span className="BoxTextCode">
                    <span style={{color: "red"}}>✻</span> 로그인</span>
                    <div className="InputBox">
                        <TextField id="userId" variant="outlined" size="small" 
                            label="ID" style={{width: "100%", margin: "10px 0px"}}
                            onChange={(e) => setUserId(e.target.value)}
                            onKeyPress={onEnterPress}/>
                        <TextField id="userPw" variant="outlined" size="small" 
                            label="PW" style={{width: "100%"}} type="password"
                            onChange={(e) => setUserPw(e.target.value)}
                            onKeyPress={onEnterPress}/>
                    </div>
                </div>
                <div>
                    <button className="MainButton" onClick={() => getUserData()}>로그인</button>
                </div>
            </div>
        </div>
    )
}

export default Main;
