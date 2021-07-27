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
            <p className="tit">オンライン試験監督サービス Re:Coder</p>
            <p>
              不正行為の心配なく
              <br />
              オンライン試験を運営、監督できます。
            </p>
          </div>
          <div className="login_input_wrap">
            <div className="wlogo">
              <img
                src="./img/login_join_logo.gif"
                alt="로그인, 회원가입 페이지 로고"
              />
            </div>
            <p className="txt">ホームページへようこそ。</p>
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
                    <span>先生として 加入する</span>
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
                    <span>学生として 加入する</span>
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
