import React from 'react'
import * as janus from '../../../modules/examPromoter'


const ProctorExamView = () => {
  janus.runJanusTeacher();
    return (
      <div className="proctor_exam_container">
        {/* <div className="side_list_area">

            </div> */}
        <div className="video_area">
          <div className="tit_area">
            <p>2020학년도 1학기 중간고사</p>
            <ul className="status_desc">
              <li>음성 포커싱</li>
              <li>부정행위경고</li>
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
            {/* <div className="std_video_set">
              <div className="monitor_view">
                <video
                  src="../video/Sunrise_28975.mp4"
                  width="440"
                  autoplay="autoplay"
                  muted="muted"
                  loop="loop"
                >
                  해당 브라우저는 video 태그를 지원하지 않습니다.
                </video>
              </div>
              <div className="web_mobile_cam">
                <video
                  src="../video/Sunrise_28975.mp4"
                  width="219"
                  autoplay="autoplay"
                  muted="muted"
                  loop="loop"
                >
                  해당 브라우저는 video 태그를 지원하지 않습니다.
                </video>
                <video
                  src="../video/Sunrise_28975.mp4"
                  width="219"
                  autoplay="autoplay"
                  muted="muted"
                  loop="loop"
                >
                  해당 브라우저는 video 태그를 지원하지 않습니다.
                </video>
              </div>
            </div>
            <div className="std_video_set">
              <div className="monitor_view">
                <video
                  src="../video/Sunrise_28975.mp4"
                  width="440"
                  autoplay="autoplay"
                  muted="muted"
                  loop="loop"
                >
                  해당 브라우저는 video 태그를 지원하지 않습니다.
                </video>
              </div>
              <div className="web_mobile_cam">
                <video
                  src="../video/Sunrise_28975.mp4"
                  width="219"
                  autoplay="autoplay"
                  muted="muted"
                  loop="loop"
                >
                  해당 브라우저는 video 태그를 지원하지 않습니다.
                </video>
                <video
                  src="../video/Sunrise_28975.mp4"
                  width="219"
                  autoplay="autoplay"
                  muted="muted"
                  loop="loop"
                >
                  해당 브라우저는 video 태그를 지원하지 않습니다.
                </video>
              </div>
            </div>
            <div className="std_video_set">
              <div className="monitor_view">
                <video
                  src="../video/Sunrise_28975.mp4"
                  width="440"
                  autoplay="autoplay"
                  muted="muted"
                  loop="loop"
                >
                  해당 브라우저는 video 태그를 지원하지 않습니다.
                </video>
              </div>
              <div className="web_mobile_cam">
                <video
                  src="../video/Sunrise_28975.mp4"
                  width="219"
                  autoplay="autoplay"
                  muted="muted"
                  loop="loop"
                >
                  해당 브라우저는 video 태그를 지원하지 않습니다.
                </video>
                <video
                  src="../video/Sunrise_28975.mp4"
                  width="219"
                  autoplay="autoplay"
                  muted="muted"
                  loop="loop"
                >
                  해당 브라우저는 video 태그를 지원하지 않습니다.
                </video>
              </div>
            </div>
            <div className="std_video_set">
              <div className="monitor_view">
                <video
                  src="../video/Sunrise_28975.mp4"
                  width="440"
                  autoplay="autoplay"
                  muted="muted"
                  loop="loop"
                >
                  해당 브라우저는 video 태그를 지원하지 않습니다.
                </video>
              </div>
              <div className="web_mobile_cam">
                <video
                  src="../video/Sunrise_28975.mp4"
                  width="219"
                  autoplay="autoplay"
                  muted="muted"
                  loop="loop"
                >
                  해당 브라우저는 video 태그를 지원하지 않습니다.
                </video>
                <video
                  src="../video/Sunrise_28975.mp4"
                  width="219"
                  autoplay="autoplay"
                  muted="muted"
                  loop="loop"
                >
                  해당 브라우저는 video 태그를 지원하지 않습니다.
                </video>
              </div>
            </div>
            <div className="std_video_set">
              <div className="monitor_view">
                <video
                  src="../video/Sunrise_28975.mp4"
                  width="440"
                  autoplay="autoplay"
                  muted="muted"
                  loop="loop"
                >
                  해당 브라우저는 video 태그를 지원하지 않습니다.
                </video>
              </div>
              <div className="web_mobile_cam">
                <video
                  src="../video/Sunrise_28975.mp4"
                  width="219"
                  autoplay="autoplay"
                  muted="muted"
                  loop="loop"
                >
                  해당 브라우저는 video 태그를 지원하지 않습니다.
                </video>
                <video
                  src="../video/Sunrise_28975.mp4"
                  width="219"
                  autoplay="autoplay"
                  muted="muted"
                  loop="loop"
                >
                  해당 브라우저는 video 태그를 지원하지 않습니다.
                </video>
              </div>
            </div>
            <div className="std_video_set">
              <div className="monitor_view">
                <video
                  src="../video/Sunrise_28975.mp4"
                  width="440"
                  autoplay="autoplay"
                  muted="muted"
                  loop="loop"
                >
                  해당 브라우저는 video 태그를 지원하지 않습니다.
                </video>
              </div>
              <div className="web_mobile_cam">
                <video
                  src="../video/Sunrise_28975.mp4"
                  width="219"
                  autoplay="autoplay"
                  muted="muted"
                  loop="loop"
                >
                  해당 브라우저는 video 태그를 지원하지 않습니다.
                </video>
                <video
                  src="../video/Sunrise_28975.mp4"
                  width="219"
                  autoplay="autoplay"
                  muted="muted"
                  loop="loop"
                >
                  해당 브라우저는 video 태그를 지원하지 않습니다.
                </video>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
}

export default ProctorExamView
