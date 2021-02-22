import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import Loading from 'Components/User/Loading';

const ClassTestList = ({ classCode, setClassStdNum, setClassTestNum }) => {
  const [selectClassTestInfo, setSelectClassTestInfo] = useState([]);
  const [arrayValues, setArrayValues] = useState("");
  const classCodeParams = useParams();
  const [flag, setFlag] = useState(false);
  const [emptyArrayCheckFlag, setEmptyArrayCheckFlag] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    classCode.length === 0
      ? MenuSelect(classCodeParams.classCode)
      : MenuSelect(classCode);
  }, [classCode]);

  const MenuSelect = (e) => {
    flag === true && setFlag(false);

    let classCodeDataCheck = e;
    const data = {
      class_code: classCodeDataCheck !== undefined ? classCodeDataCheck : null,
    };

    data.class_code !== null &&
      axios
        .post("/classinfo", data)
        .then((res) => {
          emptyArrayCheckFlag === true && setEmptyArrayCheckFlag(false);
          res.data && setFlag(true);

          res.data.hasOwnProperty("mes")
            ? setEmptyArrayCheckFlag(true)
            : setSelectClassTestInfo(res.data);

          res.data.length === undefined
            ? setClassTestNum(0)
            : setClassTestNum(res.data.length);
          
          res.data.length === undefined
            ? setClassStdNum(0)
            : setClassStdNum(res.data[0].student_count);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  useEffect(() => {
    console.log(selectClassTestInfo);
    console.log(emptyArrayCheckFlag);
  }, []);

  const ListUpdate = () => {
    return emptyArrayCheckFlag === false && selectClassTestInfo ? (
      selectClassTestInfo.map((currElement) => (
        <tr>
          <th scope="row">{currElement.test_name}</th>
          <td>{currElement.questioncount}문항</td>
          <td>
            {currElement.test_start} ~{currElement.test_end}
          </td>
          <td>
            {currElement.t_test_status === 1 ? (
              <Link to="/proctorexamview" className="tch_test_state complete">
                시험완료
              </Link>
            ) : (
              <Link to="/proctorexamview" className="tch_test_state start">
                시험시작
              </Link>
            )}
          </td>
          <td>
            <button onClick={() => TestListDelete(currElement.test_id)}>
              <img src="/img/tch_test_delete_btn.png" alt="시험 삭제 버튼" />
            </button>
          </td>
        </tr>
      ))
    ) : (
      <Loading />
    );
  };

  const TestListDelete = (props) => {
    let data = {
      test_id: props,
    };
    console.log(data);

    axios
      .post("/examdelete", data)
      .then((res) => {
        console.log(res.data);
        alert("삭제되었습니다.");
        window.location.replace(`/teacher/${classCode}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return flag === true ? (
    emptyArrayCheckFlag === true ? (
      <div className="no_test_guide">
        생성된 시험이 없습니다. <span>먼저 시험을 생성해주세요.</span>
        <Link to={`/createtestform/${classCode}`}>시험 생성하기</Link>
      </div>
    ) : (
      <div className="tch_test_area">
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
          <tbody>{ListUpdate()}</tbody>
        </table>
        <Link
          to={`/createtestform/${classCodeParams.classCode}`}
          className="create_test_btn"
        >
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
