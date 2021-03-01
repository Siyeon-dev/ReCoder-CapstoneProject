import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory, useParams } from "react-router-dom";
import * as Ace from "../../modules/editor";
import parse from "html-react-parser";

let consoleMessages = [];
let consoleLogList = null;

const TestScoringPage = () => {
  const testIdParams = useParams();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [gradingDataArray, setGradingDataArray] = useState([]);
  const [selectGradingDataArray, setSelectGradingDataArray] = useState([]);
  const [apiDataFlag, setApiDataFlag] = useState(false);
  const [selectApiDataFlag, setSelectApiDataFlag] = useState(true);
  const [testLang, setTestLang] = useState([]);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [scoringTestNum, setScoringTestNum] = useState(0);
  const inputScore = useRef();
  const history = useHistory();

  const ScoringApiData = () => {
    apiDataFlag === true && setApiDataFlag(false);
    const data = {
      test_id: testIdParams.testId,
      s_email: cookies.s_email,
    };

    console.log(data);
    data &&
      axios
        .post("/testgradingpage", data)
        .then((res) => {
          setApiDataFlag(true);
          console.log(res.data);
          setGradingDataArray(res.data);
          setSelectGradingDataArray([res.data[0]]);
          console.log(selectGradingDataArray[0].compile_code);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  useEffect(() => {
    ScoringApiData();
    console.log(apiDataFlag);
    console.log(selectGradingDataArray);
  }, []);

  useEffect(() => {
    Object.keys(selectGradingDataArray).length !== 0 &&
      Ace.codeEditor.setValue(selectGradingDataArray[0].compile_code);
  }, [selectGradingDataArray]);

  // useEffect(() => {
  //   Object.keys(selectGradingDataArray).length !== 0 &&
  //     Ace.codeEditor.setValue(selectGradingDataArray[0].compile_code);
  // }, [gradingDataArray]);

  useEffect(() => {
    /* API에서 학생 시험 종류 받아오기 */
    Ace.editorLib.setModeEditor(testLang);

    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  // Ace Code Editor Run
  const runCompile = () => {
    Ace.editorLib.clearConsoleScreen(consoleMessages, consoleLogList);

    // Get input from the code editor
    const userCode = Ace.codeEditor.getValue();
    // Run the user code
    try {
      new Function(userCode)();
    } catch (err) {
      console.error(err);
    }

    // Print to the console
    Ace.editorLib.printConsole(consoleMessages, consoleLogList);
  };

  // Ace Code Editor
  useEffect(() => {
    Ace.editorLib.init();
    consoleLogList = document.getElementById("editor__console-logs");
    // define a new console
    var console = (function (oldCons) {
      return {
        log: function (text) {
          oldCons.log(text);

          consoleMessages.push({
            message: text,
          });
        },
        info: function (text) {
          oldCons.info(text);
        },
        warn: function (text) {
          oldCons.warn(text);
        },
        error: function (text) {
          oldCons.error(text);
        },
      };
    })(window.console);

    //Then redefine the old console
    window.console = console;
  }, []);

  const selectTestNumFunction = (e) => {
    const ScoreTestNum = e.target.value;
    Object.keys(gradingDataArray[ScoreTestNum]).length !== 0
      ? setSelectGradingDataArray([gradingDataArray[ScoreTestNum]])
      : setSelectApiDataFlag(false);

    Ace.codeEditor.setValue(
      selectGradingDataArray
        ? selectGradingDataArray[0].compile_code
        : "console.log('hello world');"
    );
    console.log(selectGradingDataArray);
  };

  const TestGradingApi = (e) => {
    e.preventDefault();

    const data = {
      question_grade: inputScore.current.value,
      s_email: cookies.s_email,
      test_id: testIdParams.testId,
      question_id: "58",
    };

    console.log(data);

    // data &&
    //   axios
    //     .post("/testgrading", data)
    //     .then((res) => {
    //       console.log(res.data);
    //       alert("점수 저장이 완료되었습니다.")
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
  };

  const ScoreExit = () => {
    history.push("/teacher");
    removeCookie("s_email");
  };

  return (
    <div className="test_screen_wrapper">
      <div className="test_screen_top">
        <div className="logo">
          <img src="../img/test_screen_logo.gif" alt="Re:Coder" />
        </div>
        <ul>
          <li>우당탕탕웹디제이</li>
          <li>2020학년도 1학기 중간고사</li>
        </ul>
      </div>
      <div className="test_scren_nav">
        <p className="quiz_num">문제1</p>
        <div className="test_select">
          <select
            name="test_start_time"
            id="slct"
            onChange={selectTestNumFunction}
          >
            {apiDataFlag &&
              gradingDataArray.map((v, index) => (
                <option value={index} selected={index === 0}>
                  문제 {index + 1}
                </option>
              ))}
          </select>
        </div>
        <ul>
          <li className="std_name">학생 : 이구슬</li>
          <li>
            <input type="button" value="채점 종료" onClick={() => ScoreExit()} />
          </li>
        </ul>
      </div>

      <div className="std_test_area">
        <div className="std_test_wrapper">
          <div className="test_guide_section">
            <div className="scroll_area">
              {parse(
                apiDataFlag && Object.keys(selectGradingDataArray).length !== 0
                  ? String(selectGradingDataArray[0].question_text)
                  : `<p>문제를 불러오는 중입니다.</p>`
              )}
            </div>
          </div>
          <div className="middle_bar"></div>
          <div className="code_editor_section">
            <div id="overlay_div">
              <div className="std_coding_area">
                <div className="coding_nav">
                  <p className="file_name">Soulution.Java</p>
                  <ul>
                    <li className="test_score_form">
                      <form onSubmit={TestGradingApi}>
                        <input ref={inputScore} type="text" />
                        <button>점수입력</button>
                      </form>
                    </li>
                    <li>JAVA</li>
                    <li className="compile_btn" onClick={runCompile}>
                      컴파일 하기
                    </li>
                  </ul>
                </div>
                <div className="code_compiler_area" id="editorCode"></div>
                <div className="code_compiler_result">
                  <p className="tit">실행결과</p>
                  <div className="scroll_area">
                    {
                      /* 코드 실행 결과 */
                      <ul
                        className="editor__console-logs"
                        id="editor__console-logs"
                      ></ul>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestScoringPage;
