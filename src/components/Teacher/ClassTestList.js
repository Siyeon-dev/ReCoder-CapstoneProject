import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Loading from 'Components/User/Loading';

const ClassTestList = (classCode) => {
  const [selectClassTestInfo, setSelectClassTestInfo] = useState([]);
  const [flag, setFlag] = useState(false);


  useEffect(() => {
    MenuSelect(classCode);
  }, [classCode]);

  const MenuSelect =  (e) => {
    flag === true && setFlag(false);
    const data = {
      class_code : e.classCode,
    };

     axios
      .post("/classinfo", data)
      .then((res) => {
        setSelectClassTestInfo(res.data);
        res.data && setFlag(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ListUpdate = selectClassTestInfo.map((currElement) => (
    <tr>
      <th scope="row">{currElement.test_name}</th>
      <td>{currElement.questioncount}문항</td>
      <td>
        {currElement.test_start} ~{currElement.test_end}
      </td>
      <td>
        {currElement.t_test_status === 1 ? (
          <p className="tch_test_state complete">시험완료</p>
        ) : (
          <p className="tch_test_state start">시험시작</p>
        )}
      </td>
      <td>
        <button>
          <img src="/img/tch_test_delete_btn.png" alt="시험 삭제 버튼" />
        </button>
      </td>
    </tr>
  ));

  return flag === true ? (
    selectClassTestInfo.length === 0 ? (
      <div className="no_test_guide">
        생성된 시험이 없습니다. <span>먼저 시험을 생성해주세요.</span>
        <Link to="/createtestform">시험 생성하기</Link>
      </div>
    ) : (
      <div>
        <table className="tch_class_list_table">
          <colgroup>
            <col width="25%" />
            <col width="10%" />
            <col width="37%" />
            <col width="20%" />
            <col width="8%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">시험명</th>
              <th scope="col">문항수</th>
              <th scope="col">시험일시</th>
              <th scope="col">상태</th>
              <th scope="col">삭제</th>
            </tr>
          </thead>
          <tbody>{ListUpdate}</tbody>
        </table>
        <Link to="/createtestform" className="create_test_btn">
          <span>시험 생성하기</span>
        </Link>
      </div>
    )
  ) : (
    <>
      <Loading />
    </>
  );
};

export default ClassTestList
