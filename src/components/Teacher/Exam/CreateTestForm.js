
import React, { useEffect, useState } from 'react'
import Footer from "../../Layout/Footer";
import BoardEditor from "../Editor/BoardEditor"
import CreateProblem from "Components/Modal/CreateProblem";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import { useParams } from 'react-router';

const CreateTestForm = () => {
  const [selectDate, setSelectDate] = useState(new Date());
  const [boardFormHtml, setBoardFormHtml] = useState(null);
  const ParamsClassCode = useParams();

  // useEffect(() => {
  //   problemFormInfoList.push(ProblemFormInfo);
  //   console.log(problemFormInfoList);
  // }, [ProblemFormInfo]);

  // // 문제 정보
  // let ProblemFormInfo = {
  //   question_name : "",
  //   question_score: "",
  //   question_text: "",
  // };

  // 시험지 정보
  let TestFormInfo = {
    class_code: "",
    test_name: "",
    test_start: "",
    test_end: "",
    test_wait: "",
    test_caution: "",
    test_retake: "",
    test_shuffle: "",
    test_escape: "",
    test_lang: "",
  };

  const CreateTestFormSubmit = e => {
    e.preventDefault();
    //console.log(e.target.test_start_time.value);
    TestFormInfo.class_code = ParamsClassCode.classCode;
    TestFormInfo.test_name = e.target.text_name.value;
    TestFormInfo.test_start =
      e.target.test_date.value +
      ":" +
      e.target.test_start_time.value +
      ":" +
      e.target.test_start_min.value;
    TestFormInfo.test_end =
      e.target.test_date.value +
      ":" +
      e.target.test_end_time.value +
      ":" +
      e.target.test_end_min.value;
    TestFormInfo.test_wait = "00:" + e.target.test_wait.value + ":00";
    TestFormInfo.test_caution = boardFormHtml;
    TestFormInfo.test_retake = e.target.test_retake.value;
    TestFormInfo.test_shuffle = e.target.test_shuffle.value;
    TestFormInfo.test_escape = e.target.test_escape.value;
    TestFormInfo.test_lang = e.target.test_lang.value;

    console.log(TestFormInfo);
  }

    return (
      <div id="wrapper">
        <div className="create_class_container">
          <div className="form_contents">
            <form onSubmit={CreateTestFormSubmit}>
              <div className="exam_name_form">
                <input name="text_name" placeholder="시험명을 입력하세요." />
              </div>
              {/**/}
              <div className="test_width_input">
                <p className="width_input_tit">응시기간</p>
                <DatePicker
                  name="test_date"
                  onChange={(date) => setSelectDate(date)}
                  dateFormat="yyyy/MM/dd"
                  value={selectDate}
                  minDate={new Date()}
                />
                <div className="select_wrap">
                  <div className="select">
                    <select name="test_start_time" id="slct">
                      {/* <option selected disabled>
                        Choose an option
                      </option> */}
                      <option value="9">9시</option>
                      <option value="10">10시</option>
                      <option value="11">11시</option>
                      <option value="12">12시</option>
                      <option value="13">13시</option>
                      <option value="14">14시</option>
                      <option value="15">15시</option>
                      <option value="16">16시</option>
                      <option value="17">17시</option>
                      <option value="18">18시</option>
                      <option value="19">19시</option>
                      <option value="20">20시</option>
                    </select>
                  </div>
                  <div className="select">
                    <select name="test_start_min" id="slct">
                      <option value="00">00분</option>
                      <option value="10">10분</option>
                      <option value="20">20분</option>
                      <option value="30">30분</option>
                      <option value="40">40분</option>
                      <option value="50">50분</option>
                    </select>
                  </div>
                </div>
                <span className="bar">-</span>
                <div className="select_wrap">
                  <div className="select">
                    <select name="test_end_time" id="slct">
                      {/* <option selected disabled>
                        Choose an option
                      </option> */}
                      <option value="9">9시</option>
                      <option value="10">10시</option>
                      <option value="11">11시</option>
                      <option value="12">12시</option>
                      <option value="13">13시</option>
                      <option value="14">14시</option>
                      <option value="15">15시</option>
                      <option value="16">16시</option>
                      <option value="17">17시</option>
                      <option value="18">18시</option>
                      <option value="19">19시</option>
                      <option value="20">20시</option>
                    </select>
                  </div>
                  <div className="select">
                    <select name="test_end_min" id="slct">
                      <option value="00">00분</option>
                      <option value="10">10분</option>
                      <option value="20">20분</option>
                      <option value="30">30분</option>
                      <option value="40">40분</option>
                      <option value="50">50분</option>
                    </select>
                  </div>
                </div>
              </div>
              {/**/}
              <div className="test_width_input">
                <p className="width_input_tit">주의사항</p>
                <BoardEditor setBoardFormHtml={setBoardFormHtml} />
              </div>
              {/**/}
              <div className="test_width_input">
                <p className="width_input_tit">시험대기시간</p>
                <div className="select">
                  <select name="test_wait" id="slct">
                    <option value="00">00분</option>
                    <option value="10">10분</option>
                    <option value="20">20분</option>
                    <option value="30">30분</option>
                    <option value="40">40분</option>
                    <option value="50">50분</option>
                  </select>
                </div>
              </div>
              {/**/}
              <div className="test_width_input">
                <p className="width_input_tit">문제섞기</p>
                <div className="radio_wrap">
                  <div className="light">
                    <label>
                      <input type="radio" name="test_shuffle" value="1" />
                      <span class="design"></span>
                      <span class="text">허용</span>
                    </label>
                    <label>
                      <input type="radio" name="test_shuffle" value="0" />
                      <span class="design"></span>
                      <span class="text">비허용</span>
                    </label>
                  </div>
                </div>
              </div>
              {/**/}
              <div className="test_width_input">
                <p className="width_input_tit">시험창 이탈허용</p>
                <div className="radio_wrap">
                  <div className="light">
                    <label>
                      <input type="radio" name="test_escape" value="1" />
                      <span class="design"></span>
                      <span class="text">허용</span>
                    </label>
                    <label>
                      <input type="radio" name="test_escape" value="0" />
                      <span class="design"></span>
                      <span class="text">비허용</span>
                    </label>
                  </div>
                </div>
              </div>
              {/**/}
              <div className="test_width_input">
                <p className="width_input_tit">이어보기 설정</p>
                <div className="radio_wrap">
                  <div className="light">
                    <label>
                      <input type="radio" name="test_retake" value="3" />
                      <span class="design"></span>
                      <span class="text">무제한</span>
                    </label>
                    <label>
                      <input type="radio" name="test_retake" value="1" />
                      <span class="design"></span>
                      <span class="text">1회</span>
                    </label>
                    <label>
                      <input type="radio" name="test_retake" value="2" />
                      <span class="design"></span>
                      <span class="text">2회</span>
                    </label>
                    <label>
                      <input type="radio" name="test_retake" value="4" />
                      <span class="design"></span>
                      <span class="text">비허용</span>
                    </label>
                  </div>
                </div>
              </div>
              {/**/}
              <div className="test_width_input">
                <p className="width_input_tit">개발언어</p>
                <div className="select">
                  <select name="test_lang" id="slct">
                    <option value="PHP">PHP</option>
                    <option value="Python">Python</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Java">Java</option>
                  </select>
                </div>
              </div>

              <div className="questions_list">
                <div className="add_questions">
                  <p className="tit">추가된 문제</p>
                  <CreateProblem />
                </div>
                <div className="add_questions_list">
                  <div className="questions_box">
                    <p className="tit">두직선의 교차 여부 확률 계산</p>
                    <p className="score">
                      <span>20</span>점
                    </p>
                    <div className="btn_wrap">
                      <button className="questions_modify">수정하기</button>
                      <button className="questions_delete">삭제하기</button>
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit">시험 저장하기</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default CreateTestForm;
