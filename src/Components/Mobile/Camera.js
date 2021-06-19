import React, { useEffect, useState } from 'react';
import { Cookies, useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";

import Header from './MobileHeader';


import * as janus from '../../module/examCandidateMobile';


const Camera = () => {
    const [isVisible, changeVisible] = useState([false]);
    const [userId, setUserId]                   = useState();
    const [userName, setUserName]               = useState();
    const [userNumber, setUserNumber]           = useState();
    const [testId, setTestId]                   = useState(1234);
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
            <div className="MainBox">
                <div className="CameraBox">
                <span className="CameraTitle">
                    [카메라 촬영 설정]
                </span>
                </div>
                <span>
                    카메라 접근 허용을 해야 정상적으로 시험에 응시가 가능합니다.
                </span>
                <div className="CameraSubTitle">
                <span>
                    PC 화면의 시험 대기 페이지에 나와있는 시험 번호를 입력 후, 연결 시작 버튼을 눌러주세요.
                </span>
                </div>
                
                <button className="TestButton" 
                onClick={() => janus.runJanusMobile(userNumber, testId)}>
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