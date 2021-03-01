import axios from "axios";
import Loading from "Components/User/Loading";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import socketio from "socket.io-client";
import moment from "moment"
import "moment/locale/en-au"

const TestList = ({ selectClassTestInfo, noClassCodeFlag }) => {
  const nowTime = moment().format('YYYY-MM-DD A HH:mm');
  let buttonStatus = null;
  let testStart = null;
  let testEnd = null;

  console.log(noClassCodeFlag);

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
          testStart = v.date + " " + v.test_start,
          testEnd = v.date + " " + v.test_end,
          buttonStatus = compareTime(nowTime,testStart, testEnd),

          console.log("testStart : ",testStart),
          console.log("testEnd : ",testEnd),
          console.log("nowTime : ", nowTime),
          console.log(buttonStatus),

          buttonStatus === 0 ? (
            <Link
              to={`/testprecautions/${v.test_id}`}
              className="test_btn yellow"
            >
              <span>시험대기</span>
            </Link>
          ) : buttonStatus === 1 ? (
            <Link to={`/testprecautions/${v.test_id}`} className="test_btn mint">
              <span>시험응시</span>
            </Link>
          ) : buttonStatus === 2 ? (
            <Link
              to={`/testprecautions/${v.test_id}`}
              className="test_btn red"
            >
              <span>시험종료</span>
            </Link>
          ) : buttonStatus === 3 ? (
            <Link
              to={`/testprecautions/${v.test_id}`}
              className="test_btn puple"
            >
              결과보기
              <div className="score">
                80 / <span>100</span>
              </div>
            </Link>
          ) : null}
        </div>
      ))
    ) : noClassCodeFlag ? (
      <div className="no_create_guide class">
        <p className="mb10">먼저 클래스에 가입해보세요!</p>
        <span>
          클래스 초대코드를 받아
          <img
            src="/img/first_class_plus.gif"
            alt="메뉴 클래스 추가 버튼 아이콘"
          />
          버튼을 누르면
          <br />
          클래스 가입을 신청 할 수 있습니다.
        </span>
      </div>
    ) : (
      <div className="no_create_guide member">
        클래스 가입 요청중입니다.
        <span>선생님이 확인 후 가입 승인을 진행됩니다.</span>
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
}

export default TestList;