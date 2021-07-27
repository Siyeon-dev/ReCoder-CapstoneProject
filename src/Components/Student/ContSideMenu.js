import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import JoinClass from "Components/Modal/JoinClass";
import DeleteClass from "Components/Modal/DeleteClass";

const ContSideMenu = ({
  userClassInfo,
  setclassCode,
  readClass,
  setClassJoinAppRecognize,
}) => {
  const MenuState = useParams();
  const [selectClassCode, setSelectClassCode] = useState("");

  const MenuSelectState =
    userClassInfo.length !== 0 && MenuState.classCode === undefined
      ? userClassInfo[0].class_code
      : MenuState.classCode;
  
  const MenuSelectClassCode = () => { 
    userClassInfo.length !== 0 && MenuState.classCode === undefined
      ? setSelectClassCode(userClassInfo[0].class_code)
      : setSelectClassCode(MenuState.classCode);
  }

  const classListUpdate = () => {
    if (userClassInfo.length === 0) {
      return <li className="no_class_list">加入したクラスがありません。</li>;
    } else {
      const ListUpdate = userClassInfo.map((currElement) => (
        <li>
          <Link
            className={
              currElement.recognize !== 0 &&
              currElement.class_code === MenuSelectState
                ? "on"
                : ""
            }
            to={
              currElement.recognize !== 0
                ? `/student/${currElement.class_code}`
                : `/student/${selectClassCode.length !== 0 && selectClassCode}`
            }
            onClick={() => {
              MenuSelectClassCode();
              if (currElement.recognize !== 0) {
                setclassCode(currElement.class_code);
                setClassJoinAppRecognize(currElement.recognize);
              } else {
                alert("まだ加入承認中です。");
              }
            }}
          >
            {currElement.class_name}
            <span>{currElement.recognize === 0 ? "(加入承認中)" : ""} </span>
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
            <p>私のクラス</p>
            <div className="nav_tit_btn">
              <JoinClass
                readClass={readClass}
                classListUpdate={classListUpdate}
                userClassInfo={userClassInfo}
              />
              {/* <DeleteClass
                readClass={readClass}
                classListUpdate={classListUpdate}
                userClassInfo={userClassInfo}
              /> */}
            </div>
          </div>
          <ul className="dep2">{classListUpdate()}</ul>
        </li>
        <li>
          <Link to="/studentcasssatistics">試験統計</Link>
        </li>
      </ul>
    </div>
  );
};

export default ContSideMenu;
