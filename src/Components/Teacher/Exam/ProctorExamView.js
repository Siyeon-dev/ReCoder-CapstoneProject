import React from "react";
import * as janus from "../../../modules/examPromoter";

const ProctorExamView = () => {
  janus.runJanusTeacher();
  return (
    <div className="proctor_exam_container">
      <div className="side_list_area">
        <p className="tit">
          학생 목록{" "}
          <div>
            <span>6</span>/30
          </div>
        </p>
        <ul>
          <li>
            이구슬 <span>마이크 on</span>
          </li>
          <li>
            박시연 <span>마이크 on</span>
          </li>
          <li>
            손형탁 <span>마이크 on</span>
          </li>
          <li>
            김원형 <span>마이크 on</span>
          </li>
        </ul>
        <div className="btn_wrap">
          <div>경고주기</div>
        </div>
      </div>
      <div className="video_area">
        <div className="tit_area">
          <p>2020학년도 1학기 중간고사</p>
          <ul className="status_desc">
            <li className="voice">음성 포커싱</li>
            <li className="cheating">부정행위경고</li>
          </ul>
        </div>
        <div className="video_area_align">
          <div className="std_video_set">
            <div className="monitor_view">
              <video
                id="remote1"
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
                id="remote2"
                width="219"
                height="170"
                autoPlay="autoplay"
                muted="muted"
                loop="loop"
              >
                해당 브라우저는 video 태그를 지원하지 않습니다.
              </video>
              <video
                id="remote3"
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
        </div>
      </div>
    </div>
  );
};

export default ProctorExamView;
