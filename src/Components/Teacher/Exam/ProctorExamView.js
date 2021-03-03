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
  const [particStdList, setParticStdList] = useState([]);
  const [particStdFlag, setParticStdFlag] = useState(false);
  const [tempParticStdList, setTempParticStdList] = useState([]);
  const [volumeMeterValue, setVolumeMeterValue] = useState(0);
  const [eyetrackingValue, setEyetrackingValue] = useState(0);
  const [highlightStateVoice, setHighlightStateVoice] = useState(false);
  const [highlightStateEye, setHighlightStateEye] = useState(false);
  const [currentStdNumber, setCurrentStdNumber] = useState(0);

  const socket = socketio.connect("http://3.89.30.234:3001");
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
    socket.emit("create", {
      t_email: cookies.t_email,
      test_id: TestCodeParams.testId,
    });

    console.log("방 개설 시작중");

    socket.emit("join", {
      t_email: cookies.t_email,
      test_id: Number(TestCodeParams.testId),
    });

    console.log(cookies.t_email);
    console.log(TestCodeParams.testId);
    socket.on("student_join", (msg) => {
      const ddd = () => {
        particStdFlag === true && setParticStdFlag(false);
        console.log("asdasdasdasdasd");
        console.log(msg);

        const vvv = particStdList.filter((v) => v.s_number === msg.s_number);
        Object.keys(vvv).length === 0
          ? particStdList.push(msg)
          : console.log("중복된 학생입니다.");
        
        console.log("들어온 학생 목록 : " + particStdList);

        console.log(particStdList);
        Object.keys(msg).length !== 0 && setParticStdFlag(true);

        //socket.off("student_join", msg);
      };
      msg !== null && ddd();
    });

    socket.on("volumeMeter", function (res) {
      console.log("volumeMeter : ", res);

      console.log(res);
      setVolumeMeterValue(res);
      const bbb = particStdList.find((v) => v.s_number === res.s_number);

      bbb.mic_caution = res.mic_caution;
      setParticStdList([
        ...particStdList.filter((v) => v.s_number !== res.s_number),
        bbb,
      ]);
      setCurrentStdNumber(res.s_number);
      setHighlightStateVoice(true);
      setTimeout(() => {
        setHighlightStateVoice(false);
      }, 3000);

      //socket.off("volumeMeter", res);
    });
    socket.on("eyetrackingcount", (msg) => {
      console.log(msg);
      setEyetrackingValue(msg);
      const aaa = particStdList.find((v) => v.s_number === msg.s_number);
      console.log(msg.s_number);

      aaa.eye_caution = msg.eye_caution;

      setParticStdList([
        ...particStdList.filter((v) => v.s_number !== msg.s_number),
        aaa,
      ]);

      setCurrentStdNumber(msg.s_number);
      setHighlightStateEye(true);
      setTimeout(() => {
        setHighlightStateEye(false);
      }, 3000);

      //socket.off("eyetrackingcount", msg);
    });
  }, []);

  useEffect(() => {
    console.log(particStdList);
  }, []);

  const SocketRoomOut = () => { 
    socket.emit("m_room_out", {
        test_id: Number(TestCodeParams.testId),
    });
    console.log("Room Out");
  }

  return (
    <div className="proctor_exam_container">
      <div className="side_list_area">
        <p className="tit">
          학생 목록
          <div>
            <span>{particStdFlag && particStdList.length}</span>/30
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
              SocketRoomOut();
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
            highlightStateVoice={highlightStateVoice}
            highlightStateEye={highlightStateEye}
            currentStdNumber={currentStdNumber}
          />
        </div>
      </div>
    </div>
  );
};

export default ProctorExamView;