import React from "react";
import useModal from "./useModal";
import ProblemEditor from "../Teacher/Editor/ProblemEditor";

const CreateProblem = () => {
  const [isOpen, setIsOpen, Modal] = useModal();

  const CreateProblemList = () => { 

  }

  return (
    <>
      <div className="add_questions_btn" onClick={() => setIsOpen(!isOpen)}>
        문제 추가하기
      </div>
      <Modal>
        <form onSubmit={CreateProblemList}>
          <div className="modal create_problem ">
            <div className="modal_area">
              <p className="tit">새로운 문제 추가하기</p>
              <div className="create_problem_area">
                <div className="input_area">
                  <label htmlFor="">문제명</label>
                  <input
                    type="text"
                    name="newClassName"
                    className="new_problem_name"
                  />
                </div>
                <div className="input_area">
                  <label htmlFor="">배점</label>
                  <input
                    type="text"
                    name="newClassScore"
                    className="new_problem_score"
                  />
                </div>
                <div className="text_area">
                  <p>문제지문입력</p>
                  <ProblemEditor />
                </div>
                <div className="text_area">
                  <p>기본제공코드</p>
                  <textarea
                    name="default_code"
                    cols="30"
                    rows="10"
                    placeholder="시험에 제공되는 기본 코드를 입력해주세요."
                  ></textarea>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="modal_close">
                <img src="/img/modal_close.gif" alt="모달 닫기" />
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateProblem;
