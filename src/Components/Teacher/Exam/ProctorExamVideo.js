import React, { useState } from "react";
import { useCookies } from "react-cookie";

const ProctorExamVideo = ({ particStdFlag, particStdList }) => {
  console.log(particStdList);
  return particStdFlag ? (
    particStdList.map((v) => (
      <div className="std_video_area">
        <div className="std_test_info">
          <p>{v.s_name}</p>
          <ul>
            <li>경고 {v.eye_caution}회</li>
            <li>음성 {v.mic_caution}회</li>
          </ul>
        </div>
        <div className="std_warning_area" id="test_warning_state"></div>
        <div className="std_video_set">
          <div className="monitor_view">
            <video
              id={"remote" + Number(v.s_number + 1)}
              width="441"
              height="248"
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
              width="219"
              height="164"
              autoPlay="autoplay"
              muted="muted"
              loop="loop"
            >
              해당 브라우저는 video 태그를 지원하지 않습니다.
            </video>
            <video
              id={"remote" + Number(v.s_number + 2)}
              width="219"
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