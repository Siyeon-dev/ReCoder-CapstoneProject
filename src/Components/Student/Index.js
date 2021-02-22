import axios from "axios";
import Footer from "Components/Layout/Footer";
import Header from "Components/Layout/Header";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import ContSideMenu from "./ContSideMenu";
import ContTitle from "./ContTitle";
import TestList from "./TestList";

const Index = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [classCode, setclassCode] = useState(""); //  해당 클래스 시험 정보
  const [userClassInfo, setUserClassInfo] = useState([]);
  const classCodeParams = useParams();

  const readClass = () => {
    let userEmail;

    if (cookies.t_email) {
      userEmail = { t_email: cookies.t_email };
    } else if (cookies.s_email) {
      userEmail = { s_email: cookies.s_email };
    } else {
      return null;
    }

    axios
      .post("/classlist", userEmail)
      .then((res) => {
        setUserClassInfo(res.data);
        !classCodeParams.hasOwnProperty("classCode")
          ? setclassCode(res.data[0].class_code)
          : setclassCode(classCodeParams.classCode);

        console.log(res.data);
        console.log(classCode);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    readClass();
  }, []);

  return (
    <>
      <Header />
      <div id="wrapper">
        <div id="container">
          <ContSideMenu
            setclassCode={setclassCode}
            userClassInfo={userClassInfo}
            readClass={readClass}
          />
          <div id="contents">
            <div className="cont_visual">
              <p className="eng small">Welcome.</p>
              <p className="eng big">Re:Coder</p>
              <p className="kor">
                공정한 시험 문화를 위한 코딩 테스트 프로그램
              </p>
            </div>
            <ContTitle />
            <div className="cont_wrap">
              <TestList classCode={classCode} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
