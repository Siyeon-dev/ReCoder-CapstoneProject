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
  const [selectTestName, setSelectTestName] = useState([]);
  const [selectTesIdFlag, setSelectTesIdFlag] = useState(false);
  const [ddd, setDdd] = useState(0);
  const [aaa, setAaa] = useState(0);
  const [adasd, setAdasd] = useState([])

  // const aaa2 = e => { 
  //   //e.preventDefault();

  //   console.log(e);
  // }

  // const selectTestIdSaveData = (id) => { 
  //   const data = {
  //     test_id: id,
  //   };
  //   data.test_id !== undefined && setSelectTesIdFlag(true)
  //   console.log(data);
  //   selectTesIdFlag === true && setDdd(data);
  // }

  const Testdddd = (sd) => { 
    selectTesIdFlag === true && setSelectTesIdFlag(false)
        const data = {
          test_id: sd,
        };

        console.log(data);

        data.test_id !== 0 &&
          axios
            .post("/stateview", data)
            .then((res) => {
              console.log(res.data);
              setTestStdData(res.data);
              setSelectTesIdFlag(true)
            })
            .catch((err) => {
              console.log(err);
            });

    console.log(data.test_id);
    const weqwe = data.test_id !== 0 && selectClassTestInfo.length !== 0 ? selectClassTestInfo.filte((f) => data.test_id === f.test_id) : null
    setAdasd(weqwe);
    console.log(adasd);
  }

  const BottomStdData = (g) => {

    const SelectTestNameArray = 
      g !== 0 && selectClassTestInfo
        ? selectClassTestInfo.filter((f) => g === f.test_id)
        : null;
    
    SelectTestNameArray !== null &&
      setSelectTestName(SelectTestNameArray[0].test_name);

    console.log(selectTestName);
    return (
      selectClassTestInfo.length !== 0 && (
        <div className="bottom_std_list_area">
          <p className="tit">
            {g.test_id === undefined
              ? "시험 출제 리스트에서 시험을 선택해 주세요."
              : [{ selectTestName }] + " 응시자 목록"}
          </p>
          <table>
            <colgroup>
              <col width="25%" />
              <col width="13%" span="3" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">학생이름</th>
                <th scope="col">재응시횟수</th>
                <th scope="col">시선 경고횟수</th>
                <th scope="col">음성 경고횟수</th>
                <th scope="col">응시여부</th>
                <th scope="col">총점</th>
              </tr>
            </thead>
            <tbody>
              {testStdData.length !== 0 ? (
                testStdData.map((v) => (
                  <tr>
                    <td>
                      <div className="std_id">
                        {v.s_name}
                        <span>{v.s_email.split("@")[0]}</span>
                      </div>
                    </td>
                    <td>{v.s_retake}</td>
                    <td>{v.eye_caution}</td>
                    <td>{v.mic_caution}</td>
                    <td>
                      {v.test_validation === 0 ? (
                        <div className="test_status no_test">미응시</div>
                      ) : (
                        <div className="test_status complete">응시 완료</div>
                      )}
                    </td>
                    <td className="score">
                      <span>80</span> / {v.total_score}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colspan="6">아직 시험 응시 전입니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )
    );
  };


  const TopTestListData = () => {
    return emptyArrayCheckFlag === true ? (
      <tr>
        <td colspan="5">개설된 시험이 없습니다.</td>
      </tr>
    ) : (
      selectClassTestInfo.length !== 0 &&
        selectClassTestInfo.map((v, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>
              <button
                className="test_name"
                onClick={() => { 
                  setAaa(v.test_id);
                  Testdddd(aaa);
                }}>
              {v.test_name}
              </button>
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
    setTestStdData([]);
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
      {selectTesIdFlag === true &&
      
        <div className="bottom_std_list_area">
          <p className="tit">
            {adasd.test_id === 0
              ? "시험 출제 리스트에서 시험을 선택해 주세요."
              : [{ adasd }] + " 응시자 목록"}
          </p>
          <table>
            <colgroup>
              <col width="25%" />
              <col width="13%" span="3" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">학생이름</th>
                <th scope="col">재응시횟수</th>
                <th scope="col">시선 경고횟수</th>
                <th scope="col">음성 경고횟수</th>
                <th scope="col">응시여부</th>
                <th scope="col">총점</th>
              </tr>
            </thead>
            <tbody>
              {testStdData.length !== 0 ? (
                testStdData.map((v) => (
                  <tr>
                    <td>
                      <div className="std_id">
                        {v.s_name}
                        <span>{v.s_email.split("@")[0]}</span>
                      </div>
                    </td>
                    <td>{v.s_retake}</td>
                    <td>{v.eye_caution}</td>
                    <td>{v.mic_caution}</td>
                    <td>
                      {v.test_validation === 0 ? (
                        <div className="test_status no_test">미응시</div>
                      ) : (
                        <div className="test_status complete">응시 완료</div>
                      )}
                    </td>
                    <td className="score">
                      <span>80</span> / {v.total_score}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colspan="6">아직 시험 응시 전입니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>}
    </div>
  );
};

export default ClassStatistics;
