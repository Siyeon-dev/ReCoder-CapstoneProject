import React, { useState } from "react";
import { useCookies } from "react-cookie";

const ProctorExamVideo = ({ particStdFlag, particStdList }) => {
  console.log(particStdList);
  return particStdList.length !== 0 && particStdFlag ? (
    particStdList.map((v) => (
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
    ))
  ) : (
    <p>접속중</p>
  );
};

export default ProctorExamVideo;