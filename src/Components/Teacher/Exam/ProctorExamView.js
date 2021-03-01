import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import * as janus from "../../../modules/examPromoter";
import ProctorExamVideo from "./ProctorExamVideo";

const ProctorExamView = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [stdDataCookies, setStdDataCookies] = useState([]);

  useEffect(() => {
    janus.runJanusTeacher();
    
    console.log(cookies.std_data);
    cookies.std_data !== undefined && setStdDataCookies(...cookies.std_data);
    console.log(stdDataCookies);
  }, [cookies.std_data]);

  return (
    <div className="proctor_exam_container">
      <div className="side_list_area">
        <p className="tit">
          학생 목록
          <div>
            <span>6</span>/30
          </div>
        </p>
        <ul>
          <li>
            이구슬 <span>마이크 on</span>
          </li>
          <li>
            박시연 <span>마이크 on</span>
          </li>
          <li>
            손형탁 <span>마이크 on</span>
          </li>
          <li>
            김원형 <span>마이크 on</span>
          </li>
        </ul>
        <div className="btn_wrap">
          <div>경고주기</div>
          <Link
            to={`/teacher`}
            onClick={() => {
              removeCookie("std_data");
              setStdDataCookies([]);
            }}
          >
            나가기
          </Link>
        </div>
      </div>
      <div className="video_area">
        <div className="tit_area">
          <p>2020학년도 1학기 중간고사</p>
          <ul className="status_desc">
            <li className="voice">음성 포커싱</li>
            <li className="cheating">부정행위경고</li>
          </ul>
        </div>
        <div className="video_area_align">
          <ProctorExamVideo
            stdDataCookies={stdDataCookies}
          />
        </div>
      </div>
    </div>
  );
};

export default ProctorExamView;
