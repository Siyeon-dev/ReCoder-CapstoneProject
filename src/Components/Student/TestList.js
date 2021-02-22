import axios from "axios";
import Loading from "Components/User/Loading";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const TestList = (classCode) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [stdClassTestInfo, setStdClassTestInfo] = useState([]);

  console.log(classCode);

  const MenuSelect = (e) => {
    const data = {
      s_email: cookies.s_email,
      class_code: e,
    };

    console.log(data);

    axios
      .post("/classinfo", data)
      .then((res) => {
        setStdClassTestInfo(res.data);
        console.log(stdClassTestInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    classCode.classCode !== "" && MenuSelect(classCode.classCode);
  }, [classCode]);


  const StdTestInfoList = (stdClassTestInfo) => {
      
    return (
      !stdClassTestInfo.hasOwnProperty("mes") &&
      stdClassTestInfo &&
      stdClassTestInfo.map((v) => (
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
    );
  };

  return (
    <>
      {stdClassTestInfo ? (
        <>
          {StdTestInfoList(stdClassTestInfo)}
          <p id="result_test_area"></p>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default TestList;
