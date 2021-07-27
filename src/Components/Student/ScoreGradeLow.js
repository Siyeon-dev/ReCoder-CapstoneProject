import Loading from 'Components/User/Loading';
import React from 'react'
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

const ScoreGradeLow = ({ apiDataFlag, stateApiDataFlag, stateApiData }) => {
  const [cookies, setCookie, removeCookie] = useCookies();

  console.log(stateApiData);
  return apiDataFlag === true ? (
    stateApiDataFlag === false ? (
      (console.log(stateApiData),
      stateApiData.map((v) => (
        <tr>
          <td>{v.s_retake}回</td>
          <td>{v.mic_caution}回</td>
          <td>{v.eye_caution}回</td>
          {/* <td>
            {v.test_validation === 0 ? (
              <div className="test_status no_test">미응시</div>
            ) : (
              <div className="test_status complete">응시 완료</div>
            )}
          </td> */}
          {/* <td>
            <div className="test_status complete">응시 완료</div>
          </td> */}
          <td>
            <span className="blue">
              {v.student_score === null ? 0 : v.student_score}
            </span>
            / {v.total_score}
          </td>
        </tr>
      )))
    ) : (
      <tr>
        <td colSpan="8">まだ進行されていない試験です。</td>
      </tr>
    )
  ) : (
    <tr>
      <td colSpan="8">
        <Loading />
      </td>
    </tr>
  );
};

export default ScoreGradeLow
