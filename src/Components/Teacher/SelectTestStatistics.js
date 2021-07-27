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
          <col width="20%" span="3" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">学生の名前</th>
            <th scope="col">受験回数</th>
            <th scope="col">視線警告回数</th>
            <th scope="col">音声警告回数</th>
            {/* <th scope="col">응시여부</th> */}
            <th scope="col">総点</th>
          </tr>
        </thead>
        <tbody>
          {stateViewData.length !== 0
            ? stateViewData.map((v) => {
                return (
                  <tr>
                    <td>
                      <div className="std_id">
                        {v.s_name}
                        <span>{v.s_email.split("@")[0]}</span>
                      </div>
                    </td>
                    <td>{v.s_retake}回</td>
                    <td>{v.eye_caution}回</td>
                    <td>{v.mic_caution}回</td>
                    {/* <td>
                    {v.test_validation === 0 ? (
                      <div className="test_status no_test">미응시</div>
                    ) : (
                      <div className="test_status complete">응시 완료</div>
                    )}
                  </td> */}
                    <td className="score">
                      <span>
                        {v.question_grade === null ? 0 : v.question_grade}
                      </span>{" "}
                      / {v.total_score}
                    </td>
                  </tr>
                );
              })
            : dataEmptyFlag === true && (
                <tr>
                  <td colspan="6">まだ試験を受ける前です。</td>
                </tr>
              )}
        </tbody>
      </table>
    )
  );
};

export default SelectTestStatistics;
