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
      .then(
        () => readClass({ s_email: cookies.s_email }),
        classListUpdate,
        setIsOpen(!isOpen)
      );
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        <img src="/img/nav_plus_btn.gif" alt="クラスに加入する" />
      </button>
      <Modal>
        <div className="modal create_class">
          <div className="modal_area">
            <div className="modal_head">
              <p className="tit">クラスに加入する</p>
              <p className="txt">
                クラスの招待番号を入力すると、加入申し込みができます。
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                ref={inputTag}
                type="text"
                name="newClassName"
                placeholder="招待コードを入力してください。"
              />
              <button type="submit">加入する</button>
            </form>
            <button onClick={() => setIsOpen(false)} className="modal_close">
              <img src="/img/modal_close.gif" alt="Modal Close" />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default JoinClass
