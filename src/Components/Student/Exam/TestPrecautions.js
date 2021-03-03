import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import socketio from 'socket.io-client';
import { useCookies } from 'react-cookie';

import * as janus from '../../../modules/examCandidatePC'
import * as VolumeMeter from "../../../modules/anti-cheat/volumeMeter"


const TestPrecautions = () => {
  const TestCodeParams = useParams();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [cautionData, setCautionData] = useState([]);
  const [studentNumber, setStudentNumber] = useState([]);

  const data = {
    test_id: TestCodeParams.testId,
    s_email: cookies.s_email,
  };
  console.log(data);
  const CautionDataApi = () => {
    axios
      .post("/cautionpage", data)
      .then((res) => {
        console.log("s_number : ", res.data[0].s_number);
        setStudentNumber(res.data[0].s_number)
        setCautionData(res.data);
        res.data && janus.runJanusPC(res.data[0].s_number); // 0 => s_num
        res.data && console.log(res.data.s_number);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    CautionDataApi();
  }, []);

  const PrecautionTextAreaHtml = () => {
    let codes = cautionData && cautionData[0].test_caution;
    return <div dangerouslySetInnerHTML={{ __html: codes }}></div>;
  };

  return (
    cautionData.length !== 0 && (
      <div id="test_warning_container">
        <div className="wrap">
          <div className="std_test_info">
            <ul>
              {/* <li>
                대기인원 :
                <div className="eng">
                  <span>10</span>/30
                </div>
              </li> */}
              <li className="time">03:50</li>
              <li className="start_test_btn">
                <Link
                  to={`/testscreen/${TestCodeParams.testId}`}
                  onClick={() => {
                    // volumeMeter 매소드 호출
                    VolumeMeter.getVolumeMeter(
                      TestCodeParams.testId,
                      studentNumber
                    );

                    // 화면 전환 시 강제 리다이랙션
                    // window.onblur = function() {
                    //   console.log('화면 전환 발생');
                    //   alert('시험 도중 화면 전환을 시도하셨습니다.\n 시험 대기실로 강제 이동됩니다.');

                    //   /* 리다이랙션 로직 */
                    //   redirect("/student");
                    // }

                    // Keyboard Event 'alt" 막기
                    // window.addEventListener("keydown", function(event) {
                    //   let handled = false;

                    //   if (event.defaultPrevented) {
                    //       return;
                    //   }

                    //   if (event.altKey)
                    //       handled = true;

                    //   if(handled) {
                    //       console.log(event.keyCode);
                    //       event.preventDefault();
                    //   }
                    // }, true);

                    document.documentElement.webkitRequestFullscreen();
                  }}
                >
                  시험시작
                </Link>
              </li>
            </ul>
            <p className="test_tit">
              {cautionData[0].test_name}{" "}
              <span>Number : {TestCodeParams.testId}</span>
            </p>
            <p className="test_date">
              {cautionData[0].test_start} ~ {cautionData[0].test_end}
            </p>
          </div>
          <ul className="std_test_info_tab">
            <li>문항수</li>
            <li>{cautionData[0].questioncount}문항</li>
            <li>점수</li>
            <li>{cautionData[0].total_score}점 만점</li>
            <li>제한시간</li>
            <li>{cautionData[0].time_diff}분</li>
          </ul>
          <div className="std_test_txt">
            <div className="txt_area">
              <p className="tit">시험 시 주의사항</p>
              {PrecautionTextAreaHtml()}
            </div>
          </div>
          <div className="std_video_view">
            {/*
            src : 비디오 파일의 주소
            controls : 컨트롤러 표시
            autoplay : 자동 재생
            loop : 반복 재생
            width : 영상의 가로길이
            height : 영상의 세로길이
            muted : 음소거
            */}
            <div className="view_area">
              <video
                id="myvideo"
                width="300px"
                height="200px"
                autoPlay
                playsInline
                muted="muted"
              >
                해당 브라우저는 video 태그를 지원하지 않습니다.
              </video>
            </div>
            <div className="view_area">
              <video
                id="myVideoScreen"
                width="300px"
                height="200px"
                autoPlay
                playsInline
                muted="muted"
              >
                해당 브라우저는 video 태그를 지원하지 않습니다.
              </video>
            </div>
            <div className="view_area">
              <video
                id="myVideoMobile"
                width="300px"
                height="200px"
                autoPlay
                playsInline
                muted="muted"
              >
                해당 브라우저는 video 태그를 지원하지 않습니다.
              </video>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default TestPrecautions;
