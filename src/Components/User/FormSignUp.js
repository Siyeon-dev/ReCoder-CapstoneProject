import Axios from "axios";
import React, { useEffect } from "react";
import useFrom from "./useFrom";
import validate from "./validateInfo";
import { useLocation } from "react-router";
import Header from "Components/Layout/Header";
import Footer from "Components/Layout/Footer";

const FormSignUp = ({ SignUpSuccessForm }, props) => {
  const {
    handleChange,
    handleChangeType,
    values,
    handleSubmit,
    errors,
  } = useFrom(SignUpSuccessForm, validate, useLocation);

  return (
    <>
      <Header />
      <div id="wrapper" className="bg">
        <div id="container">
          <div className="top_txt">
            <p className="tit">
              온라인 시험 감독 서비스 리코더 회원가입을 환영합니다.
            </p>
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
            <p className="txt">Coding Test Membership Window</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="userName"
                placeholder="이름 입력"
                value={values.userName}
                onChange={handleChange}
              />
              {errors.userName && (
                <p className="sign_required">{errors.userName}</p>
              )}
              <input
                type="email"
                name="userEmail"
                placeholder="아이디(이메일) 입력"
                value={values.userEmail}
                onChange={handleChange}
              />
              {errors.userEmail && (
                <p className="sign_required">{errors.userEmail}</p>
              )}
              <input
                type="password"
                name="userPasswd"
                placeholder="비밀번호 입력"
                value={values.userPasswd}
                onChange={handleChange}
              />
              {errors.userPasswd && (
                <p className="sign_required">{errors.userPasswd}</p>
              )}
              <input
                type="password"
                name="userPasswdConfirm"
                placeholder="비밀번호 입력확인"
                value={values.userPasswdConfirm}
                onChange={handleChange}
              />
              {errors.userPasswdConfirm && (
                <p className="sign_required">{errors.userPasswdConfirm}</p>
              )}
              <input
                type="text"
                name="userTel"
                placeholder="전화번호 입력"
                value={values.userTel}
                onChange={handleChange}
              />
              {errors.userTel && (
                <p className="sign_required">{errors.userTel}</p>
              )}
              <input type="submit" value="회원가입" />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FormSignUp;
