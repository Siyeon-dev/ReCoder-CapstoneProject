import React from "react";
import ContTitle from "./ContTitle";
import ClassMemList from "./ClassMemList";
import ContSideMenu from "./ContSideMenu";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const index = () => {
  return (
    <div id="wrapper">
      <div id="container">
        <ContSideMenu />
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
                <Tab>회원관리</Tab>
                <Tab>시험관리</Tab>
                <Tab>클래스 통계</Tab>
              </TabList>

              <TabPanel>
                <ClassMemList />
              </TabPanel>
              <TabPanel>
                <div>
                  <img src="../img/tab_page2.png" alt="시험관리_예시" />
                </div>
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
};

export default index;
