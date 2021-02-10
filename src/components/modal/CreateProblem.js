import React, { useEffect, useRef, useState } from "react";
import useModal from "./useModal";
import ProblemEditor from "../Teacher/Editor/ProblemEditor";

const CreateProblemInfo = ({ setIsOpen, quizList, setQuizList }) => {
  const [problemBoartHtml, setProblemBoartHtml] = useState(null);
  const [questionName, setQuestionName] = useState("");
  const [questionScore, setQuestionSocre] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [questionCode, setQuestionCode] = useState("");

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

  const handleCreate = (e) => {
    setQuizList([...quizList, {
      question_name: questionName,
      question_score:questionScore,
      question_text:problemBoartHtml,
      question_code:questionCode
    }])
  }

  const handleChange = (e, setFunction) => {
    e.preventDefault();
    setFunction(e.target.value);
  }

  useEffect(() => {
    console.log(questionName, questionScore, problemBoartHtml, questionCode)
  })

  return (
    <div className="create_problem_area">
      <form onSubmit={CreateProblemList}>
        <div className="input_area">
          <label>문제명</label>
          <input
            type="text"
            name="newClassName"
            className="new_problem_name"
            onChange={e => {
            handleChange(e, setQuestionName)
          }}
          />
        </div>
        <div className="input_area">
          <label>배점</label>
          <input
            type="text"
            name="newClassScore"
            className="new_problem_score"
            onChange={e => {
              handleChange(e, setQuestionSocre)
            }}
          />
        </div>
        <div className="text_area">
          <p>문제지문입력</p>
          <ProblemEditor setProblemBoartHtml={setProblemBoartHtml} />
        </div>
        <div className="text_area">
          <p>기본제공코드</p>
          <textarea
            name="new_problem_default_code"
            cols="30"
            rows="10"
            placeholder="시험에 제공되는 기본 코드를 입력해주세요."
            onChange={ e=>{handleChange(e, setQuestionCode)}}
          ></textarea>
          <button onClick={(e) => {
            handleCreate();
            setIsOpen(false)
          }}>click!</button>
        </div>
      </form>
    </div>
  );
};


const CreateProblem = ({quizList, setQuizList}) => {
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

            <CreateProblemInfo setIsOpen={setIsOpen}
              setQuizList={setQuizList}
              quizList={quizList}
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

export default CreateProblem;
