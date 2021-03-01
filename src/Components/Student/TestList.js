import axios from "axios";
import Loading from "Components/User/Loading";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
import socketio from "socket.io-client";

const TestList = ({ selectClassTestInfo, noClassCodeFlag }) => {

  const StdTestInfoList = () => {
    return noClassCodeFlag && Object.keys(selectClassTestInfo).length !== 0 ? (
      selectClassTestInfo.map((v) => (
        <div className="my_test_box">
          <p className="test_name">{v.test_name}</p>
          <p className="question">{v.questioncount}문항</p>
          <p className="infobox date">{v.date}</p>
          <p className="infobox time">
            {v.test_start} ~ {v.test_end}
          </p>
          {v.s_test_status === 1 ? (
            <Link
              to={`/testprecautions/${v.test_id}`}
              className="test_btn mint"
            >
              <span>시험시작</span>
            </Link>
          ) : v.s_test_status === 2 ? (
            <Link to={`/testprecautions/${v.test_id}`} className="test_btn red">
              <span>미응시</span>
            </Link>
          ) : v.s_test_status === 3 ? (
            <Link
              to={`/testprecautions/${v.test_id}`}
              className="test_btn yellow"
            >
              <span>채점중</span>
            </Link>
          ) : v.s_test_status === 4 ? (
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

export default TestList;