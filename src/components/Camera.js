import React, { useEffect, useState } from 'react';

import Header from './Header';
import '../css.css';
import Video from '../media/sample_v_1.mp4';

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

function Camera() {
    let [isVisible, changeVisible] = useState([false]);

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
                {isVisible ?  null : <Test />}
                <button className="TestButton" onClick={() => janus.runJanusMobile()}>
                    임시 허용 버튼
                </button>
                <div className="VideoBox">
                <video
				    className="rounded centered"
				    id="myvideo"
				    width="300px"
				    height="300px"
				    autoPlay
				    playsInline
				    muted="muted"
			    />
                </div>
            </div>
        </div>
    );
}

export default Camera;