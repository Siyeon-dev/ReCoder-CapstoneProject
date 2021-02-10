import React, { useRef, useState } from "react";
import useModal from "./useModal";
import ProblemEditor from "../Teacher/Editor/ProblemEditor";

const CreateProblemInfo = ({ setIsOpen }) => {
  const [problemBoartHtml, setProblemBoartHtml] = useState(null);
  const { questionName, questionScore, questionCode } = useRef("");

  const CreateProblemList = e => {
    e.preventDefault();
    console.log(e);

    let ProblemData = {
      question_name: "",
      question_score: "",
      question_text: "",
      question_code: "",
    };

    ProblemData.question_name = e.target.newClassName;
    ProblemData.question_score = e.target.new_problem_score;
    ProblemData.question_text = e.target.problemBoartHtml;
    ProblemData.question_code = e.target.new_problem_default_code;

    console.log(ProblemData);
  };

  return (
    <div className="create_problem_area">
      <form onSubmit={CreateProblemList}>
        <div className="input_area">
          <label>문제명</label>
          <input
            ref="questionName"
            type="text"
            name="newClassName"
            className="new_problem_name"
          />
        </div>
        <div className="input_area">
          <label>배점</label>
          <input
            ref="questionScore"
            type="text"
            name="newClassScore"
            className="new_problem_score"
          />
        </div>
        <div className="text_area">
          <p>문제지문입력</p>
          <ProblemEditor setProblemBoartHtml={setProblemBoartHtml} />
        </div>
        <div className="text_area">
          <p>기본제공코드</p>
          <textarea
            ref="questionCode"
            name="new_problem_default_code"
            cols="30"
            rows="10"
            placeholder="시험에 제공되는 기본 코드를 입력해주세요."
          ></textarea>
        </div>
        <button type="submit">문제등록하기</button>
      </form>
    </div>
  );
};


const CreateProblem = () => {
  const [isOpen, setIsOpen, Modal] = useModal();

  console.log(isOpen);
  return (
    <>
      <div className="add_questions_btn" onClick={() => setIsOpen(!isOpen)}>
        문제 추가하기
      </div>
      <Modal>
        <div className="modal create_problem ">
          <div className="modal_area">
            <p className="tit">새로운 문제 추가하기</p>

            <CreateProblemInfo setIsOpen={setIsOpen} />

            <button onClick={() => setIsOpen(false)} className="modal_close">
              <img src="/img/modal_close.gif" alt="모달 닫기" />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateProblem;
