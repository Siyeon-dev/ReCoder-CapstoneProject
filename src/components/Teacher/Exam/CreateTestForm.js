import React from 'react'

const CreateTestForm = () => {
    return (
      <div id="wrapper">
        <div className="create_class_container">
          <div className="form_contents">
            <form action="">
              <div className="test_name_form">
                <label class="field field_v1">
                  <input class="field__input" placeholder=" " />
                  <span class="field__label-wrap">
                    <span class="field__label">시험명을 입력해주세요.</span>
                  </span>
                </label>
              </div>
              {/**/}
              <div className="test_width_input">
                <p>응시기간</p>
                <div>
                  <div class="select_wrap">
                    <select name="fruit" id="fruit" class="fruit">
                      <option value="apple">사과</option>
                      <option value="orange">오렌지</option>
                      <option value="banana">바나나</option>
                    </select>
                  </div>
                  -
                  <div class="select_wrap">
                    <select name="fruit" id="fruit" class="fruit">
                      <option value="apple">사과</option>
                      <option value="orange">오렌지</option>
                      <option value="banana">바나나</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default CreateTestForm;
