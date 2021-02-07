import React from "react";
import { Link } from "react-router-dom";

const ContTitle = () => {
  return (
    <div className="cont_tit">
      <p className="eng_txt">className :</p>
      <p className="class_name">우당탕탕 웹디제이</p>

      <div className="test_info">
        <p className="test_num">
          전체 시험 수 <span className="mint">10</span>개
        </p>
        <p className="test_std">
          전체 학생 수 <span className="blue">30</span>명
        </p>
      </div>
    </div>
  );
};

export default ContTitle;
