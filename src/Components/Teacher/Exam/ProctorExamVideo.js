import React, { useState } from "react";
import { useCookies } from "react-cookie";

const ProctorExamVideo = ({ stdDataCookies }) => {
  console.log(stdDataCookies);
  return (
    stdDataCookies.length !== 0 &&
    stdDataCookies.map((v) => (
      <div className="std_video_set">
        <div className="monitor_view">
          <video
            id={"remote" + Number(v + 1)}
            width="440"
            height="200"
            autoPlay="autoplay"
            muted="muted"
            loop="loop"
          >
            해당 브라우저는 video 태그를 지원하지 않습니다.
          </video>
        </div>
        <div className="web_mobile_cam">
          <video
            id={"remote" + v}
            width="219"
            height="170"
            autoPlay="autoplay"
            muted="muted"
            loop="loop"
          >
            해당 브라우저는 video 태그를 지원하지 않습니다.
          </video>
          <video
            id={"remote" + Number(v + 2)}
            width="219"
            height="170"
            autoPlay="autoplay"
            muted="muted"
            loop="loop"
          >
            해당 브라우저는 video 태그를 지원하지 않습니다.
          </video>
        </div>
      </div>
    ))
  );
};

export default ProctorExamVideo;
