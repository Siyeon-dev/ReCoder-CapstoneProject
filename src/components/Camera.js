import React, { useEffect, useState } from 'react';
import { Cookies, useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

import Header from './Header';
import '../css.css';

import * as janus from '../module/examCandidateMobile';

function Test() {
    return (
        <div className="TestBox">
            <span className="TestTitle">
                휴대폰 카메라 설정 완료
            </span>
            <span className="TestText">
                이 창을 닫지 마시고, 컴퓨터에서 모바일 기기의 촬영이 정상적으로 이루어지는지 확인하세요.
            </span>
        </div>
    );
}

const Camera = () => {
    const [isVisible, changeVisible] = useState([false]);
    const [userId, setUserId]                   = useState();
    const [userName, setUserName]               = useState();
    const [userNumber, setUserNumber]           = useState();
    const [cookies, setCookie, removeCookie]    = useCookies(["token"]);
    const [isLogin, setLogin]                   = useState(cookies.isLogin);
    const [data, setData]                       = useState();
    const history                               = useHistory();

    useEffect(() => {
        if(isLogin != "true") {
            return (
                alert("비정상적인 접근입니다!"),
                history.push("/")
            )
        }
        setUserId(cookies.s_email);
        setUserName(cookies.s_name);
        setUserNumber(cookies.s_number);    
    }, []);

    return (
        <div>
            <Header />
            <p>{userName}님 환영합니다!</p>
            <div className="MainBox">
                <div className="CameraBox">
                <span className="CameraTitle">
                    [카메라 촬영 설정]
                </span>
                </div>
                <span>
                    연결 시작 버튼을 누른 후, 카메라 접근 허용을 해야 정상적으로 시험에 응시가 가능합니다.
                </span>
                {isVisible ?  null : <Test />}
                <button className="TestButton" onClick={() => janus.runJanusMobile(userNumber)}>
                    연결 시작
                </button>
                <div>
                <video className="RTC "id="myvideo" autoPlay playsInline muted="muted"/>
                </div>
            </div>
        </div>
    );
}

export default Camera;