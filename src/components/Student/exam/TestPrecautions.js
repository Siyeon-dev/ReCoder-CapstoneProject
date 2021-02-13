import React from 'react'

const TestPrecautions = () => {
    return (
      <div id="test_warning_container">
        <div className="wrap">
          <div className="std_test_info">
            <ul>
              <li>
                대기인원 :
                <div className="eng">
                  <span>10</span>/30
                </div>
              </li>
              <li className="time">03:50</li>
            </ul>
            <p className="test_tit">2020학년도 1학기 중간고사</p>
            <p className="test_date">2020-07-26 11:00 ~ 2020-07-26 11:50</p>
          </div>
          <ul className="std_test_info_tab">
            <li>문항수</li>
            <li>3문항</li>
            <li>점수</li>
            <li>100점 만점</li>
            <li>제한시간</li>
            <li>40분</li>
          </ul>
          <div className="std_test_txt">
            <div className="txt_area">
              <p className="tit">시험 시 주의사항</p>
              0. 만약 이미 시험을 응시완료한 상태일 경우, 관리자 시험관리
              응시자관리로 이동하여 재응시버튼을 클릭하시면 됩니다. <br />
              1. 제출완료 버튼을 누르지 않으면 완료되지 않습니다.단, 제한시간을
              초과하면 입장할 수 없습니다. <br />
              2. 중간에 시험을 나갈 경우, 시간은 자동으로 차감됩니다. <br />
              3. 본 시험은 문제별 제한시간이 적용되어 있으며, 응시시간이 지나면
              자동으로 시험이 종료됩니다. <br />
              4. 합격기준은 60점 만점입니다.
              <br />
              <br /> ※ 시험 응시 전 웹 브라우저의 팝업 차단 설정을 해제해주시기
              바랍니다.
              <br /> ※ 시험 조건을 반드시 숙지하고 시험에 응시해주시기 바랍니다.
              <br /> ※ 시험응시기록이 전부 저장되기 때문에 부정행위 적발시 0점
              조치될 수 있습니다. <br />※ 시험 응시하기 버튼을 클릭하시면 자동
              재응시가 불가능하며, 관리자에게 문의해주셔야 합니다.
              <br />
              <br /> ※ 시험 응시 전 웹 브라우저의 팝업 차단 설정을 해제해주시기
              바랍니다.
              <br /> ※ 시험 조건을 반드시 숙지하고 시험에 응시해주시기 바랍니다.
              <br /> ※ 시험응시기록이 전부 저장되기 때문에 부정행위 적발시 0점
              조치될 수 있습니다. <br />※ 시험 응시하기 버튼을 클릭하시면 자동
              재응시가 불가능하며, 관리자에게 문의해주셔야 합니다.
            </div>
          </div>
          <div className="std_video_view">
            {/*
            src : 비디오 파일의 주소
            controls : 컨트롤러 표시
            autoplay : 자동 재생
            loop : 반복 재생
            width : 영상의 가로길이
            height : 영상의 세로길이
            muted : 음소거
            */}
            <div className="view_area">
              <video
                src="../video/Sunrise_28975.mp4"
                width="315"
                autoplay="autoplay"
                muted="muted"
                loop="loop"
              >
                해당 브라우저는 video 태그를 지원하지 않습니다.
              </video>
            </div>
            <div className="view_area">
              <video
                src="../video/Field_39990.mp4"
                width="315"
                autoplay="autoplay"
                muted="muted"
                loop="loop"
              >
                해당 브라우저는 video 태그를 지원하지 않습니다.
              </video>
            </div>
            <div className="view_area">
              <video
                src="../video/Snowy_Trees_7328.mp4"
                width="315"
                autoplay="autoplay"
                muted="muted"
                loop="loop"
              >
                해당 브라우저는 video 태그를 지원하지 않습니다.
              </video>
            </div>
          </div>
        </div>
      </div>
    );
}

export default TestPrecautions
