import React from 'react'
import useModal from "./useModal";
import axios from "axios";

const StdClassJoinApp = ({ appllyStdList  }) => {
    const [isOpen, setIsOpen, Modal] = useModal();

    console.log(appllyStdList);
    
    const appllyStdListSetUp = appllyStdList.map((currElement, index) => (
      <div className="class_list_check">
        <input type="checkbox" id={index} name={currElement.s_name} />
        <label for={index}>
          {currElement.s_name} <span>{currElement.s_email}</span>
        </label>
      </div>
    ));

    return (
      <>
        <button onClick={() => setIsOpen(!isOpen)}>신청학생승인</button>
        <Modal>
          <div className="modal std_class_app">
            <div className="modal_area">
              <div className="modal_head">
                <p className="tit">클래스 신청학생승인</p>
                <p className="txt">클래스 삭제 시 복구하실 수 없습니다.</p>
              </div>
              <form>
                <div className="class_list_area">
                  {appllyStdList.length === 0 ? (
                    <p className="no_class_list">
                      가입 신청한 학생이 없습니다.
                    </p>
                  ) : (
                    appllyStdListSetUp
                  )}
                </div>
                <button type="submit">가입승인</button>
              </form>
              <button onClick={() => setIsOpen(false)} className="modal_close">
                <img src="./img/modal_close.gif" alt="모달 닫기" />
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
};

export default StdClassJoinApp
