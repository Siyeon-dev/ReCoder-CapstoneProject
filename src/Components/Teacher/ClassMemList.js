import React, { useEffect, useState } from "react";
import StdClassJoinApp from "Components/Modal/StdClassJoinApp";
import axios from "axios";
import Loading from "Components/User/Loading";
import CodeClipboardCopy from "./CodeClipboardCopy";

const ClassMemList = ({ classCode }) => {
  const [appllyStdList, setAppllyStdList] = useState([]);
  const [appStdNum, setAppStdNum] = useState(0);
  const [apiFlag, setApiFlag] = useState(false);

  const appllyStdListApi = () => {
    apiFlag === true && setApiFlag(false);
    const data = {
      class_code: classCode,
    };

    classCode &&
      axios
        .post("/usermanagement", data)
        .then((res) => {
          setAppllyStdList(res.data);
          setApiFlag(true);
          setAppStdNum(setAppllyStdList.length);
        })

        .catch((err) => {
          console.log(err);
        });
  };

  useEffect(() => {
    appllyStdListApi();
  }, [classCode]);

  const AppllyStdList = (appllyStdList) => {
    return apiFlag === true ? (
      appllyStdList.length !== 0 ? (
        appllyStdList.map(
          (v, index) =>
            v.recognize === 1 && (
              <div className="mem_check_box">
                <input type="checkbox" id={index} name="전체동의" />
                <label for={index}>
                  <span>{v.s_email.split("@")[0]}</span>
                  {v.s_name}
                </label>
              </div>
            )
        )
      ) : (
        <div className="no_create_guide member">
          가입된 회원이 없습니다.
          <span>초대코드로 클래스에 초대할 수 있습니다.</span>
          <CodeClipboardCopy classCode={classCode} />
        </div>
      )
    ) : (
      <Loading />
    );
  };

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
        <div className="all_member">{AppllyStdList(appllyStdList)}</div>
      </div>
    </>
  );
};

export default ClassMemList;