import React from "react";
import { Link } from "react-router-dom";

const TestList = () => {
  return (
    <>
      <div className="my_test_box">
        <p className="test_name">2020학년도 1학기 중간고사</p>
        <p className="question">3문항</p>
        <p className="infobox date">2020-07-26</p>
        <p className="infobox time">AM 11:00 ~ AM 11:50</p>

        <Link to="" className="test_btn yellow">
          <span>채점중</span>
        </Link>
      </div>

      <div className="my_test_box">
        <p className="test_name">2020학년도 1학기 중간고사</p>
        <p className="question">3문항</p>
        <p className="infobox date">2020-07-26</p>
        <p className="infobox time">AM 11:00 ~ AM 11:50</p>

        <Link to="" className="test_btn puple">
          결과보기
          <div className="score">
            80 / <span>100</span>
          </div>
        </Link>
      </div>

      <div className="my_test_box">
        <p className="test_name">2020학년도 1학기 중간고사</p>
        <p className="question">3문항</p>
        <p className="infobox date">2020-07-26</p>
        <p className="infobox time">AM 11:00 ~ AM 11:50</p>

        <Link to="" className="test_btn mint">
          <span>시험시작</span>
        </Link>
      </div>

      <div className="my_test_box">
        <p className="test_name">2020학년도 1학기 중간고사</p>
        <p className="question">3문항</p>
        <p className="infobox date">2020-07-26</p>
        <p className="infobox time">AM 11:00 ~ AM 11:50</p>

        <Link to="" className="test_btn red">
          <span>미응시</span>
        </Link>
      </div>
    </>
  );
};

export default TestList;
