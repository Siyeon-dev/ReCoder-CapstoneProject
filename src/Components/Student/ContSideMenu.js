import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import JoinClass from "Components/Modal/JoinClass";
import DeleteClass from "Components/Modal/DeleteClass";

const ContSideMenu = ({ userClassInfo, setclassCode, readClass }) => {
  const MenuState = useParams();

  const MenuSelectState =
    userClassInfo.length !== 0 && MenuState.classCode === undefined
      ? userClassInfo[0].class_code
      : MenuState.classCode;

  const classListUpdate = () => {
    if (userClassInfo.length === 0) {
      return <li className="no_class_list">가입된 클래스가 없습니다.</li>;
    } else {
      const ListUpdate = userClassInfo.map((currElement) => (
        <li>
          <Link
            className={currElement.class_code === MenuSelectState ? "on" : ""}
            to={`/student/${currElement.class_code}`}
            onClick={() => {
              currElement.recognize !== 0
                ? setclassCode(currElement.class_code)
                : alert("아직 가입 승인중입니다.");
            }}
          >
            {currElement.class_name}
            <span>{currElement.recognize === 0 ? "(가입승인중)" : ""} </span>
          </Link>
        </li>
      ));
      return ListUpdate;
    }
  };

  return (
    <div id="nav_menu">
      <ul>
        <li>
          <div className="nav_tit">
            <p>나의 클래스</p>
            <div className="nav_tit_btn">
              <JoinClass
                readClass={readClass}
                classListUpdate={classListUpdate}
                userClassInfo={userClassInfo}
              />
              <DeleteClass
                readClass={readClass}
                classListUpdate={classListUpdate}
                userClassInfo={userClassInfo}
              />
            </div>
          </div>
          <ul className="dep2">{classListUpdate()}</ul>
        </li>
        <li>
          <Link to="">시험 통계</Link>
        </li>
      </ul>
    </div>
  );
};

export default ContSideMenu;
