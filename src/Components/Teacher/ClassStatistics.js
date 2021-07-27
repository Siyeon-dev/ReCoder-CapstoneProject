import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router";
import SelectTestStatistics from "./SelectTestStatistics";

const ClassStatistics = ({
  selectClassTestInfo,
  apiLoadingFlag,
  emptyArrayCheckFlag,
  classCode,
}) => {
  const [stateViewData, setStateViewData] = useState([]);
  const [stateViewDataFlag, setStateViewDataFlag] = useState(false);
  const [selectTestName, setSelectTestName] = useState("");
  const classCodeParams = useParams();

  const TestListDataLoop = (TestIdData) => {
    stateViewDataFlag === true && setStateViewDataFlag(false)
    const data = {
      test_id: String(TestIdData),
    };
    console.log(data);

    axios
      .post("/stateview", data)
      .then((res) => {
        setStateViewDataFlag(true);
        console.log(res.data);
        setStateViewData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const TopTableTestData = () => {
    return selectClassTestInfo.length !== 0 ? (
      selectClassTestInfo.map((v, index) => (
        <tr>
          <td>{index + 1}</td>
          <td>
            <button
              className="test_name"
              onClick={() => {
                TestListDataLoop(v.test_id);
                setSelectTestName(v.test_name);
              }}
            >
              {v.test_name}
            </button>
          </td>
          <td className="date">
            {v.test_start.slice(0, v.test_start.length - 3)} ~
            {v.test_end.slice(0, v.test_end.length - 3)}
          </td>
          <td className="person">
            <span>{v.complete_student}</span> / {v.total_student}
          </td>
          <td className="score">
            <span>{v.average_score}</span> / {v.total_score}
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="5">作られた試験がありません。</td>
      </tr>
    );
  };

  useEffect(() => {
    setSelectTestName("");
    setStateViewData([])
  }, [classCodeParams]);

  return (
    <div className="class_statistic_wrap">
      <div className="top_test_list_area">
        <p className="tit">試験出題リスト</p>
        <table>
          <colgroup>
            <col width="10%" />
            <col width="" />
            <col width="30%" />
            <col width="15%" />
            <col width="15%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">順番 </th>
              <th scope="col">試験名</th>
              <th scope="col">受験期間</th>
              <th scope="col">受験者数 / 総人数</th>
              <th scope="col">平均点</th>
            </tr>
          </thead>
          <tbody>{TopTableTestData()}</tbody>
        </table>
      </div>
      {
        <div className="bottom_std_list_area">
          <p className="tit">
            {selectTestName
              ? "[" + selectTestName + "] 試験の受験者目録"
              : "試験出題リストから試験を選択してください。"}
          </p>
          <SelectTestStatistics
            selectClassTestInfo={selectClassTestInfo}
            stateViewData={stateViewData}
            stateViewDataFlag={stateViewDataFlag}
          />
        </div>
      }
    </div>
  );
};

export default ClassStatistics;
