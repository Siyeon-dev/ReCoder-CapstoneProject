import axios from "axios";
import Loading from "Components/User/Loading";
import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { useCookies } from "react-cookie";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ScoreGradeLow from "./ScoreGradeLow";

const TestScoreGrade = ({
  apiLoadingFlag,
  selectClassTestInfo,
  emptyArrayCheckFlag,
}) => {
  const classCodeParams = useParams();
  const [stateApiData, setStateApiData] = useState([]);
  const [stateApiDataFlag, setStateApiDataFlag] = useState(false);
  const [apiDataFlag, setapiDataFlag] = useState(false);

  const AccTestStdScoreList = (TestIdData) => {
    stateApiDataFlag === true && setStateApiDataFlag(false);
    apiDataFlag === true && setapiDataFlag(false);

    const data = {
      test_id: String(TestIdData),
    };
    axios
      .post("/stateview", data)
      .then((res) => {
        setapiDataFlag(true);
        Object.keys(res.data).length !== 0
          ? setStateApiData(res.data)
          : setStateApiDataFlag(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Accordion>
      {apiLoadingFlag === true ? (
        emptyArrayCheckFlag === false && selectClassTestInfo ? (
          selectClassTestInfo.map((v) => (
            <AccordionItem>
              <AccordionItemHeading
                onClick={() => AccTestStdScoreList(v.test_id)}
              >
                <AccordionItemButton>
                  <ul>
                    <li className="tit">{v.test_name}</li>
                    <li>{v.questioncount}문항</li>
                    <li>
                      {v.test_start.slice(0, v.test_start.length - 3)} ~
                      {v.test_end.slice(0, v.test_end.length - 3)}
                    </li>
                  </ul>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <table>
                  <thead>
                    <tr>
                      <th scope="col">학생이름</th>
                      {/* <th scope="col">응시여부</th> */}
                      <th scope="col">응시횟수</th>
                      <th scope="col">시선경고</th>
                      <th scope="col">음성경고</th>
                      <th scope="col">시도한 문제 / 총 문제</th>
                      <th scope="col">총점</th>
                      <th scope="col">채점여부</th>
                    </tr>
                  </thead>
                  <tbody>
                    <ScoreGradeLow
                      apiDataFlag={apiDataFlag}
                      stateApiDataFlag={stateApiDataFlag}
                      stateApiData={stateApiData}
                    />
                  </tbody>
                </table>
              </AccordionItemPanel>
            </AccordionItem>
          ))
        ) : (
          <div className="no_create_guide test">
            생성된 시험이 없습니다. <span>먼저 시험을 생성해주세요.</span>
            <Link to={`/createtestform/${classCodeParams.classCode}`}>
              시험 생성하기
            </Link>
          </div>
        )
      ) : (
        <Loading />
      )}
    </Accordion>
  );
};

export default TestScoreGrade;
