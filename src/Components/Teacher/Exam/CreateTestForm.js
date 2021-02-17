
import React, { useEffect, useState } from 'react'
import BoardEditor from "../Editor/BoardEditor"
import CreateProblem from "Components/Modal/CreateProblem";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import Header from 'Components/Layout/Header';
import Footer from 'Components/Layout/Footer';

const CreateTestForm = () => {
  const [selectDate, setSelectDate] = useState(new Date());
  const [boardFormHtml, setBoardFormHtml] = useState(null);
  const history = useHistory();
  const [quizList, setQuizList] = useState([])
  const ParamsClassCode = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

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
    TestFormInfo.class_code = ParamsClassCode.classCode;
    TestFormInfo.test_name = e.target.text_name.value;
    TestFormInfo.test_start =
      e.target.test_date.value +
      " " +
      e.target.test_start_time.value +
      ":" +
      e.target.test_start_min.value +
      ":00";
    TestFormInfo.test_end =
      e.target.test_date.value +
      " " +
      e.target.test_end_time.value +
      ":" +
      e.target.test_end_min.value+
      ":00";
    TestFormInfo.test_wait = "00:" + e.target.test_wait.value + ":00";
    TestFormInfo.test_caution = boardFormHtml;
    TestFormInfo.test_retake = e.target.test_retake.value;
    TestFormInfo.test_shuffle = e.target.test_shuffle.value;
    TestFormInfo.test_escape = e.target.test_escape.value;
    TestFormInfo.test_lang = e.target.test_lang.value;

    console.log(TestFormInfo);
    console.log(quizList);

    const AllTestInfoArr = [];

    AllTestInfoArr.push(TestFormInfo);
    quizList.map((v, index) => AllTestInfoArr.push(quizList[index]));

    console.log(AllTestInfoArr);


    axios.post("/examcreate", AllTestInfoArr)
      .then((res) => {
        console.log(res.data);
        !alert(`[${TestFormInfo.test_name}] 시험 생성이 완료되었습니다.`) &&
          history.push(`/teacher/${ParamsClassCode.classCode}`);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Header />
      <div id="wrapper">
        <div className="create_class_container">
          <div className="form_contents">
            <form onSubmit={CreateTestFormSubmit}>
              <div className="exam_name_form">
                <input
                  name="text_name"
                  autocomplete="off"
                  placeholder="시험명을 입력하세요."
                />
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
                      <option selected disabled>
                        시작시간(시)
                      </option>
                      <option value="09">9시</option>
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
                      <option selected disabled>
                        시작시간(분)
                      </option>
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
                      <option selected disabled>
                        종료시간(시)
                      </option>
                      <option value="09">9시</option>
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
                      <option selected disabled>
                        종료시간(분)
                      </option>
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
                      <input
                        type="radio"
                        name="test_shuffle"
                        value="1"
                        defaultChecked
                      />
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
                      <input
                        type="radio"
                        name="test_escape"
                        value="1"
                        defaultChecked
                      />
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
                      <input
                        type="radio"
                        name="test_retake"
                        value="3"
                        defaultChecked
                      />
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
                  <CreateProblem
                    quizList={quizList}
                    setQuizList={setQuizList}
                  />
                </div>
                <div className="add_questions_list">
                  {quizList.length !== 0 ? (
                    quizList.map((v) => (
                      <div className="questions_box">
                        <p className="tit">{v.question_name}</p>
                        <p className="score">
                          <span>{v.question_score}</span>점
                        </p>
                        <div className="btn_wrap">
                          <div className="btn questions_modify">수정하기</div>
                          <div className="btn questions_delete">삭제하기</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="questions_box">생성된 문제가 없습니다.</div>
                  )}
                </div>
              </div>
              <div className="test_save_btn">
                <button type="submit">시험 저장하기</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CreateTestForm;
