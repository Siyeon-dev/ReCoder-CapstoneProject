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
              オンライン試験監督サービスRe:Coder<br />会員登録を歓迎いたします。
            </p>
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
            <p className="txt">Coding Test Membership Window</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="userName"
                placeholder="名前入力"
                value={values.userName}
                onChange={handleChange}
              />
              {errors.userName && (
                <p className="sign_required">{errors.userName}</p>
              )}
              <input
                type="email"
                name="userEmail"
                placeholder="ID(メール)入力"
                value={values.userEmail}
                onChange={handleChange}
              />
              {errors.userEmail && (
                <p className="sign_required">{errors.userEmail}</p>
              )}
              <input
                type="password"
                name="userPasswd"
                placeholder="パスワード入力"
                value={values.userPasswd}
                onChange={handleChange}
              />
              {errors.userPasswd && (
                <p className="sign_required">{errors.userPasswd}</p>
              )}
              <input
                type="password"
                name="userPasswdConfirm"
                placeholder="パスワード入力確認"
                value={values.userPasswdConfirm}
                onChange={handleChange}
              />
              {errors.userPasswdConfirm && (
                <p className="sign_required">{errors.userPasswdConfirm}</p>
              )}
              <input
                type="text"
                name="userTel"
                placeholder="電話番号入力"
                value={values.userTel}
                onChange={handleChange}
              />
              {errors.userTel && (
                <p className="sign_required">{errors.userTel}</p>
              )}
              <input type="submit" value="加入する" />
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FormSignUp;
