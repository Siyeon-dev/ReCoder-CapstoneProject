import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
import * as janus from "../../../modules/examPromoter";
import ProctorExamVideo from "./ProctorExamVideo";
import socketio from "socket.io-client";

const ProctorExamView = () => {
  const TestCodeParams = useParams();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [stdDataCookies, setStdDataCookies] = useState([]);

  useEffect(() => {
    janus.runJanusTeacher();
    
    console.log(cookies.std_data);
    cookies.std_data !== undefined && setStdDataCookies(...cookies.std_data);
    console.log(stdDataCookies);
  }, [cookies.std_data]);

  janus.runJanusTeacher();

  const socket = socketio.connect("http://3.89.30.234:3001");
  const ClassListSocket = () => {
    console.log("실행됨");
    console.log("선생님 보냄");
    console.log(TestCodeParams.testId);

    TestCodeParams.testId !== undefined &&
      socket.emit("m_room_out", {
        test_id: Number(TestCodeParams.testId),
      });
    // 구슬 상 ON 출력이 안되는 이유가 현 ClassListSocket 메소드가 버튼 클릭시 실행 되는 걸로 감싸져 있어서 그런거 같아요 ㅠ_ㅠ
  };

  // 형탁상 eye-tracking 부정행위시 넘어 오는 데이터
  socket.on("eyetrackingcount", (msg) => {
    console.log("자알받았습니다요~~`");
    console.log(msg);
  });

  return (
    <div className="proctor_exam_container">
      <div className="side_list_area">
        <p className="tit">
          학생 목록
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
          <Link
            to={`/teacher`}
            onClick={() => {
              ClassListSocket();
              removeCookie("std_data");
              setStdDataCookies([]);
            }}
          >
            나가기
          </Link>
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
          <ProctorExamVideo stdDataCookies={stdDataCookies} />
        </div>
      </div>
    </div>
  );
};

export default ProctorExamView;
