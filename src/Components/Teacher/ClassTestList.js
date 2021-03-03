import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import Loading from "Components/User/Loading";
import socketio from "socket.io-client";
import { useCookies } from "react-cookie";
import moment from "moment";
import "moment/locale/en-au"
import { useInterval } from "react-use";

const ClassTestList = ({
  selectClassTestInfo,
  classCode,
  apiLoadingFlag,
  emptyArrayCheckFlag,
}) => {
  const nowTime = moment().format('YYYY-MM-DD HH:mm');
  const classCodeParams = useParams();
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [realTime, setRealTime] = useState(Date.now());
  const [testStartTimeArray, setTestStartTimeArray] = useState([])
  const [testStartTimeFlag, setTestStartTimeFlag] = useState(false);
  const [socketStdNumData, setsocketStdNumData] = useState([]);
  const [socketStdNumDataArray, setsocketStdNumDataArray] = useState(0);
  let buttonStatus = null;

  // const ClassListSocket = (testData) => {
  //   const socket = socketio.connect("http://3.89.30.234:3001");

  //   console.log(cookies.t_email);
  //   console.log(testData);
  //   testData !== undefined && socket.emit("create", { t_email: cookies.t_email, test_id: testData });

  //   socket.on("student_join", (msg) => {
  //     console.log(msg);
  //     console.log("asdasdasdasdasd");
  //     console.log(msg.s_number);
  //     socketStdNumData.push(msg.s_number);
  //     setCookie("std_data", [socketStdNumData]);
  //   });

  // };


  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(selectClassTestInfo);
  }, []);


  useEffect(() => {
    console.log(cookies.std_data);
  }, [socketStdNumData]);



  // const TestBtnTimeCheck = () => { 
  //   testStartTimeArray.length !== 0 && testStartTimeArray.push(
  //     selectClassTestInfo.map((v) => v.test_start)
  //   );
  // }

  // useInterval(() => {
  //     testStartTimeFlag === true && setTestStartTimeFlag(false);
  //     setRealTime(moment().format("YYYY-MM-DD HH:mm:ss"));
  //     const ddd =
  //       testStartTimeArray.length !== 0 &&
  //     testStartTimeArray.filter((f) => realTime === f);
    
  //     ddd.length !== undefined && setTestStartTimeFlag(true);
  //   }, 1000);


  const compareTime = (nowTime, comTimeStart, comTimeEnd) => {
    if (nowTime < comTimeStart) {
      // 시험 대기
      return 0;
    } else {
      if (nowTime < comTimeEnd) {
        // 시험 응시
        return 1;
      } else {
        // 시험 종료
        return 2;
      }
    }

    return null;
  }

  const ListUpdate = () => {
    return emptyArrayCheckFlag === false && selectClassTestInfo ? (
      selectClassTestInfo.map((currElement) => (
        <tr>
          <th scope="row">{currElement.test_name}</th>
          <td>{currElement.questioncount}문항</td>
          <td>
            {currElement.test_start} ~{currElement.test_end}
          </td>

          <td>
            {
              ((buttonStatus = compareTime(
                nowTime,
                currElement.test_start,
                currElement.test_end
              )),
              buttonStatus === 0 ? (
                <Link
                  to={`/proctorexamview/${currElement.test_id}/${currElement.test_name}`}
                  //onClick={() => ClassListSocket(currElement.test_id)}
                  className="tch_test_state start"
                >
                  시험대기
                </Link>
              ) : buttonStatus === 1 ? (
                <Link
                  to={`/proctorexamview/${currElement.test_id}/${currElement.test_name}`}
                  className="tch_test_state complete"
                >
                  시험응시
                </Link>
              ) : buttonStatus === 2 ? (
                <Link
                  to={`/proctorexamview/${currElement.test_id}/${currElement.test_name}`}
                  className="tch_test_state complete"
                >
                  시험완료
                </Link>
              ) : null)
            }
            {/* {TestBtnTimeCheck(currElement.test_start)} */}
          </td>
          <td>
            <button onClick={() => TestListDelete(currElement.test_id)}>
              <img src="/img/tch_test_delete_btn.png" alt="시험 삭제 버튼" />
            </button>
          </td>
        </tr>
      ))
    ) : (
      <Loading />
    );
  };

  const TestListDelete = (props) => {
    let data = {
      test_id: props,
    };
    console.log(data);

    axios
      .post("/examdelete", data)
      .then((res) => {
        console.log(res.data);
        alert("삭제되었습니다.");
        window.location.replace(`/teacher/${classCode}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return apiLoadingFlag === true ? ( // api 값을 받아 왔는지
    emptyArrayCheckFlag === true ? ( // 값이 있는지 없는지
      <div className="no_create_guide test">
        생성된 시험이 없습니다. <span>먼저 시험을 생성해주세요.</span>
        <Link to={`/createtestform/${classCode}`}>시험 생성하기</Link>
      </div>
    ) : (
      <div className="tch_test_area">
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
          <tbody>{ListUpdate()}</tbody>
        </table>
        <Link
          to={`/createtestform/${classCodeParams.classCode}`}
          className="create_test_btn"
        >
          <span>시험 생성하기</span>
        </Link>
      </div>
    )
  ) : (
    <>
      <Loading />
    </>
  );
};



export default ClassTestList;
