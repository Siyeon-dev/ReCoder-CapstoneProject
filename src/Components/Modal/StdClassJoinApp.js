import React, { useEffect, useState } from "react";
import useModal from "./useModal";
import axios from "axios";

const ClassJoinStdList = ({
  appllyStdListApi,
  noStdList,
  classCode,
  setIsOpen,
}) => {
  const [stdList, setStdList] = useState([]);
  const [stdData, setstdData] = useState([]);

  const appllyStdListSubmit = () => {
    classCode &&
      stdList.map((v) =>
        stdData.push({ class_code: classCode, s_email: v.s_email })
      );

    console.log(stdData);

    axios
      .post("/classrecognize", stdData)
      .then((res) => {
        console.log(res.data);
        appllyStdListApi();
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => setIsOpen(false), () => appllyStdListApi);
  };

  useEffect(() => {
    setStdList([]);
    setstdData([]);
  }, [classCode]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        appllyStdListSubmit();
      }}
    >
      <div className="class_list_area">
        {noStdList.length === 0 ? (
          <p className="no_class_list">加入を申し込んだ学生はいません。</p>
        ) : (
          noStdList.map((v, index) => (
            <div className="class_list_check">
              <input
                type="checkbox"
                id={`stdLikt-${index}`}
                name={v.s_email}
                onChange={(e) => {
                  e.target.checked
                    ? setStdList([...stdList, v])
                    : setStdList(stdList.filter((value) => value !== v));
                }}
              />
              <label for={`stdLikt-${index}`}>
                {v.s_name}
                <span className="std_email">{v.s_email}</span>
              </label>
            </div>
          ))
        )}
      </div>
      <button type="submit">加入承認</button>
    </form>
  );
};

const StdClassJoinApp = ({ noStdList, classCode, appllyStdListApi }) => {
  const [isOpen, setIsOpen, Modal] = useModal();

  // classinfo API 완료 후 클래스 회원 가입 승인 작업
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        申し込んだ学生承認
      </button>
      <Modal>
        <div className="modal std_class_app">
          <div className="modal_area">
            <div className="modal_head">
              <p className="tit">クラスに申し込んだ学生承認</p>
              <p className="txt">
                加入を申し込んだ学生の確認と承認をすることができます。
              </p>
            </div>
            <ClassJoinStdList
              appllyStdListApi={appllyStdListApi}
              noStdList={noStdList}
              classCode={classCode}
              setIsOpen={setIsOpen}
            />
            <button onClick={() => setIsOpen(false)} className="modal_close">
              <img src="/img/modal_close.gif" alt="Modal Close" />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default StdClassJoinApp;
