import React, { useEffect, useState } from "react";
import BoardEditor from "../Editor/BoardEditor";
import CreateProblem from "Components/Modal/CreateProblem";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import Header from "Components/Layout/Header";
import Footer from "Components/Layout/Footer";
import { isEmptyObject } from "jquery";

const CreateTestForm = () => {
  const [selectDate, setSelectDate] = useState(new Date());
  const [boardFormHtml, setBoardFormHtml] = useState(null);
  const history = useHistory();
  const [quizList, setQuizList] = useState([]);
  const ParamsClassCode = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    TimeComparison();
  }, []);

  // 시험지 정보
  const TestFormInfo = {
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

  const TimeComparison = (
    examStartHours,
    examStartMin,
    examEndHours,
    examEndMin
  ) => {
    console.log(examStartHours, examStartMin);
    const todayTime = new Date();
    let todayHours = todayTime.getHours();
    let todayMinutes = todayTime.getMinutes();
    let DateState;

    console.log(DateState);
    if (selectDate.toDateString === todayTime.toDateString) {
      if (todayHours <= examStartHours) {
        DateState = true;
      } else {
        DateState = false;
      }
    } else if (selectDate.toDateString > todayTime.toDateString) {
      DateState = true;
    } else {
      DateState = false;
    }

    console.log(selectDate);
    console.log(DateState);
    console.log(todayTime);
    return DateState;
  };

  const CreateTestAxios = () => {
    const AllTestInfoArr = [];
    AllTestInfoArr.push(TestFormInfo);
    quizList.map((v, index) => AllTestInfoArr.push(quizList[index]));

    console.log(AllTestInfoArr);

    quizList.length !== 0
      ? axios
          .post("/examcreate", AllTestInfoArr)
          .then((res) => {
            console.log(res.data);
            !alert(`[${TestFormInfo.test_name}] 試験が完成しました。`) &&
              history.push(`/teacher/${ParamsClassCode.classCode}`);
          })
          .catch((err) => {
            console.log(err);
          })
      : alert("生成された問題がありません。");
  };

  const CreateTestFormSubmit = (e) => {
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
      e.target.test_end_min.value +
      ":00";
    TestFormInfo.test_wait = "00:" + e.target.test_wait.value + ":00";
    TestFormInfo.test_caution = boardFormHtml;
    TestFormInfo.test_retake = e.target.test_retake.value;
    TestFormInfo.test_shuffle = e.target.test_shuffle.value;
    TestFormInfo.test_escape = e.target.test_escape.value;
    TestFormInfo.test_lang = e.target.test_lang.value;

    console.log(TestFormInfo);
    console.log(quizList);

    // TimeComparison(
    //   e.target.test_start_time.value,
    //   e.target.test_start_min.value,
    //   e.target.test_end_time.value,
    //   e.target.test_end_min.value
    // )
    //   ? CreateTestAxios()
    //   : alert("시험 시간을 확인해주세요. 당일 최소 1시간 전 시험 생성이 가능합니다.");
    CreateTestAxios();
  };

  const deleteQuiz = (v) => {
    setQuizList(quizList.filter((el) => el.question_name !== v));
  };

  const readQuizList = () => {
    return quizList.length !== 0 ? (
      quizList.map((v) => (
        <div className="questions_box">
          <p className="tit">{v.question_name}</p>
          <p className="score">
            <span>{v.question_score}</span>点
          </p>
          <div className="btn_wrap">
            {/* <div className="btn questions_modify">수정하기</div> */}
            <div
              className="btn questions_delete"
              onClick={() => deleteQuiz(v.question_name)}
            >
              削除する
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="questions_box">生成された問題がありません。</div>
    );
  };

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
                  placeholder="試験名を入力してください。"
                  maxLength="18"
                />
              </div>
              {/**/}
              <div className="test_width_input">
                <p className="width_input_tit">受験期間</p>
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
                        開始時間(時)
                      </option>
                      <option value="09">9時</option>
                      <option value="10">10時</option>
                      <option value="11">11時</option>
                      <option value="12">12時</option>
                      <option value="13">13時</option>
                      <option value="14">14時</option>
                      <option value="15">15時</option>
                      <option value="16">16時</option>
                      <option value="17">17時</option>
                      <option value="18">18時</option>
                      <option value="19">19時</option>
                      <option value="20">20時</option>
                    </select>
                  </div>
                  <div className="select">
                    <select name="test_start_min" id="slct">
                      <option selected disabled>
                        開始時間(分)
                      </option>
                      <option value="00">00分</option>
                      <option value="00">05分</option>
                      <option value="10">10分</option>
                      <option value="10">15分</option>
                      <option value="20">20分</option>
                      <option value="20">25分</option>
                      <option value="30">30分</option>
                      <option value="30">35分</option>
                      <option value="40">40分</option>
                      <option value="40">45分</option>
                      <option value="50">50分</option>
                      <option value="50">55分</option>
                    </select>
                  </div>
                </div>
                <span className="bar">-</span>
                <div className="select_wrap">
                  <div className="select">
                    <select name="test_end_time" id="slct">
                      <option selected disabled>
                        終了時間(時)
                      </option>
                      <option value="09">9時</option>
                      <option value="10">10時</option>
                      <option value="11">11時</option>
                      <option value="12">12時</option>
                      <option value="13">13時</option>
                      <option value="14">14時</option>
                      <option value="15">15時</option>
                      <option value="16">16時</option>
                      <option value="17">17時</option>
                      <option value="18">18時</option>
                      <option value="19">19時</option>
                      <option value="20">20時</option>
                    </select>
                  </div>
                  <div className="select">
                    <select name="test_end_min" id="slct">
                      <option selected disabled>
                        終了時間(分)
                      </option>
                      <option value="00">00分</option>
                      <option value="00">05分</option>
                      <option value="10">10分</option>
                      <option value="10">15分</option>
                      <option value="20">20分</option>
                      <option value="20">25分</option>
                      <option value="30">30分</option>
                      <option value="30">35分</option>
                      <option value="40">40分</option>
                      <option value="40">45分</option>
                      <option value="50">50分</option>
                      <option value="50">55分</option>
                    </select>
                  </div>
                </div>
              </div>
              {/**/}
              <div className="test_width_input">
                <p className="width_input_tit">注意事項</p>
                <BoardEditor setBoardFormHtml={setBoardFormHtml} />
              </div>
              {/**/}
              <div className="test_width_input">
                <p className="width_input_tit">試験待ち時間</p>
                <div className="select">
                  <select name="test_wait" id="slct">
                    <option value="10">3分</option>
                    <option value="20">20分</option>
                    <option value="30">30分</option>
                    <option value="40">40分</option>
                    <option value="50">50分</option>
                  </select>
                </div>
              </div>
              {/**/}
              <div className="test_width_input">
                <p className="width_input_tit">問題順番ランダム</p>
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
                      <span class="text">On</span>
                    </label>
                    <label>
                      <input type="radio" name="test_shuffle" value="0" />
                      <span class="design"></span>
                      <span class="text">Off</span>
                    </label>
                  </div>
                </div>
              </div>
              {/**/}
              <div className="test_width_input">
                <p className="width_input_tit">試験離脱許可</p>
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
                      <span class="text">On</span>
                    </label>
                    <label>
                      <input type="radio" name="test_escape" value="0" />
                      <span class="design"></span>
                      <span class="text">Off</span>
                    </label>
                  </div>
                </div>
              </div>
              {/**/}
              <div className="test_width_input">
                <p className="width_input_tit">再受験できる回数</p>
                <div className="radio_wrap">
                  <div className="light">
                    <label>
                      <label>
                        <input type="radio" name="test_retake" value="1" />
                        <span class="design"></span>
                        <span class="text">1回</span>
                      </label>
                      <label>
                        <input type="radio" name="test_retake" value="2" />
                        <span class="design"></span>
                        <span class="text">2回</span>
                      </label>
                      <input
                        type="radio"
                        name="test_retake"
                        value="3"
                        defaultChecked
                      />
                      <span class="design"></span>
                      <span class="text">3回</span>
                    </label>
                    <label>
                      <input type="radio" name="test_retake" value="4" />
                      <span class="design"></span>
                      <span class="text">できない</span>
                    </label>
                  </div>
                </div>
              </div>
              {/**/}
              <div className="test_width_input">
                <p className="width_input_tit">開発言語</p>
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
                  <p className="tit">追加された問題</p>
                  <CreateProblem
                    quizList={quizList}
                    setQuizList={setQuizList}
                  />
                </div>
                <div className="add_questions_list">
                  {/* {quizList.length !== 0 ? (
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
                  )} */}
                  {readQuizList()}
                </div>
              </div>
              <div className="test_save_btn">
                <button type="submit">試験保存</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateTestForm;
