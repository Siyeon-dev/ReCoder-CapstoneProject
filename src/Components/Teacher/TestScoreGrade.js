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
                    <li>{v.questioncount}問題</li>
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
                      <th scope="col">学生の名前</th>
                      {/* <th scope="col">응시여부</th> */}
                      <th scope="col">受験回数</th>
                      <th scope="col">視線警告回数</th>
                      <th scope="col">音声警告回数</th>
                      <th scope="col">解こうとした問題 / 全問題</th>
                      <th scope="col">総点</th>
                      <th scope="col">採点状況</th>
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
            生成された試験がありません。
            <span>まず、試験を作ってください。</span>
            <Link to={`/createtestform/${classCodeParams.classCode}`}>
              試験生成
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
