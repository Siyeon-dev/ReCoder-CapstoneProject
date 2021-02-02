import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import CreateClass from "Components/Modal/CreateClass";
import DeleteClass from "Components/Modal/DeleteClass";

const ContSideMenu = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [userClassInfo, setUserClassInfo] = useState([]);

  const readClass = () => {
    let userEmail;

    if (cookies.t_email) {
      userEmail = { t_email: cookies.t_email };
    } else if (cookies.s_email) {
      userEmail = { s_email: cookies.s_email };
    } else {
      return null;
    }
    axios
      .post("classlist", userEmail)
      .then((res) => {
        setUserClassInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    readClass();
  }, []);

  const classListUpdate = () => {
    if (userClassInfo.length === 0) {
      return <li className="no_class_list">생성된 클래스가 없습니다.</li>;
    } else {
      const ListUpdate = userClassInfo.map((currElement) => (
        <li>
          <Link to="">
            {currElement.class_name} <span>{currElement.class_code}</span>
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
              <CreateClass
                readClass={readClass}
                classListUpdate={classListUpdate}
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
        <li>
          <Link to="">시험 체험하기</Link>
        </li>
      </ul>
    </div>
  );
};

export default ContSideMenu;
