import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const ClassStatistics = ({
  selectClassTestInfo,
  apiLoadingFlag,
  emptyArrayCheckFlag,
  classCode,
}) => {
  const [testStdData, setTestStdData] = useState([]);
  const [functionDataEmptyFlag, setFunctionDataEmptyFlag] = useState(
    emptyArrayCheckFlag
  );

  const BottomStdData = (testId) => {
    const data = {
      test_id: testId,
    };

    console.log(data);

    data &&
      axios
        .post("/stateview", data)
        .then((res) => {
          console.log(res.data);
          //setTestStdData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

    // testStdData.map((v) => (
    //   <tr>
    //     <td>
    //       <div className="std_id">
    //         {v.s_name}
    //         <span>{v.s_email}</span>
    //       </div>
    //     </td>
    //     <td>2회</td>
    //     <td>2회</td>
    //     <td>
    //       <div className="test_status no_test">미응시</div>
    //     </td>
    //     <td className="score">
    //       <span>80</span> / 100
    //     </td>
    //   </tr>
    //));
  };

  const TopTestListData = () => {

    return emptyArrayCheckFlag === true ? (
      <tr>
        <td colspan="5">개설된 시험이 없습니다.</td>
      </tr>
    ) : (
      selectClassTestInfo.length !== 0 && selectClassTestInfo.map((v, index) => (
        <tr>
          <td>{index + 1}</td>
          <td>
            <div className="test_name" onClick={() => BottomStdData(v.test_id)}>
              {v.test_name}
            </div>
          </td>
          <td className="date">
            {v.test_start} ~ {v.test_end}
          </td>
          <td className="person">
            <span>28</span> / 30
          </td>
          <td className="score">
            <span>80</span> / 100
          </td>
        </tr>
      ))
    );
  };

  useEffect(() => {
    TopTestListData();
  }, [classCode]);

  return (
    <div className="class_statistic_wrap">
      <div className="top_test_list_area">
        <p className="tit">시험 출제 리스트</p>
        <table>
          <colgroup>
            <col width="10%" />
            <col width="25%" />
            <col width="" />
            <col width="15%" />
            <col width="15%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">순번 </th>
              <th scope="col">시험명칭</th>
              <th scope="col">응시기간</th>
              <th scope="col">응시인원 / 총 인원</th>
              <th scope="col">평균 점수</th>
            </tr>
          </thead>
          <tbody>{TopTestListData()}</tbody>
        </table>
      </div>
      <div className="bottom_std_list_area">
        <p className="tit">[2020학년도 1학기 중간고사] 응시자 목록</p>
        <table>
          <colgroup>
            <col width="30%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">학생이름</th>
              <th scope="col">재응시횟수</th>
              <th scope="col">경고횟수</th>
              <th scope="col">응시여부</th>
              <th scope="col">총점</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="std_id">
                  이구슬<span>rntmf1247</span>
                </div>
              </td>
              <td>2회</td>
              <td>2회</td>
              <td>
                <div className="test_status no_test">미응시</div>
              </td>
              <td className="score">
                <span>80</span> / 100
              </td>
            </tr>
            <tr>
              <td>
                <div className="std_id">
                  이구슬<span>rntmf1247</span>
                </div>
              </td>
              <td>2회</td>
              <td>2회</td>
              <td>
                <div className="test_status complete">응시완료</div>
              </td>
              <td className="score">
                <span>80</span> / 100
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassStatistics;
