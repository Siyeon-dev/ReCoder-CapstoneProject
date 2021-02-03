import React, { useEffect, useState } from "react";
import ContTitle from "./ContTitle";
import ClassMemList from "./ClassMemList";
import ClassTestList from "./ClassTestList";
import ContSideMenu from "./ContSideMenu";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useParams } from "react-router";
import axios from 'axios'
import { Cookies, useCookies } from "react-cookie";

const Index = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [classCode, setclassCode] = useState(""); //  해당 클래스 시험 정보
  const [userClassInfo, setUserClassInfo] = useState([]);
  console.log(classCode);

    const readClass = async () => {
      let userEmail;

      if (cookies.t_email) {
        userEmail = { t_email: cookies.t_email };
      } else if (cookies.s_email) {
        userEmail = { s_email: cookies.s_email };
      } else {
        return null;
      }
      await axios
        .post("/classlist", userEmail)
        .then((res) => {
          setUserClassInfo(res.data);
          setclassCode(res.data[0].class_code);
          console.log(res.data[0].class_code);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(() => {
      readClass();
    }, []);

  return (
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
            <p className="kor">공정한 시험 문화를 위한 코딩 테스트 프로그램</p>
          </div>
          <ContTitle />
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
  );
};;

export default Index;
