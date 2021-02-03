import React, { useEffect, useState } from "react";
import StdClassJoinApp from "Components/Modal/StdClassJoinApp";
import axios from "axios";

const ClassMemList = ( classCode ) => {
  const [appllyStdList, setAppllyStdList] = useState([]);
  const [appStdNum, setAppStdNum] = useState(0);

  const data = {
    class_code: classCode.classCode,
  };

  console.log(data);

  const appllyStdListApi = () => {
    axios
      .post("/usermanagement", data)
      .then((res) => {
        setAppllyStdList(res.data);
        setAppStdNum(setAppllyStdList.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    appllyStdListApi();
  }, []);

  console.log(appStdNum);
  return (
    <>
      <div className="cont_top_btn">
        {/* {appStdNum === 0 ? (
          <span></span>
        ) : (
          <div className="app_std_info">
            {appStdNum}개의 가입 신청이 있습니다.
          </div>
        )}  추후 수정 */}
        <StdClassJoinApp appllyStdList={appllyStdList} classCode={classCode} />
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
