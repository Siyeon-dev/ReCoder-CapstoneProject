import axios from "axios";
import React, { useState, useRef } from "react";
import { useCookies } from "react-cookie";
import useModal from "./useModal";

const CreateClass = ({ readClass, classListUpdate }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [createClassList, setcreateClassList] = useState();
  const [isOpen, setIsOpen, Modal] = useModal();
  const inputTag = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    let newClassData;
    console.log(inputTag);
    newClassData = {
      class_name: inputTag.current.value,
      t_email: cookies.t_email,
    };

    axios
      .post("/classcreate", newClassData)
      .then((res) => {
        setcreateClassList(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(
        () => readClass({ t_email: cookies.t_email }),
        classListUpdate,
        setIsOpen(!isOpen)
      );
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        <img src="/img/nav_plus_btn.gif" alt="클래스 추가" />
      </button>
      <Modal>
        <div className="modal create_class">
          <div className="modal_area">
            <div className="modal_head">
              <p className="tit">클래스 생성하기</p>
              <p className="txt">
                학생 및 시험을 생성한 클래스별로 관리할 수 있습니다.{" "}
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                ref={inputTag}
                type="text"
                name="newClassName"
                maxlength="15"
                placeholder="클래스명을 입력해주세요."
              />
              <button type="submit">생성하기</button>
            </form>
            <button onClick={() => setIsOpen(false)} className="modal_close">
              <img src="/img/modal_close.gif" alt="모달 닫기" />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateClass;
