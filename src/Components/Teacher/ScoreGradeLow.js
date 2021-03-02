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
          <th scope="row">
            <div className="std_id">
              {v.s_name} <span>{v.s_email.split("@")[0]}</span>
            </div>
          </th>
          <td>
            {v.test_validation === 0 ? (
              <div className="test_status no_test">미응시</div>
            ) : (
              <div className="test_status complete">응시 완료</div>
            )}
          </td>
          <td>{v.s_retake}회</td>
          <td>{v.eye_caution}회</td>
          <td>{v.mic_caution}회</td>
          <td>
            <span className="mint">{v.compile_count}</span>/{v.question_count}
          </td>
          <td>
            <span className="blue">50</span>/ {v.total_score}
          </td>
          <td>
            <Link
              to={`/testscoringpage/${v.test_id}`}
              className="score_grade_btn after"
              onClick={() => setCookie("s_email", v.s_email)}
            >
              채점완료
            </Link>
          </td>
        </tr>
      )))
    ) : (
      <tr>
        <td colSpan="8">아직 진행 되지 않은 시험입니다.</td>
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
