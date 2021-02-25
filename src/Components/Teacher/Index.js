import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "Components/Layout/Header";
import Footer from "Components/Layout/Footer";
import ClassMemList from "./ClassMemList";
import ClassTestList from "./ClassTestList";
import ContSideMenu from "./ContSideMenu";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useParams } from "react-router";
import { Cookies, useCookies } from "react-cookie";
import CodeClipboardCopy from "./CodeClipboardCopy";
import ClassStatistics from "./ClassStatistics";

const Index = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [classCode, setclassCode] = useState(""); //  해당 클래스 시험 정보
  const [userClassInfo, setUserClassInfo] = useState([]);
  const [selectClassTestInfo, setSelectClassTestInfo] = useState([]);
  const [classStdNum, setClassStdNum] = useState(0);
  const [classTestNum, setClassTestNum] = useState(0);
  const [emptyArrayCheckFlag, setEmptyArrayCheckFlag] = useState(false);
  const [apiLoadingFlag, setApiLoadingFlag] = useState(false);
  const classCodeParams = useParams();

  const SelectEmail = () => {
    let UserEmail = {};

    cookies.t_email
      ? (UserEmail = { t_email: cookies.t_email })
      : (UserEmail = { s_email: cookies.s_email });

    return UserEmail;
  };

  const readClass = (apiEmailData) => {
    console.log(apiEmailData);
    console.log(apiEmailData.hasOwnProperty("t_email"));
    apiEmailData && apiEmailData.hasOwnProperty("t_email") === true
      ? axios
          .post("/classlist", apiEmailData)
          .then((res) => {
            setUserClassInfo(res.data);
            !classCodeParams.hasOwnProperty("classCode")
              ? setclassCode(res.data[0].class_code)
              : setclassCode(classCodeParams.classCode);
          })
          .catch((err) => {
            console.log(err);
          })
      : console.log("Lost User Email");
  };

  const MenuSelect = (apiEmailData, classCode) => {
    apiLoadingFlag === true && setApiLoadingFlag(false);
    emptyArrayCheckFlag === true && setEmptyArrayCheckFlag(false);

    console.log(classCode);

    const data = {
      class_code: classCode !== undefined ? classCode : null,
      ...apiEmailData,
    };

    console.log(data);

    data.class_code !== null &&
      axios
        .post("/classinfo", data)
        .then((res) => {
          setApiLoadingFlag(true);
          res.data.hasOwnProperty("mes")
            ? setEmptyArrayCheckFlag(true)
            : setSelectClassTestInfo(res.data);

          res.data.length === undefined
            ? setClassTestNum(0)
            : setClassTestNum(res.data.length);

          res.data.length === undefined
            ? setClassStdNum(0)
            : setClassStdNum(res.data[0].student_count);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  useEffect(() => {
    readClass(SelectEmail());
  }, []);

  useEffect(() => {
    setSelectClassTestInfo([]);
    console.log(emptyArrayCheckFlag);
    classCode && MenuSelect(SelectEmail(), classCode);
  }, [classCode]);

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
                <CodeClipboardCopy classCode={classCode} />
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
                      selectClassTestInfo={selectClassTestInfo}
                      classCode={classCode}
                      apiLoadingFlag={apiLoadingFlag}
                      emptyArrayCheckFlag={emptyArrayCheckFlag}
                    />
                  </TabPanel>
                  <TabPanel>
                    <ClassMemList classCode={classCode} />
                  </TabPanel>
                  <TabPanel>
                    <ClassStatistics
                      selectClassTestInfo={selectClassTestInfo}
                      apiLoadingFlag={apiLoadingFlag}
                      emptyArrayCheckFlag={emptyArrayCheckFlag}
                      classCode={classCode}
                    />
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
};

export default Index;
