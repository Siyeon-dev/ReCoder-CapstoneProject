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
        <img src="/img/nav_plus_btn.gif" alt="クラス追加" />
      </button>
      <Modal>
        <div className="modal create_class">
          <div className="modal_area">
            <div className="modal_head">
              <p className="tit">クラス作り</p>
              <p className="txt">
                学生と作った試験はクラス別に管理することができます。
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                ref={inputTag}
                type="text"
                name="newClassName"
                maxlength="15"
                placeholder="クラス名を入力してください。"
              />
              <button type="submit">生成する</button>
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

export default CreateClass;
