import { useCookies } from 'react-cookie';
import useModal from "./useModal";
import React, { useRef, useState } from "react";
import axios from 'axios';

const JoinClass = ({ readClass, classListUpdate, userClassInfo }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [createClassList, setcreateClassList] = useState();
  const [isOpen, setIsOpen, Modal] = useModal();
  const inputTag = useRef();
    
    console.log(userClassInfo);

  const handleSubmit = (e) => {
    e.preventDefault();

    let newClassData;
    console.log(inputTag);
    newClassData = {
      class_code: inputTag.current.value,
      s_email: cookies.s_email,
    };

    console.log(newClassData);
    axios
      .post("/classjoin", newClassData)
      .then((res) => {
        setcreateClassList(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => readClass(), classListUpdate, setIsOpen(!isOpen));
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        <img src="/img/nav_plus_btn.gif" alt="클래스 가입하기" />
      </button>
      <Modal>
        <div className="modal create_class">
          <div className="modal_area">
            <div className="modal_head">
              <p className="tit">클래스 가입하기</p>
              <p className="txt">
                클래스 초대번호를 입력하시면 해당 클래스에 가입하실 수 있습니다.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                ref={inputTag}
                type="text"
                name="newClassName"
                placeholder="초대코드를 입력해주세요."
              />
              <button type="submit">가입하기</button>
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

export default JoinClass
