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
  classListEmptyArrayCheckFlag,
}) => {
  const classCodeParams = useParams();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [stateApiData, setStateApiData] = useState([]);
  const [stateApiDataFlag, setStateApiDataFlag] = useState(false);
  const [apiDataFlag, setapiDataFlag] = useState(false);

  const AccTestStdScoreList = (TestIdData) => {
    stateApiDataFlag === true && setStateApiDataFlag(false);
    apiDataFlag === true && setapiDataFlag(false);

    const data = {
      test_id: String(TestIdData),
      s_email: cookies.s_email,
    };
    axios
      .post("/stateview", data)
      .then((res) => {
        setapiDataFlag(true);
        Object.keys(res.data).length !== 0
          ? setStateApiData(res.data)
          : setStateApiDataFlag(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Accordion>
      {classListEmptyArrayCheckFlag === true ? (
        <div className="no_create_guide std_no_test">
          아직 클래스에 생성된 시험이 없습니다.
          <span>시험이 생성되면 시험리스트가 업데이트됩니다.</span>
        </div>
      ) : emptyArrayCheckFlag === false && selectClassTestInfo ? (
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
                    {v.test_start} ~ {v.test_end}
                  </li>
                </ul>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <table>
                <thead>
                  <tr>
                    <th scope="col">응시횟수</th>
                    <th scope="col">음성경고횟수</th>
                    <th scope="col">시선경고횟수</th>
                    {/* <th scope="col">응시여부</th> */}
                    <th scope="col">총점</th>
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
        <div className="no_create_guide std_no_test">
          아직 클래스에 생성된 시험이 없습니다.
          <span>시험이 생성되면 시험리스트가 업데이트됩니다.</span>
        </div>
      )}
    </Accordion>
  );
};

export default TestScoreGrade;
