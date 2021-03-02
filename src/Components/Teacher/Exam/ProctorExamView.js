import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
import * as janus from "../../../modules/examPromoter";
import ProctorExamVideo from "./ProctorExamVideo";
import socketio from "socket.io-client";

const socket = socketio.connect("http://3.89.30.234:3001");

const ProctorExamView = () => {
  const TestCodeParams = useParams();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [stdDataCookies, setStdDataCookies] = useState([]);
  const [socketData, setSocketData] = useState(null);
  const [socketStdNumData, setsocketStdNumData] = useState([]);
  const [particStdList, setParticStdList] = useState([]);
  const [particStdFlag, setParticStdFlag] = useState(false);
  const [volumeMeterValue, setVolumeMeterValue] = useState(0);
  const [eyetrackingValue, setEyetrackingValue] = useState(0);
  // useEffect(() => {
  //   const socket = socketio.connect("http://3.89.30.234:3001");
  //   setSocketData({ socket : socket });
  // }, []);
  useEffect(() => {
    janus.runJanusTeacher();

    // console.log(cookies.std_data);
    // cookies.std_data !== undefined && setStdDataCookies(...cookies.std_data);
    // console.log(stdDataCookies);
  }, [particStdList]);

  useEffect(() => {
    const socket = socketio.connect("http://3.89.30.234:3001");

    socket.emit("create", {
      t_email: cookies.t_email,
      test_id: TestCodeParams.testId,
    });

    socket.emit("join", {
      t_email: cookies.t_email,
      test_id: Number(TestCodeParams.testId),
    });

    console.log(cookies.t_email);
    console.log(TestCodeParams.testId);
    socket.on("student_join", (msg) => {
      const ddd = () => {
        particStdFlag === true && setParticStdFlag(false);
        setParticStdFlag(true);
        console.log("asdasdasdasdasd");
        console.log(msg);
        socketStdNumData.push(msg.s_number);
        setCookie("std_data", [socketStdNumData]);
        particStdList.push(msg);
      };

      // console.log(particStdList);
      // console.log(msg);

      msg !== null && ddd();
    });

    socket.on("volumeMeter", function (res) {
      console.log("volumeMeter : ", res);
    });
    socket.on("eyetrackingcount", (msg) => {
      console.log(msg);
      setEyetrackingValue(msg);
      const aaa = particStdList.filter(
        (v) => v.s_number === msg.s_number
      );
      console.log("****************************");
      console.log(aaa);

      aaa[0].eye_caution = msg.eye_caution;
      console.log("****************************");
      console.log(aaa);
    });
  });

  useEffect(() => {
    console.log(particStdList);
  }, []);

  const ClassListSocket = () => {
    console.log("실행됨");
    console.log("선생님 보냄");
    console.log(TestCodeParams.testId);

    //   TestCodeParams.testId !== undefined &&
    //     socket.emit("m_room_out", {
    //       test_id: Number(TestCodeParams.testId),
    //     });
    //   // 구슬 상 ON 출력이 안되는 이유가 현 ClassListSocket 메소드가 버튼 클릭시 실행 되는 걸로 감싸져 있어서 그런거 같아요 ㅠ_ㅠ
  };

  return (
    <div className="proctor_exam_container">
      <div className="side_list_area">
        <p className="tit">
          학생 목록
          <div>
            <span>{particStdFlag && stdDataCookies.length}</span>/30
          </div>
        </p>
        <ul>
          {particStdFlag && particStdList.map((v) => <li>{v.s_name}</li>)}
        </ul>
        <div className="btn_wrap">
          <div>경고주기</div>
          <Link
            to={`/teacher`}
            onClick={() => {
              //ClassListSocket();
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
          <ProctorExamVideo
            particStdFlag={particStdFlag}
            particStdList={particStdList}
          />
        </div>
      </div>
    </div>
  );
};

export default ProctorExamView;
