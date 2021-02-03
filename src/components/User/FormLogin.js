import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

const api = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

const FormLogin = () => {
  const [userId, setUserId] = useState();
  const [userPasswd, setUserPasswd] = useState();
  const [status, setStatus] = useState(null);
  const history = useHistory();
  const [data, setData] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [loginType, setloginType] = useState("teacher");

    // 처음 시작 시 cookies 지우기
    useEffect(() => {
      removeCookie("t_email");
      removeCookie("t_name");
      removeCookie("s_email");
      removeCookie("s_name");
      removeCookie("isLogin");
    }, [])

  const handleOptionChange = (e) => {
    e.target.value ? setloginType(e.target.value) : setloginType("");
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data;

    if (loginType === "teacher") {
      data = {
        t_email: userId,
        t_password: userPasswd,
      };
      setData(data);
    } else if (loginType === "student") {
      data = {
        s_email: userId,
        s_password: userPasswd,
      };
      setData(data);
    } else {
      alert("선생님과 학생 중 선택해주세요.");
    }

    console.log(data);

    axios
      .post("login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        console.log(res.data.login);

        const { accessToken } = res.data;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        console.log(accessToken);

        if (res.data.login === "success" && res.data.token) {
          console.log(res.data);
          alert("로그인되었습니다.");
          setStatus(res.status);

          if (loginType === "teacher") {
            setCookie("t_email", data.t_email);
            setCookie("t_name", res.data.t_name);
            history.push("/teacher");
          } else if (loginType === "student") {
            setCookie("s_email", data.s_email);
            setCookie("s_name", res.data.s_name);
            history.push("/student");
          }

          setCookie("isLogin", true);
        } else {
          alert("로그인에 실패하였습니다.\n아이디와 비밀번호를 확인해 주세요.");
          history.push("/");
        }
      })
      .catch((err) => {
        err.response && err.response.data && console.log(err.response.data);
        localStorage.removeItem("token");
        setStatus(err.status);
      });
  };


  return (
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
          <form action="" onSubmit={handleSubmit}>
            {/**/}
            <div className="login_radio_area">
              <div className="toggle-button toggle-button--maa">
                <input
                  id="login_teacher"
                  name="login_type"
                  type="radio"
                  value="teacher"
                  defaultChecked={true}
                  onChange={handleOptionChange}
                />
                <label for="login_teacher" data-text="선생님"></label>
                <div className="toggle-button__icon"></div>
              </div>
              <div className="toggle-button toggle-button--maa">
                <input
                  id="login_student"
                  name="login_type"
                  type="radio"
                  value="student"
                  onChange={handleOptionChange}
                />
                <label for="login_student" data-text="학생"></label>
                <div className="toggle-button__icon"></div>
              </div>
            </div>

            <input
              type="text"
              name="userId"
              onChange={(e) => {
                setUserId(e.target.value);
              }}
              placeholder="아이디를 입력해주세요."
            />
            <input
              type="password"
              name="userPasswd"
              onChange={(e) => {
                setUserPasswd(e.target.value);
              }}
              placeholder="비밀번호를 입력해주세요."
            />
            <input type="submit" value="로그인" />
          </form>

          <p className="login_link mt30">
            아직 계정이 없으신가요? <Link to="/signup">회원가입</Link>
          </p>
          <p className="login_link">
            아이디/비밀번호가 기억나지 않으신가요?{" "}
            <Link to="">아이디/비밀번호 찾기</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
