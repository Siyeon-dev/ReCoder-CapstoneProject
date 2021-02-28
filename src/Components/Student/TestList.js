import axios from "axios";
import Loading from "Components/User/Loading";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import socketio from "socket.io-client";

const TestList = ({ selectClassTestInfo }) => {

  console.log(selectClassTestInfo);

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
    ) : (
      <p>가입 승인중입니다.</p>
    );
  };

  return <>{StdTestInfoList()}</>;
};

export default TestList;