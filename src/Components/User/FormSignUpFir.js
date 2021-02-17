import axios from "axios";
import Footer from "Components/Layout/Footer";
import Header from "Components/Layout/Header";
import React, { useState } from "react";
import { useHistory } from "react-router";

const FormSignUpFir = (props) => {
  const [signOtion, setSignOtion] = useState("teacher");
  const history = useHistory();
  console.log(signOtion);

  const handleOptionChange = (e) => {
    console.log(e.target.value);
    if (!e.target.value) {
      setSignOtion("teacher");
    } else {
      setSignOtion(e.target.value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />
      <div id="wrapper" className="bg">
        <div id="container">
          <div className="top_txt">
            <p className="tit">온라인 시험 감독 서비스 리코더</p>
            <p>
              부정행위 걱정 없이
              <br />
              온라인 시험을 운영, 감독하세요.
            </p>
          </div>
          <div className="login_input_wrap">
            <div className="wlogo">
              <img
                src="./img/login_join_logo.gif"
                alt="로그인, 회원가입 페이지 로고"
              />
            </div>
            <p className="txt">홈페이지에 오신 것을 환영합니다.</p>
            <form onSubmit={handleFormSubmit}>
              <div className="sign_check">
                <div className="checks">
                  <input
                    type="radio"
                    id="ex_rd"
                    name="type_teacher"
                    value="teacher"
                    checked={signOtion === "teacher"}
                    onChange={handleOptionChange}
                  />
                  <label for="ex_rd" className="teacher">
                    <span>선생님으로 회원가입</span>
                  </label>
                </div>

                <div className="checks">
                  <input
                    type="radio"
                    id="ex_rd2"
                    name="type_student"
                    value="student"
                    checked={signOtion === "student"}
                    onChange={handleOptionChange}
                  />
                  <label for="ex_rd2" className="student">
                    <span>학생으로 회원가입</span>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="sign_check_btn"
                onClick={() => {
                  history.push({
                    pathname: "/FormSignUp",
                    state: { signOtion: signOtion },
                  });
                }}
              >
                Next Step
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FormSignUpFir;
