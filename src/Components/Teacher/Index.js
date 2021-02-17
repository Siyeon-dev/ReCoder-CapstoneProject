import React, { useEffect, useState } from "react";
import ContTitle from "./ContTitle";
import ClassMemList from "./ClassMemList";
import ClassTestList from "./ClassTestList";
import ContSideMenu from "./ContSideMenu";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useParams } from "react-router";
import axios from 'axios'
import { Cookies, useCookies } from "react-cookie";
import Header from "Components/Layout/Header";
import Footer from "Components/Layout/Footer";

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

      console.log(userEmail);
      axios
        .post("/classlist", userEmail)
        .then((res) => {
          setUserClassInfo(res.data);
          !classCodeParams.hasOwnProperty("classCode")
            ? setclassCode(res.data[0].class_code)
            : setclassCode(classCodeParams.classCode);
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
            <div className="cont_tit">
              <p className="eng_txt">className :</p>
              <p className="class_name">
                {console.log(classCode)}
                {userClassInfo.map((v) =>
                  v.class_code === classCode ? v.class_name : ""
                )}
              </p>

              <div className="test_info">
                <p className="test_num">
                  전체 시험 수 <span className="mint">10</span>개
                </p>
                <p className="test_std">
                  전체 학생 수 <span className="blue">30</span>명
                </p>
              </div>
            </div>
            <div className="cont_wrap">
              <Tabs>
                <TabList>
                  <Tab>시험관리</Tab>
                  <Tab>회원관리</Tab>
                  <Tab>클래스 통계</Tab>
                </TabList>

                <TabPanel>
                  <ClassTestList classCode={classCode} />
                </TabPanel>
                <TabPanel>
                  <ClassMemList classCode={classCode} />
                </TabPanel>
                <TabPanel>
                  <img src="../img/tab_page3.png" alt="클래스통계_예시" />
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
