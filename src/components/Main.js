import React from 'react';

import { Link, HashRouter, Route } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Router from "./Router";

import { TextField } from "@material-ui/core";
import TextInput from './TextInput';
import Header from './Header';
import Guide from './Guide';

import "../css.css";


function Main() {

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
                        <TextField variant="outlined" size="small" label="ID" style={{width: "100%", margin: "10px 0px"}}/>
                        <TextField variant="outlined" size="small" label="PW" style={{width: "100%"}}/>
                    </div>
                </div>
                <div>
                    <HashRouter>
                    <Link to="/Guide">
                    <button className="MainButton" >로그인</button>
                    </Link>
                    </HashRouter>
                </div>
            </div>
        </div>
    )
}

export default Main;
