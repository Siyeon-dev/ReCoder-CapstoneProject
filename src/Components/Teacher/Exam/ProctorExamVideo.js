import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import * as Janus from "../../../modules/examPromoter"

var streamArr = null;

const ProctorExamVideo = ({
  particStdFlag,
  particStdList,
  highlightStateVoice,
  highlightStateEye,
  currentStdNumber,
}) => {
  useEffect(() => {
    console.log(particStdList)
    streamArr = new Set(Janus.streamObjs)  
    console.log(streamArr);
    console.log("streamObj dis: " + Janus.streamObjs[0]['objDisplay']);
    console.log("streamObj str: " + Janus.streamObjs[0]['objStream']);
  })

  return Object.keys(particStdList).length !== 0 ? (
    particStdList.map((v) => (
      <div className="std_video_area">
        <div className="std_test_info">
          <p>{v.s_name}</p>
          <ul>
            <li>경고 {v.eye_caution}회</li>
            <li>음성 {v.mic_caution}회</li>
          </ul>
        </div>
        <div
          className={`std_warning_area${
            currentStdNumber === v.s_number && highlightStateVoice
              ? " voice"
              : ""
          }`}
        ></div>
        <div
          className={`std_warning_area${
            currentStdNumber === v.s_number && highlightStateEye ? " eye" : ""
          }`}
        ></div>
        <div className="std_video_set">
          <div className="monitor_view">
            <video
              srcObject={Janus.streamObjs[0]['objDisplay'] === String(v.s_number + 1) &&  Janus.streamObjs[0]['objStream']}
              id={"remote" + Number(v.s_number + 1)}
              width="210"
              height="238"
              autoPlay="autoplay"
              muted="muted"
              loop="loop"
              border-radius="20px"
            >
              해당 브라우저는 video 태그를 지원하지 않습니다.
            </video>
          </div>
          <div className="web_mobile_cam">
            <video
              id={"remote" + v.s_number}
              width="209"
              height="164"
              autoPlay="autoplay"
              muted="muted"
              loop="loop"
            >
              해당 브라우저는 video 태그를 지원하지 않습니다.
            </video>
            <video
              id={"remote" + Number(v.s_number + 2)}
              width="209"
              height="164"
              autoPlay="autoplay"
              muted="muted"
              loop="loop"
            >
              해당 브라우저는 video 태그를 지원하지 않습니다.
            </video>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p>접속중</p>
  );
};

export default ProctorExamVideo;