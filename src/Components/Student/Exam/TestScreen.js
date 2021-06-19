import axios from "axios";
import { Hook } from "console-feed";
import { Editor } from "draft-js";
import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import parse from "html-react-parser";
import socketio from "socket.io-client";

import * as Ace from "../../../modules/editor";
import { useCookies } from "react-cookie";

let consoleMessages = [];
let consoleLogList = null;
const socket = socketio.connect("http://18.215.120.133:3001");

const TestScreen = () => {
  const [isLoding, setIsLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  const TestCodeParams = useParams();
  const history = useHistory();
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [testListData, setTestListData] = useState([]);
  const [selectTestListData, setSelectTestListData] = useState([]);
  const [userCodeData, setUserCodeData] = useState([]);
  const [userCodeResultData, setUserCodeResultData] = useState([]);
  const [commandDataList, setCommandDataList] = useState(0);
  const [quizId, setQuizId] = useState();
  const [apiCount, setApiCount] = useState(0);
  const [currentTestNum, setCurrentTestNum] = useState(1);
  const [testCompleteBtn, setTestCompleteBtn] = useState("제출하기");
  const [resultArray, setResultArray] = useState([]);
  const [testLang, setTestLang] = useState("");
  const [questionCode, setQuestionCode] = useState("");


  useEffect(() => {
    console.log(cookies.s_email);
    console.log(TestCodeParams.testId);
	  
    console.log("학생 참가 Socket 체크");
    socket.emit("join", {
      s_email: cookies.s_email,
      test_id: Number(TestCodeParams.testId),
    });

    socket.on(
      "receive message", (message) => {
        console.log(message);
      }
    );

    // socket.on("m_room_out", (msg) => {
    //   console.log("room_out !!");
    //   console.log(msg);
    //   history.push("/student");
    // });
  }, []);

  const TestTimeOur = () => {
    alert("제출 시간이 다되어 시험이 종료됩니다.");
    history.push("/student");
  };

  useEffect(() => {
    String(seconds) === "0" && String(minutes) === "0" && TestTimeOur();
  }, [seconds]);

  useEffect(() => {
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
    // setUserCodeData(userCode);
    setUserCodeResultData(Ace.codeEditor.getValue());
    // Run the user code
    try {
      new Function(userCode)();
    } catch (err) {
      console.error(err);
    }

    // Print to the console
    Ace.editorLib.printConsole(consoleMessages, consoleLogList);

    // Object.keys(userCodeData).length !== 0 && CompileApi();
  };

  // useEffect(() => {
  //   console.log(Ace.codeEditor.getValue());
  // },[userCodeData])

  const StdTestInfoApi = () => {
    const data = {
      test_id: TestCodeParams.testId,
    };

    console.log(data);
    axios
      .post("/testpaper", data)
      .then((res) => {
        setTestLang(res["data"][0]["test_lang"]);
        setQuestionCode(res["data"][0]["question_code"]);
        setTestListData(res.data);
        setSelectTestListData([res.data[0]]);
        setResultArray(new Array(res.data.length));
        setQuizId(String(res.data[0].question_id));
        setMinutes(res.data[0].time_diff);
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SelectTestChange = (e) => {
    const selectTestNum = e.target.value;
    const data = Ace.codeEditor.getValue();
    resultArray[parseInt(currentTestNum) - 1] = data;
    setResultArray([...resultArray]);

    setCurrentTestNum(parseInt(selectTestNum) + 1);
    setSelectTestListData([testListData[selectTestNum]]);
    setQuizId(testListData[selectTestNum].question_id);
    Ace.codeEditor.setValue(
      resultArray[selectTestNum]
        ? resultArray[selectTestNum]
        : "console.log('hello world');"
    );
    Ace.editorLib.clearConsoleScreen(consoleMessages, consoleLogList);

    console.log(resultArray[0]);
  };

  // Ace Code Editor
  useEffect(() => {
    StdTestInfoApi();

    /* API에서 학생 시험 종류 받아오기 */
    /**
     * questionCode: 미리 제공되는 코드
     * testLang: 시험 언어 종류
     */
    Ace.editorLib.init(questionCode, testLang);
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
  }, [questionCode]);

  const CompileApi = () => {
    const ApiCommand = commandDataList === 0 ? "insert" : "update";

    const data = {
      s_email: cookies.s_email,
      question_id: quizId,
      test_id: TestCodeParams.testId,
      compile_code: Ace.codeEditor.getValue(),
      //compile_result: userCodeResultData,
      command: ApiCommand,
    };

    setCommandDataList(quizId);
    console.log(userCodeData);

    console.log(data);

    data !== undefined &&
      axios
        .post("/compile", data)
        .then((res) => {
          console.log(res.data);
          setApiCount(1);
          setCommandDataList(1);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const testCompleteBtnState = () => {
    testCompleteBtn === "제출하기" && setTestCompleteBtn("제출완료");
    testCompleteBtn === "제출완료" &&
      alert("시험 최종 제출이 완료되어 시험이 종료되었습니다.");
    socket.emit("room_out", {
      test_id: Number(TestCodeParams.testId),
    });
    history.push("/student");
    socket.disconnect();
    
    return testCompleteBtn;
  };

  const SelectLang = (testLang) => {
    return testLang === "JavaScript" ? (
      <span>js</span>
    ) : testLang === "PHP" ? (
      <span>php</span>
    ) : testLang === "Java" ? (
      <span>java</span>
    ) : testLang === "Python" ? (
      <span>py</span>
    ) : null;
  };

  return (
    <div className="test_screen_wrapper">
      <div className="test_screen_top">
        <div className="logo">
          <img src="/img/test_screen_logo.gif" alt="Re:Coder" />
        </div>
        <ul>
          <li>{TestCodeParams.testName}</li>
        </ul>
      </div>
      <div className="test_scren_nav">
        <p className="quiz_num">문제 {currentTestNum}</p>
        <div className="test_select">
          <select name="test_start_time" id="slct" onChange={SelectTestChange}>
            {testListData.map((v, index) => (
              <option value={index} selected={index === 0}>
                문제 {index + 1}
              </option>
            ))}
          </select>
        </div>
        <ul>
          <li className="test_time_limit">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </li>
          <li>
            <input
              type="button"
              value={testCompleteBtn}
              onClick={() => testCompleteBtnState()}
            ></input>
          </li>
          {/* <li>문의하기</li> 2021.02.16 보류 */}
        </ul>
      </div>

      <div className="std_test_area">
        <div className="std_test_wrapper">
          <div className="test_guide_section">
            <div className="scroll_area">
              {parse(
                isLoding
                  ? selectTestListData[0].question_text
                  : `<p>문제를 불러오는 중입니다.</p>`
              )}
            </div>
          </div>
          <div className="middle_bar"></div>
          <div className="code_editor_section">
            <div id="overlay_div">
              <div className="std_coding_area">
                <div className="coding_nav">
                  <p className="file_name">
                    Soulution.
                    {testLang && SelectLang(testLang)}
                  </p>
                  <ul>
                    <li>{testLang}</li>
                    <li
                      className="compile_btn"
                      onClick={(e) => {
                        runCompile();
                        CompileApi();
                      }}
                    >
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

export default TestScreen;
