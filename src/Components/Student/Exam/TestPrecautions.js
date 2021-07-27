import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

import * as janus from "../../../modules/examCandidatePC";
import * as VolumeMeter from "../../../modules/anti-cheat/volumeMeter";

const TestPrecautions = () => {
	const TestCodeParams = useParams();
	const [cookies, setCookie, removeCookie] = useCookies();
	const [cautionData, setCautionData] = useState([]);
	const [studentNumber, setStudentNumber] = useState([]);
	const history = useHistory();

	const data = {
		test_id: TestCodeParams.testId,
		s_email: cookies.s_email,
	};
	console.log(data);
	const CautionDataApi = () => {
		axios
			.post("/cautionpage", data)
			.then((res) => {
				console.log("s_number : ", res.data[0].s_number);
				setStudentNumber(res.data[0].s_number);
				setCautionData(res.data);
				res.data && janus.runJanusPC(res.data[0].s_number); // 0 => s_num
				res.data && console.log(res.data.s_number);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		CautionDataApi();
	}, []);

	const PrecautionTextAreaHtml = () => {
		let codes = cautionData && cautionData[0].test_caution;
		return <div dangerouslySetInnerHTML={{ __html: codes }}></div>;
	};

	const TestRetakeApi = () => {
		const data = {
			test_id: String(TestCodeParams.testId),
			s_email: cookies.s_email,
		};
		console.log(data);
		axios
			.post("/retake", data)
			.then((res) => {
				//
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
    cautionData.length !== 0 && (
      <div id="test_warning_container">
        <div className="wrap">
          <div className="std_test_info">
            <ul>
              {/* <li>
                대기인원 :
                <div className="eng">
                  <span>10</span>/30
                </div>
              </li> */}
              <li className="time">03:00</li>
              <li className="start_test_btn red">
                {cautionData[0].retake ? (
                  <Link
                    to={`/testscreen/${TestCodeParams.testId}/${TestCodeParams.testName}`}
                    onClick={() => {
                      // volumeMeter 매소드 호출
                      VolumeMeter.getVolumeMeter(
                        TestCodeParams.testId,
                        studentNumber
                      );

                      // 화면 전환 시 강제 리다이랙션
                      window.onblur = function () {
                        console.log("화면 전환 발생");
                        alert(
                          "試験中に画面の切り替えを感知しました。\n試験待機室に強制移動します。"
                        );

                        /* 리다이랙션 로직 */
                        window.location.replace("/student");
                      };

                      // Keyboard Event 'alt" 막기
                      window.addEventListener(
                        "keydown",
                        function (event) {
                          let handled = false;

                          if (event.defaultPrevented) {
                            return;
                          }

                          if (event.altKey) handled = true;

                          if (handled) {
                            console.log(event.keyCode);
                            event.preventDefault();
                          }
                        },
                        true
                      );

                      document.documentElement.webkitRequestFullscreen();

                      TestRetakeApi();
                    }}
                  >
                    試験開始
                  </Link>
                ) : (
                  <Link className="start_test_btn gray">
                    再受験の回数を超過したため、これ以上試験を受けるのはできません。
                  </Link>
                )}
              </li>
            </ul>
            <p className="test_tit">
              {cautionData[0].test_name}{" "}
              <span>Number : {TestCodeParams.testId}</span>
            </p>
            <p className="test_date">
              {cautionData[0].test_start} ~ {cautionData[0].test_end}
            </p>
          </div>
          <ul className="std_test_info_tab">
            <li>問題数</li>
            <li>{cautionData[0].questioncount}問題</li>
            <li>点数</li>
            <li>{cautionData[0].total_score}点/満点</li>
            <li>制限時間</li>
            <li>{cautionData[0].time_diff}分</li>
          </ul>
          <div className="std_test_txt">
            <div className="txt_area">
              <p className="tit">試験中の注意事項</p>
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
                このブラウザは、videoタグに対応しません。
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
                このブラウザは、videoタグに対応しません。
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
                このブラウザは、videoタグに対応しません。
              </video>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default TestPrecautions;
