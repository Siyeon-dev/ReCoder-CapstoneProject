import React from 'react'
import Footer from "../../Layout/Footer";
import BoardEditor from "../Editor/BoardEditor"

const CreateTestForm = () => {
    return (
      <div id="wrapper">
        <div className="create_class_container">
          <div className="form_contents">
            <form action="">
              <div className="exam_name_form">
                <input name="text_name" placeholder="시험명을 입력하세요." />
              </div>
              {/**/}
              <div className="test_width_input">
                <p className="width_input_tit">응시기간</p>
                <div className="date_select">2021-02-08</div>
                <div className="select_wrap">
                  <div className="select">
                    <select name="slct" id="slct">
                      {/* <option selected disabled>
                        Choose an option
                      </option> */}
                      <option value="1">9시</option>
                      <option value="2">10시</option>
                      <option value="3">11시</option>
                      <option value="2">12시</option>
                      <option value="3">13시</option>
                      <option value="3">14시</option>
                      <option value="3">15시</option>
                      <option value="3">16시</option>
                      <option value="3">17시</option>
                      <option value="3">18시</option>
                      <option value="3">19시</option>
                      <option value="3">20시</option>
                    </select>
                  </div>
                  <div className="select">
                    <select name="slct" id="slct">
                      <option value="1">00분</option>
                      <option value="2">10분</option>
                      <option value="3">20분</option>
                      <option value="2">30분</option>
                      <option value="3">40분</option>
                      <option value="3">50분</option>
                    </select>
                  </div>
                </div>
                <span className="bar">-</span>
                <div className="date_select">2021-02-08</div>
                <div className="select_wrap">
                  <div className="select">
                    <select name="slct" id="slct">
                      {/* <option selected disabled>
                        Choose an option
                      </option> */}
                      <option value="1">9시</option>
                      <option value="2">10시</option>
                      <option value="3">11시</option>
                      <option value="2">12시</option>
                      <option value="3">13시</option>
                      <option value="3">14시</option>
                      <option value="3">15시</option>
                      <option value="3">16시</option>
                      <option value="3">17시</option>
                      <option value="3">18시</option>
                      <option value="3">19시</option>
                      <option value="3">20시</option>
                    </select>
                  </div>
                  <div className="select">
                    <select name="slct" id="slct">
                      <option value="1">00분</option>
                      <option value="2">10분</option>
                      <option value="3">20분</option>
                      <option value="2">30분</option>
                      <option value="3">40분</option>
                      <option value="3">50분</option>
                    </select>
                  </div>
                </div>
              </div>
              {/**/}
              <div className="test_width_input">
                <p className="width_input_tit">주의사항</p>
                <BoardEditor />
              </div>
              {/**/}
              <div className="test_width_input">
                <p className="width_input_tit">시험대기시간</p>
                <div className="select">
                  <select name="slct" id="slct">
                    <option value="1">00분</option>
                    <option value="2">10분</option>
                    <option value="3">20분</option>
                    <option value="2">30분</option>
                    <option value="3">40분</option>
                    <option value="3">50분</option>
                  </select>
                </div>
              </div>
              {/**/}
              <div className="test_width_input">
                <p className="width_input_tit">문제섞기</p>
                <div className="radio_wrap">
                  <div className="light">
                    <label>
                      <input type="radio" name="light" />
                      <span class="design"></span>
                      <span class="text">허용</span>
                    </label>
                    <label>
                      <input type="radio" name="light" />
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
                      <input type="radio" name="light" />
                      <span class="design"></span>
                      <span class="text">허용</span>
                    </label>
                    <label>
                      <input type="radio" name="light" />
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
                      <input type="radio" name="light" />
                      <span class="design"></span>
                      <span class="text">무제한</span>
                    </label>
                    <label>
                      <input type="radio" name="light" />
                      <span class="design"></span>
                      <span class="text">1회</span>
                    </label>
                    <label>
                      <input type="radio" name="light" />
                      <span class="design"></span>
                      <span class="text">2회</span>
                    </label>
                    <label>
                      <input type="radio" name="light" />
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
                  <select name="slct" id="slct">
                    <option value="PHP">PHP</option>
                    <option value="Python">Python</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Java">Java</option>
                  </select>
                </div>
              </div>
            </form>

            <div className="questions_list">
              <div className="add_questions">
                <p className="tit">추가된 문제</p>
                <div className="add_questions_btn">문제 추가하기</div>
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
          </div>
        </div>
      </div>
    );
}

export default CreateTestForm;
