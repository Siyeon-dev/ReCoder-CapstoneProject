import React, { useEffect, useState } from 'react'
import useModal from "./useModal";
import axios from "axios";

  const ClassJoinStdList = ({ appllyStdList, classCode, setIsOpen }) => {
    const [stdList, setStdList] = useState([]);
    const [stdData, setstdData] = useState([]);

    const appllyStdListSubmit = () => {
      let data = {
        class_code: "",
        s_email: "",
      };

      classCode && stdList.map((v) =>
        data = {class_code: classCode.classCode, s_email: v.s_email},
        stdData.push(data)
      );

      console.log(stdData);

      axios
        .post("/classrecognize", stdData)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => setIsOpen(false));
    };

    useEffect(() => {
      console.log(appllyStdList);
    }, [])

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          appllyStdListSubmit();
        }}
      >
        <div className="class_list_area">
          {appllyStdList.length === 0 ? (
            <p className="no_class_list">가입 신청한 학생이 없습니다.</p>
          ) : (appllyStdList.map((v, index) =>
              v.recognize === 0 ? (
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
              ) : null
            )
          )}
        </div>
        <button type="submit">가입승인</button>
      </form>
    );
  };

const StdClassJoinApp = ({ appllyStdList, classCode }) => {
  const [isOpen, setIsOpen, Modal] = useModal();  
  
  const valueChecked = () => { 
      if (appllyStdList) {
        const data = {
          class_code: classCode.classCode,
          s_email: appllyStdList.s_email,
        };
        const ddd = [];
        ddd.push(data);
        return ddd;
      }
  }
  

  // classinfo API 완료 후 클래스 회원 가입 승인 작업
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>신청학생승인</button>
      <Modal>
        <div className="modal std_class_app">
          <div className="modal_area">
            <div className="modal_head">
              <p className="tit">클래스 신청학생승인</p>
              <p className="txt">
                클래스 가입을 신청한 학생들을 확인 및 승인을 할 수 있습니다.
              </p>
            </div>
            <ClassJoinStdList
              appllyStdList={appllyStdList}
              classCode={classCode}
              setIsOpen={setIsOpen}
            />
            <button onClick={() => setIsOpen(false)} className="modal_close">
              <img src="/img/modal_close.gif" alt="모달 닫기" />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default StdClassJoinApp
