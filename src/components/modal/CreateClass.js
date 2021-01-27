import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledModal = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .8);
  z-index:9999;
  .modal {
    box-shadow: 0 0 15px rgba(0, 0, 0, .1);
    background-color: #fff;
    border-radius:10px;
    position: relative;
    animation-name: grow-modal;
    animation-duration: .3s;
    animation-timing-function: ease-in-out;
    @keyframes grow-modal {
      0% { opacity: .2; }
      25% { opacity: .4; }
      50% { opacity: .6; }
      75% { opacity: .8; }
      100% {opacity: .9; }
    }
  }
`;

const CreateClass = ({ closeModal }) => {
  let modalRef;
  const [cookies, setCookie, removeCookie] = useCookies();
  const [createClassList, setcreateClassList] = useState();
  const [newClassName, setnewClassName] = useState();

  const hideModal = (e) => {
    if (modalRef && !modalRef.contains(e.target)) {
      closeModal();
    }
  }

  useEffect(() => {
      document.addEventListener('click', hideModal)
    return () => {
      document.removeEventListener('click', hideModal);
    }
  }, []);

const handleSubmit = async e => {
    e.preventDefault();

    let newClassData;

    newClassData ={
        class_name : newClassName,
        t_email : cookies.t_email
    };

    await axios.post('classcreate', newClassData).then(res => {
        setcreateClassList(res);
    })
    .catch(err => {

    })
    closeModal();
}
  
  return (
    <StyledModal>
      <div className="modal create_class">
      <div className="modal_area">
            <div className="modal_head">
                <p className="tit">클래스 생성하기</p>
                <p className="txt">학생 및 시험을 생성한 클래스별로 관리할 수 있습니다. </p>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="newClassName" placeholder="클래스명을 입력해주세요."  onChange={e => {setnewClassName(e.target.value)}}   />
                <button type="submit">생성하기</button>
            </form>
            <button onClick={closeModal} className="modal_close"><img src="./img/modal_close.gif" alt="모달 닫기"/></button>
        </div>
      </div>
    </StyledModal>
  )
}

export default CreateClass
