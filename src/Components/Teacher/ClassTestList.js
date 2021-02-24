import React, { useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import Loading from 'Components/User/Loading';

const ClassTestList = ({
  selectClassTestInfo,
  classCode,
  apiLoadingFlag,
  emptyArrayCheckFlag
}) => {
  const classCodeParams = useParams();

  console.log(selectClassTestInfo);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  return apiLoadingFlag === true ? ( // api 값을 받아 왔는지
    emptyArrayCheckFlag === true ? ( // 값이 있는지 없는지
      <div className="no_create_guide test">
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
