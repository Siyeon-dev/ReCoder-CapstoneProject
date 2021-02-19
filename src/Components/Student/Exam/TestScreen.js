import React from "react";
import { useParams } from 'react-router-dom';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-mono_industrial';
import "ace-builds/src-noconflict/ext-language_tools"

let value;

function onChange(newValue) {
  console.log('change', newValue);
  value = newValue;
}

const TestScreen = () => {
  const TestCodeParams = useParams();
  
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
                    <li className="compile_btn" onClick={()=> {console.log(value)}}>
                        컴파일 하기
                    </li>
                  </ul>
                </div>
                <div className="code_compiler_area">
                    <AceEditor
                      className="scroll_area code_editor"
                      mode='javascript'
                      theme='mono_industrial'
                      onChange={onChange}
                      name='UNIQUE_ID_OF_DEV'
                      height='100%'
                      width='100%'
                      editorProps={{ $blockScrolling: true }}
                      setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 4,
                      }}
                    />
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
