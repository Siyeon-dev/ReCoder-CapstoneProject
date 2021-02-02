import React, { useEffect, useState } from "react";
import StdClassJoinApp from "Components/Modal/StdClassJoinApp";
import axios from "axios";

const ClassMemList = () => {
  const [appllyStdList, setAppllyStdList] = useState([]);

  const classCode = {
    class_code: 805760,
    // classinfo API 완료 후 작업
  };

  const appllyStdListApi = () => {
    axios
      .post("usermanagement", classCode)
      .then((res) => {
        setAppllyStdList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    appllyStdListApi();
  }, []);

  console.log(appllyStdList);
  return (
    <>
      <div className="cont_top_btn">
        <StdClassJoinApp appllyStdList={appllyStdList} />
        <button>학생삭제</button>
      </div>
      <div className="class_member_list">
        <div className="all_member">
          <div className="mem_check_box">
            <input type="checkbox" id="a1" name="전체동의" />
            <label for="a1">
              <span>rntmf1247</span>이구슬
            </label>
          </div>
          <div className="mem_check_box">
            <input type="checkbox" id="a2" name="전체동의" />
            <label for="a2">
              <span>rntmf1247</span>이구슬
            </label>
          </div>
          <div className="mem_check_box">
            <input type="checkbox" id="a3" name="전체동의" />
            <label for="a3">
              <span>rntmf1247</span>이구슬
            </label>
          </div>
          <div className="mem_check_box">
            <input type="checkbox" id="a4" name="전체동의" />
            <label for="a4">
              <span>rntmf1247</span>이구슬
            </label>
          </div>
          <div className="mem_check_box">
            <input type="checkbox" id="a5" name="전체동의" />
            <label for="a5">
              <span>rntmf1247</span>이구슬
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassMemList;
