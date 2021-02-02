import React from 'react'

const ClassTestList = () => {
    return (
      <div>
        <table className="tch_class_list_table">
          <colgroup>
            <col width="25%" />
            <col width="10%" />
            <col width="37%" />
            <col width="20%" />
            <col width="8%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">시험명</th>
              <th scope="col">문항수</th>
              <th scope="col">시험일시</th>
              <th scope="col">상태</th>
              <th scope="col">삭제</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">2020학년도 1학기 중간고사</th>
              <td>10문항</td>
              <td>2020-07-26 11:00 ~ 2020-07-26 11:50</td>
              <td>
                <p className="tch_test_state complete">시험완료</p>
              </td>
              <td>
                <button>
                  <img
                    src="./img/tch_test_delete_btn.png"
                    alt="시험 삭제 버튼"
                  />
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">2020학년도 1학기 기말고사</th>
              <td>10문항</td>
              <td>2020-07-26 11:00 ~ 2020-07-26 11:50</td>
              <td>
                <p className="tch_test_state start">시험시작</p>
              </td>
              <td>
                <button>
                  <img
                    src="./img/tch_test_delete_btn.png"
                    alt="시험 삭제 버튼"
                  />
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">Laravel 조편성 프로그램 작성</th>
              <td>10문항</td>
              <td>2020-07-26 11:00 ~ 2020-07-26 11:50</td>
              <td>
                <p className="tch_test_state start">시험시작</p>
              </td>
              <td>
                <button>
                  <img
                    src="./img/tch_test_delete_btn.png"
                    alt="시험 삭제 버튼"
                  />
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">Laravel 조편성 프로그램 작성</th>
              <td>10문항</td>
              <td>2020-07-26 11:00 ~ 2020-07-26 11:50</td>
              <td>
                <p className="tch_test_state start">시험시작</p>
              </td>
              <td>
                <button>
                  <img
                    src="./img/tch_test_delete_btn.png"
                    alt="시험 삭제 버튼"
                  />
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row">Laravel 조편성 프로그램 작성</th>
              <td>10문항</td>
              <td>2020-07-26 11:00 ~ 2020-07-26 11:50</td>
              <td>
                <p className="tch_test_state start">시험시작</p>
              </td>
              <td>
                <button>
                  <img
                    src="./img/tch_test_delete_btn.png"
                    alt="시험 삭제 버튼"
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="create_test_btn">
          <span>시험 등록하기</span>
        </div>
      </div>
    );
}

export default ClassTestList
