import React from "react";
import Footer from "./Components/Layout/Footer";
import Header from "./Components/Layout/Header";

const Main = () => {
  return (
    <>
      <Header />
      <div className="main_wrap">
        <div className="main_visual">
          <p className="s_tit">온라인 코딩 시험 감독 서비스</p>
          <p className="b_tit">
            <span>부정행위</span> 걱정없이
            <br />
            <span>온라인 코딩 시험</span>을
            <br /> <span>운영, 감독</span>하세요.
          </p>
          <p className="s_txt">
            응시자의 실물과 컴퓨터 화면을 동시에 감독하며
            <br />
            공정하고 투명한 온라인 시험을 운영해보세요.
          </p>
        </div>

        <div className="main_info_wrap">
          <ul>
            <li className="ico01">
              <p className="tit">
                온라인에서 어떻게
                <br />
                응시자를 감독하나요?
              </p>
              <p className="txt">
                실시간 화면공유를 이용해 응시자의 모니터, 웹캠, 핸드폰을
                활용하여 감독하므로 부정행위를 방지할 수 있습니다.
              </p>
            </li>
            <li className="ico02">
              <p className="tit">
                아이트래킹을 이용해
                <br />
                부정행위를 감지해요!
              </p>
              <p className="txt">
                아이트래킹으로 학생의 시선을 감지하여 부정행위를 화면에 표시하여
                부정행위를 감독하기 쉽습니다.
              </p>
            </li>
            <li className="ico03">
              <p className="tit">
                어떤 프로그래밍 언어
                <br />
                시험을 만들 수 있나요?
              </p>
              <p className="txt">
                시험 시 웹 코드 에디터를 제공하여 javaScript Java php 3가지
                프로그래밍 언어에 대한 실행결과를 확인할 수 있습니다.
              </p>
            </li>
          </ul>
        </div>

        <div className="main_service_step">
          <p className="tit">쉽고 편리한 온라인 코딩 시험 절차</p>
          <p className="s_tit">이러한 과정으로 진행됩니다</p>

          <div className="step_img">
            <ul>
              <li className="icon01">
                <p className="tit">
                  <span>1</span>클래스 생성
                </p>
                <p className="txt">
                  선생님이 시험 및 학생을 관리할 클래스를 생성
                </p>
              </li>
              <li className="icon02">
                <p className="tit">
                  <span>2</span>클래스 가입신청
                </p>
                <p className="txt">
                  학생이 클래스 초대코드를 이용해 클래스 가입신청
                </p>
              </li>
              <li className="icon03">
                <p className="tit">
                  <span>3</span>학생 가입승인
                </p>
                <p className="txt">학생이 신청한 클래스 가입신청을 승인</p>
              </li>
              <li className="icon04">
                <p className="tit">
                  <span>4</span>시험 생성
                </p>
                <p className="txt">
                  클래스에서 언어, 날짜 등을 지정하여 시험생성
                </p>
              </li>
            </ul>
            <ul>
              <li className="icon05">
                <p className="tit">
                  <span>5</span>문제 등록
                </p>
                <p className="txt">시험 생성과 동시에 문제를 등록</p>
              </li>
              <li className="icon06">
                <p className="tit">
                  <span>6</span>시험 응시 및 감독
                </p>
                <p className="txt">
                  학생은 시험을 응시, 선생님은 시험 전 과정을 감독
                </p>
              </li>
              <li className="icon03">
                <p className="tit">
                  <span>7</span>시험 채점
                </p>
                <p className="txt">시험이 끝나고 선생님은 학생의 시험을 채점</p>
              </li>
              <li className="icon08">
                <p className="tit">
                  <span>8</span>시험 점수확인
                </p>
                <p className="txt">
                  채점이 끝난 후, 학생은 해당 시험의 점수를 확인
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;
