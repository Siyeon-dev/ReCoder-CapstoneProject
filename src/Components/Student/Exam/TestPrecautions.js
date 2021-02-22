import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import * as janus from '../../../modules/examCandidatePC'

const TestPrecautions = () => {
  const TestCodeParams = useParams();
  const [cautionData, setCautionData] = useState([]);

  const data = {
    test_id: TestCodeParams.testId,
  };
        console.log(data);
  const CautionDataApi = () => { 
    axios
      .post("/cautionpage", data)
      .then((res) => {
        setCautionData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    CautionDataApi();
  }, [])

  const PrecautionTextAreaHtml = () => {
    let codes = cautionData && cautionData[0].test_caution;
    return <div dangerouslySetInnerHTML={{ __html: codes }}></div>;
  };

  janus.runJanusPC();
  return (
    cautionData.length !== 0 && (
      <div id="test_warning_container">
        <form action="">
          <input type="text" id="name" placeholder="Enter name" />
          <input type="button" id="namevalue" value="이름전송" />
        </form>

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
              <li className="start_test_btn">
                <Link to={`/testscreen/${TestCodeParams.testId}`}>
                  시험시작
                </Link>
              </li>
            </ul>
            <p className="test_tit">{cautionData[0].test_name}</p>
            <p className="test_date">
              {cautionData[0].test_start} ~ {cautionData[0].test_end}
            </p>
          </div>
          <ul className="std_test_info_tab">
            <li>문항수</li>
            <li>{cautionData[0].questioncount}문항</li>
            <li>점수</li>
            <li>{cautionData[0].total_score}점 만점</li>
            <li>제한시간</li>
            <li>{cautionData[0].time_diff}분</li>
          </ul>
          <div className="std_test_txt">
            <div className="txt_area">
              <p className="tit">시험 시 주의사항</p>
              {PrecautionTextAreaHtml()}
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
                id="myvideo"
                width="300px"
                height="200px"
                autoPlay
                playsInline
                muted="muted"
              >
                해당 브라우저는 video 태그를 지원하지 않습니다.
              </video>
            </div>
            <div className="view_area">
              <video
                id="myVideoScreen"
                width="300px"
                height="200px"
                autoPlay
                playsInline
                muted="muted"
              >
                해당 브라우저는 video 태그를 지원하지 않습니다.
              </video>
            </div>
            <div className="view_area">
              <video
                id="myVideoMobile"
                width="300px"
                height="200px"
                autoPlay
                playsInline
                muted="muted"
              >
                해당 브라우저는 video 태그를 지원하지 않습니다.
              </video>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default TestPrecautions
