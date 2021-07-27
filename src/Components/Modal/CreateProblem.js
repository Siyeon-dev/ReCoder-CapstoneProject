import React, { useEffect, useRef, useState } from "react";
import useModal from "./useModal";
import QuizEditor from "../Teacher/Editor/QuizEditor";

const CreateProblemInfo = ({ setIsOpen, quizList, setQuizList }) => {
  const [problemBoartHtml, setProblemBoartHtml] = useState(null);
  const [questionName, setQuestionName] = useState("");
  const [questionScore, setQuestionSocre] = useState("");
  const [questionCode, setQuestionCode] = useState("");

  const CreateProblemList = (e) => {
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
    questionScore <= 100
      ? setQuizList([
          ...quizList,
          {
            question_name: questionName,
            question_score: questionScore,
            question_text: problemBoartHtml,
            question_code: questionCode,
          },
        ])
      : alert("点数は100点まで可能です。");
  };

  const handleChange = (e, setFunction) => {
    e.preventDefault();
    setFunction(e.target.value);
  };

  useEffect(() => {
    console.log(questionName, questionScore, problemBoartHtml, questionCode);
  });

  return (
    <div className="create_problem_area">
      <form onSubmit={CreateProblemList}>
        <div className="input_area">
          <label>問題名</label>
          <input
            type="text"
            name="newClassName"
            className="new_problem_name"
            maxLength="20"
            onChange={(e) => {
              handleChange(e, setQuestionName);
            }}
          />
        </div>
        <div className="input_area">
          <label>配点</label>
          <input
            type="text"
            name="newClassScore"
            className="new_problem_score"
            onChange={(e) => {
              handleChange(e, setQuestionSocre);
            }}
          />
        </div>
        <div className="text_area">
          <p>問題説明入力</p>
          <QuizEditor setProblemBoartHtml={setProblemBoartHtml} />
        </div>
        <div className="text_area">
          <p>基本提供コード</p>
          <textarea
            name="new_problem_default_code"
            cols="30"
            rows="10"
            placeholder="試験に基本的に提供されるコードを入力してください。"
            onChange={(e) => {
              handleChange(e, setQuestionCode);
            }}
          ></textarea>
          <div className="btn_wrap">
            <button
              className="create_problem_btn"
              onClick={(e) => {
                handleCreate();
                setIsOpen(false);
              }}
            >
              生成する
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const CreateProblem = ({ quizList, setQuizList }) => {
  const [isOpen, setIsOpen, Modal] = useModal();

  console.log(isOpen);
  return (
    <>
      <div className="add_questions_btn" onClick={() => setIsOpen(!isOpen)}>
        問題を追加
      </div>
      <Modal>
        <div className="modal create_problem ">
          <div className="modal_area">
            <p className="tit">新しい問題を追加する</p>

            <CreateProblemInfo
              setIsOpen={setIsOpen}
              setQuizList={setQuizList}
              quizList={quizList}
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

export default CreateProblem;
