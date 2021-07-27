import axios from "axios";
import Footer from "Components/Layout/Footer";
import Header from "Components/Layout/Header";
import React, { createContext, useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import ContSideMenu from "./ContSideMenu";
import TestList from "./TestList";
import TestScoreGrade from "./TestScoreGrade";

const Index = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [classCode, setclassCode] = useState(""); //  해당 클래스 시험 정보
  const [userClassInfo, setUserClassInfo] = useState([]);
  const [selectClassTestInfo, setSelectClassTestInfo] = useState([]);
  const [classStdNum, setClassStdNum] = useState(0);
  const [classTestNum, setClassTestNum] = useState(0);
  const [emptyArrayCheckFlag, setEmptyArrayCheckFlag] = useState(false);
  const [
    classListEmptyArrayCheckFlag,
    setclassListEmptyArrayCheckFlag,
  ] = useState(false);
  const [apiLoadingFlag, setApiLoadingFlag] = useState(false);
  const [noClassCodeFlag, setNoClassCodeFlag] = useState(false);
  const [classJoinAppFlag, setClassJoinAppFlag] = useState(false)
   const [classJoinAppRecognize, setClassJoinAppRecognize] = useState(false);

  const classCodeParams = useParams();

  const SelectEmail = () => {
    let UserEmail = {};

    cookies.t_email
      ? (UserEmail = { t_email: cookies.t_email })
      : (UserEmail = { s_email: cookies.s_email });
    
    console.log(UserEmail);

    return UserEmail && UserEmail;
  };

  const readClass = (apiEmailData) => {
    classListEmptyArrayCheckFlag === true &&
      setclassListEmptyArrayCheckFlag(false);

    console.log(apiEmailData);
    console.log(apiEmailData.hasOwnProperty("s_email"));
    apiEmailData && apiEmailData.hasOwnProperty("s_email") === true
      ? axios
          .post("/classlist", apiEmailData)
          .then((res) => {

            res.data.length === 0 && setclassListEmptyArrayCheckFlag(true);
            setUserClassInfo(res.data);
            !classCodeParams.hasOwnProperty("classCode")
              ? setclassCode(res.data[0].class_code)
              : setclassCode(classCodeParams.classCode);

            setClassJoinAppRecognize(res.data[0].recognize);
          })
          .catch((err) => {
            console.log(err);
          })
      : console.log("Lost User Email");
  };
const MenuSelect = (apiEmailData, classCode) => {
  apiLoadingFlag === true && setApiLoadingFlag(false);
  emptyArrayCheckFlag === true && setEmptyArrayCheckFlag(false);
  
  // noClassCodeFlag === true && setNoClassCodeFlag(false);
  
  // !classCode && setNoClassCodeFlag(true);

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
            setClassJoinAppRecognize={setClassJoinAppRecognize}
          />
          <div id="contents">
            <div className="cont_visual student">
              <p className="eng small">Welcome.</p>
              <p className="eng big">Re:Coder</p>
              <p className="kor">公正な試験文化のためのコーディングテスト</p>
            </div>
            <div className="cont_tit">
              <p className="eng_txt">className :</p>
              <p className="class_name">
                {classListEmptyArrayCheckFlag === false
                  ? userClassInfo.map((v) =>
                      v.class_code === classCode ? v.class_name : ""
                    )
                  : "現在、加入しているクラスはありません。"}
              </p>
              {/* ㅜㅜ <div className="teacher_info">
                <p className="eng_txt">Teacher : </p>
                <p>정영철</p>
              </div> */}
            </div>
            <div className="cont_wrap">
              {classListEmptyArrayCheckFlag === false ? (
                <Tabs>
                  <TabList>
                    <Tab>試験リスト</Tab>
                    <Tab>試験統計</Tab>
                  </TabList>
                  <TabPanel>
                    <TestList
                      selectClassTestInfo={selectClassTestInfo}
                      noClassCodeFlag={noClassCodeFlag}
                      apiLoadingFlag={apiLoadingFlag}
                      classListEmptyArrayCheckFlag={
                        classListEmptyArrayCheckFlag
                      }
                      emptyArrayCheckFlag={emptyArrayCheckFlag}
                      userClassInfo={userClassInfo}
                      classCode={classCode}
                    />
                  </TabPanel>
                  <TabPanel>
                    <TestScoreGrade
                      apiLoadingFlag={apiLoadingFlag}
                      selectClassTestInfo={selectClassTestInfo}
                      emptyArrayCheckFlag={emptyArrayCheckFlag}
                      classListEmptyArrayCheckFlag={
                        classListEmptyArrayCheckFlag
                      }
                    />
                  </TabPanel>
                </Tabs>
              ) : (
                <div className="no_create_guide class">
                  <p className="mb10">まず、クラスに加入してください。</p>
                  <span>
                    クラス招待コードをもらって
                    <img
                      src="/img/first_class_plus.gif"
                      alt="메뉴 클래스 추가 버튼 아이콘"
                    />
                    ボタンを押すと、
                    <br />
                    クラス加入を申し込むことができます。
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
