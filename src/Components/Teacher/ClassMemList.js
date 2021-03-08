import React, { useEffect, useState } from "react";
import StdClassJoinApp from "Components/Modal/StdClassJoinApp";
import axios from "axios";
import Loading from "Components/User/Loading";
import CodeClipboardCopy from "./CodeClipboardCopy";
import $ from "jquery";

const ClassMemList = ({ classCode }) => {
  const [appllyStdList, setAppllyStdList] = useState([]);
  const [deleteStdList, setDeleteStdList] = useState([]);
  const [deleteStdData, setDeleteStdData] = useState([]);
  const [appStdNum, setAppStdNum] = useState(0);
  const [apiFlag, setApiFlag] = useState(false);
  const [findMemFlag, setFindMemFlag] = useState(false);
  const [noStdList, setNoStdList] = useState([]);

  const appllyStdListApi = () => {
    apiFlag === true && setApiFlag(false);

    console.log(classCode);
    const data = {
      class_code: classCode,
    };

    classCode &&
      axios
        .post("/usermanagement", data)
        .then((res) => {
          setAppllyStdList(res.data.filter((v) => v.recognize === 1));
          setNoStdList(res.data.filter((v) => v.recognize === 0));

          // setMemRecognize([
          //   ...memRecognize,
          //   appllyStdList.find((v) => v.recognize === 0),
          // ]);
          setApiFlag(true);
          NotJoinMemberFind(res.data);
          setAppStdNum(setAppllyStdList.length);

          console.log(res.data);
        })

        .catch((err) => {
          console.log(err);
        });
  };

  const NotJoinMemberFind = (data) => {
    findMemFlag === true && setFindMemFlag(false);

    console.log(data);

    const FindMem = data.find((element) => element.recognize === 0);
    console.log(typeof FindMem);
    typeof FindMem !== "undefined"
      ? setFindMemFlag(true)
      : setFindMemFlag(false);
    console.log(findMemFlag);
  };

  useEffect(() => {
    appllyStdListApi();
    setDeleteStdList([]);
    setDeleteStdData([]);
  }, [classCode]);

  useEffect(() => {
    appllyStdListApi();
  }, [appStdNum]);

  useEffect(() => {
    appllyStdListApi();
  }, [appStdNum]);

  const DeleteStdApi = () => {
    let apiClassCpde = {
      class_code: classCode,
    };

    Object.keys(deleteStdList).length !== 0 && deleteStdData.push(apiClassCpde);
    deleteStdList.map((v) =>
      deleteStdData.push({
        s_email: v.s_email,
      })
    );

    console.log(deleteStdData);

    axios
      .post("/classuserdelete", deleteStdData)
      .then((res) => {
        console.log(res.data);

        !alert("회원 삭제가 완료되었습니다.") && appllyStdListApi();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AppllyStdList = (appllyStdList) => {
    return apiFlag === true ? (
      Object.keys(appllyStdList).length !== 0 ? (
        appllyStdList.map((v, index) => (
          <div className="mem_check_box">
            <input
              type="checkbox"
              id={index}
              name="student_box"
              onChange={(e) => {
                e.target.checked
                  ? setDeleteStdList([...deleteStdList, v])
                  : setDeleteStdList(
                      deleteStdList.filter((value) => value !== v)
                    );
              }}
            />
            <label for={index}>
              <span>{v.s_email.split("@")[0]}</span>
              {v.s_name}
            </label>
          </div>
        ))
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
        <StdClassJoinApp
          appllyStdListApi={appllyStdListApi}
          noStdList={noStdList}
          classCode={classCode}
        />
        <button onClick={() => DeleteStdApi()}>학생삭제</button>
      </div>
      <div className="class_member_list" id="reload_div">
        <div className="all_member">{AppllyStdList(appllyStdList)}</div>
      </div>
    </>
  );
};

export default ClassMemList;
