import React from "react";
import { HashRouter, Link } from 'react-router-dom';

import Header from './Header';
import Sample1 from '../media/sample1.png';
import Sample2 from '../media/sample2.png';
import Sample3 from '../media/sample3.png';
import "../css.css";

function Guide() {
    return (
        <div>
            <Header />
            <div className="MainBox">
                <span className="GuideTextTitle">
                    Re:coder 모바일 촬영 화면입니다.
                </span>
                <div className="GuideBox">
                    <span className="GuideStartText">
                        PC 시험 준비를 위해 아래 안내를 잘 읽고 따라주시기 바랍니다.
                    </span>
                </div>
                <div className="GuideBox">
                    <span className="GuideCameraText">
                        촬영 시작을 클릭하면 카메라와 마이크의 접근 허용 팝업 창이 나옵니다.
                        해당 팝업 창에서 [허용] 을 선택하시기 바랍니다.
                    </span>
                </div>
                <div className="GuideAllowBox">
                    <span className="GuideAllowTitle">
                        [카메라, 마이크 권한 허용 안내]
                    </span>
                    <div className="GuideImageBox">
                        <img src={Sample1} />
                    </div>
                </div>
                <div className="GuideAllowBox">
                    <span className="GuideAllowTitle">
                        [올바른 촬영 방법]
                    </span>
                    <div className="GuideImageBox">
                        <img src={Sample2} />
                    </div>
                    <span className="GuideAllowText">
                        거치대나 물건 등을 사용하여 최소 1m 정도 떨어진 곳에 휴대폰을 고정시킵니다. 
                    </span>
                    <div className="GuideImageBox">
                        <img src={Sample3} />
                    </div>
                    <span className="GuideAllowText">
                        얼굴과 손, 모니터 화면이 동시에 나오도록 카메라 화면을 조정하세요.
                    </span>
                </div>
                <div>
                    <HashRouter>
                    <Link to="/Camera">
                    <button className="GuideButton">촬영 시작</button>
                    </Link>
                    </HashRouter>
                </div>
            </div>
        </div>
    )
}

export default Guide;