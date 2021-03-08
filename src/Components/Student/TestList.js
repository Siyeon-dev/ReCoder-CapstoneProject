import axios from "axios";
import Loading from "Components/User/Loading";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
import socketio from "socket.io-client";
import moment from "moment";
import "moment/locale/en-au";

const TestList = ({
  selectClassTestInfo,
  noClassCodeFlag,
  apiLoadingFlag,
  emptyArrayCheckFlag,
}) => {
  const nowTime = moment().format("YYYY-MM-DD A HH:mm");
  const [cookies, setCookie, removeCookie] = useCookies();
  let buttonStatus = null;
  let testStart = null;
  let testEnd = null;

  console.log(noClassCodeFlag);

  const StateInsertData = (startData, endData, testId) => {
    console.log(startData, endData);

    const data = {
      test_id: String(testId),
      s_email: cookies.s_email,
      test_start_time: "2021-03-01",
      test_end_time: "2021-03-01",
    };

    console.log(data);

    data &&
      axios
        .post("/stateinsert", data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const StdTestInfoList = () => {
    return Object.keys(selectClassTestInfo).length !== 0 ? (
      selectClassTestInfo.map((v) => (
        <div className="my_test_box">
          <p className="test_name">{v.test_name}</p>
          <p className="question">{v.questioncount}문항</p>
          <p className="infobox date">{v.date}</p>
          <p className="infobox time">
            {v.test_start} ~ {v.test_end}
          </p>
          {
            ((testStart = v.date + " " + v.test_start),
            (testEnd = v.date + " " + v.test_end),
            (buttonStatus = compareTime(nowTime, testStart, testEnd)),
            console.log("testStart : ", testStart),
            console.log("testEnd : ", testEnd),
            console.log("nowTime : ", nowTime),
            console.log(buttonStatus),
            buttonStatus === 0 ? (
              <Link
                to={`/testprecautions/${v.test_id}/${v.test_name}`}
                className="test_btn yellow"
                onClick={() =>
                  StateInsertData(v.test_start, v.test_end, v.test_id)
                }
              >
                <span>시험대기</span>
              </Link>
            ) : buttonStatus === 1 ? (
              <Link
                to={`/testprecautions/${v.test_id}/${v.test_name}`}
                className="test_btn mint"
                onClick={() =>
                  StateInsertData(v.test_start, v.test_end, v.test_id)
                }
              >
                <span>시험응시</span>
              </Link>
            ) : buttonStatus === 2 ? (
              <Link
                to={`/testprecautions/${v.test_id}/${v.test_name}`}
                className="test_btn red"
                onClick={() =>
                  StateInsertData(v.test_start, v.test_end, v.test_id)
                }
              >
                <span>시험종료</span>
              </Link>
            ) : buttonStatus === 3 ? (
              <Link
                to={`/testprecautions/${v.test_id}/${v.test_name}`}
                className="test_btn puple"
              >
                결과보기
                <div className="score">
                  80 / <span>100</span>
                </div>
              </Link>
            ) : null)
          }
        </div>
      ))
    ) : emptyArrayCheckFlag === false ? ( // 클래스가 있을 때
      apiLoadingFlag === true ? ( // 데이터를 받아왔을 때
        <div className="no_create_guide member">
          클래스 가입 요청중입니다.
          <span>선생님이 확인 후 가입 승인을 진행됩니다.</span>
        </div>
      ) : (
        <Loading />
      )
    ) : (
      <div className="no_create_guide std_no_test">
        현재 클래스에 생성된 클래스가 없습니다.
        <span>클래스가 생성되면 리스트가 업데이트 됩니다.</span>
      </div>
    );
  };

  return <>{StdTestInfoList()}</>;
};

const compareTime = (nowTime, comTimeStart, comTimeEnd) => {
  if (nowTime < comTimeStart) {
    // 시험 대기
    return 0;
  } else {
    if (nowTime < comTimeEnd) {
      // 시험 응시
      return 1;
    } else {
      // 시험 종료
      return 2;
    }
  }

  return null;
};

export default TestList;
