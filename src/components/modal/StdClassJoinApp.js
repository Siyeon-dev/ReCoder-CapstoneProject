import React from 'react'
import useModal from "./useModal";
import axios from "axios";
import { useCookies } from "react-cookie";

const StdClassJoinApp = ({ appllyStdList, classCode }) => {
  const [isOpen, setIsOpen, Modal] = useModal();  
  const [selectStdAppList, setSelectStdAppList] = useState([]);
  const bbb = [];
  const uniqueArr2 = [];

  console.log(appllyStdList);
  
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
  
      const handleCheck = (e) => {
        bbb.push(e.target.name);

        bbb.forEach((element) => {
          if (!uniqueArr2.includes(element)) {
            uniqueArr2.push(element);
          } else {
            console.log(element);
            uniqueArr2.splice(uniqueArr2.indexOf(element), 1);
          }
        });
        bbb.length = 0;
        console.log(uniqueArr2);
      };


  const appllyStdListSubmit = () => {
    console.log("asdasd");
      axios
        .post("/classrecognize", valueChecked())
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .then(setIsOpen(!isOpen)).finally(() => {
          console.log('test')
        });
    }

  const appllyStdListSetUp = appllyStdList.map((currElement, index) =>
    console.log(appllyStdList);
      currElement.recognize === 0 ? (
        <div className="class_list_check">
          <input
            type="checkbox"
            id={index}
            name={currElement.s_email}
            onChange={() => {handleCheck}}
          />
          <label for={index}>
            {currElement.s_name}
            <span className="std_email">{currElement.s_email}</span>
          </label>
        </div>
      ) : null
    );

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
            <form onSubmit={(e) => {
              e.preventDefault();
              appllyStdListSubmit()
            }}>
              <div className="class_list_area">
                {appllyStdList.length === 0 ? (
                  <p className="no_class_list">가입 신청한 학생이 없습니다.</p>
                ) : (
                  appllyStdListSetUp
                )}
              </div>
              <button type="submit">가입승인</button>
            </form>
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
