import React, { useEffect, useState } from "react";

const SelectTestStatistics = ({
  selectClassTestInfo,
  stateViewData,
  stateViewDataFlag,
}) => {
  console.log(stateViewData);

  const [dataEmptyFlag, setDataEmptyFlag] = useState(false);

  useEffect(() => {
    dataEmptyFlag === true && setDataEmptyFlag(false);
    stateViewData &&
      Object.keys(stateViewData).length === 0 &&
      setDataEmptyFlag(true);

    console.log(dataEmptyFlag);
  }, [stateViewData]);

  return (
    selectClassTestInfo.length !== 0 &&
    stateViewDataFlag === true && (
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
          {stateViewData.length !== 0 ? (
            stateViewData.map((v) => {
              return (
                <tr>
                  <td>
                    <div className="std_id">
                      {v.s_name}
                      <span>{v.s_email.split("@")[0]}</span>
                    </div>
                  </td>
                  <td>{v.s_retake}회</td>
                  <td>{v.eye_caution}회</td>
                  <td>{v.mic_caution}회</td>
                  <td>
                    {v.test_validation === 0 ? (
                      <div className="test_status no_test">미응시</div>
                    ) : (
                      <div className="test_status complete">응시 완료</div>
                    )}
                  </td>
                  <td className="score">
                    <span>{v.question_grade === null ? 0 : v.question_grade}</span> / {v.total_score}
                  </td>
                </tr>
              );
            })
          ) : dataEmptyFlag === true && (
            <tr>
              <td colspan="6">아직 시험 응시 전입니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  );
};

export default SelectTestStatistics;
