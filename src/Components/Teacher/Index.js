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
import Clipboard from "react-clipboard.js";

const Index = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [classCode, setclassCode] = useState(""); //  해당 클래스 시험 정보
  const [userClassInfo, setUserClassInfo] = useState([]);
  const [classStdNum, setClassStdNum] = useState(0);
  const [classTestNum, setClassTestNum] = useState(0);
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

  const CopySuccess = () => {
    alert("초대 코드 클립보드 복사가 완료되었습니다.");
  };

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
              <div className="clipboard_copy">
                <Clipboard
                  data-clipboard-text={`클래스에 초대되셨습니다. \n클래스 초대 코드를 입력하면 가입하실 수 있습니다. \n초대 코드 : ${classCode}`}
                  onSuccess={CopySuccess}
                >
                  초대코드 <span>{classCode}</span>
                </Clipboard>
              </div>
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
                  전체 시험 수 <span className="mint">{classTestNum}</span>개
                </p>
                <p className="test_std">
                  전체 학생 수 <span className="blue">{classStdNum}</span>명
                </p>
              </div>
            </div>
            <div className="cont_wrap">
              <div className="reload_area">
                <Tabs>
                  <TabList>
                    <Tab>시험관리</Tab>
                    <Tab>회원관리</Tab>
                    <Tab>클래스 통계</Tab>
                  </TabList>

                  <TabPanel>
                    <ClassTestList
                      setClassStdNum={setClassStdNum}
                      setClassTestNum={setClassTestNum}
                      classCode={classCode}
                    />
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
      </div>
      <Footer />
    </>
  );
};;

export default Index;
