import React, { useEffect } from "react";
import { useParams, Link } from 'react-router-dom';

import * as Ace from '../../../modules/editor'

const TestScreen = () => {
  const TestCodeParams = useParams();
  
  const runCompile = () => {
    // Ace.editorLib.clearConsoleScreen();
    // Get input from the code editor
    const userCode = Ace.codeEditor.getValue();

    // Run the user code
    try {
      new Function(userCode)();
    } catch (err) {
      console.error(err);
    }

    // Print to the console
    Ace.editorLib.printConsole();
  }

  useEffect(() => {
    Ace.editorLib.init();
  }, [])

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
        <p className="quiz_num">문제 1</p>
        <div className="test_select">
          <select name="test_start_time" id="slct">
            <option value="1">문제 1</option>
            <option value="2">문제 2</option>
            <option value="3">문제 3</option>
            <option value="4">문제 4</option>
          </select>
        </div>
        <ul>
          <li className="test_time_limit">30:00</li>
          <li>
            <Link to="/student/805760">제출하기</Link>
          </li>
          {/* <li>문의하기</li> 2021.02.16 보류 */}
        </ul>
      </div>

      <div className="std_test_area">
        <div className="std_test_wrapper">
          <div className="test_guide_section">
            <div className="scroll_area">{/* 문제 설명 */}</div>
          </div>
          <div className="middle_bar"></div>
          <div className="code_editor_section">
            <div id="overlay_div">
              <div className="std_coding_area">
                <div className="coding_nav">
                  <p className="file_name">Soulution.Java</p>
                  <ul>
                    <li>JAVA</li>
                    <li className="compile_btn" onClick={runCompile}>
                        컴파일 하기
                    </li>
                  </ul>
                </div>
                <div className="code_compiler_area" id="editorCode">
                </div>
                <div className="code_compiler_result">
                  <p className="tit">실행결과</p>
                  <div className="scroll_area">{
                    /* 코드 실행 결과 */
                    <ul class="editor__console-logs"></ul>
                  }</div>
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