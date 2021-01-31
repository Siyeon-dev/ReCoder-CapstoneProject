import axios from 'axios';
import React, { useState, useRef } from 'react'
import { useCookies } from 'react-cookie';
import useModal from './useModal';

const DeleteModal = ({ readClass, classListUpdate, userClassInfo }) => {
    const [isOpen, setIsOpen, Modal] = useModal();
    const [checkStatus, setCheckStatus] = useState([]);
    const aaa = [];
    const uniqueArr = [];

    const handleCheck = e => {
        aaa.push(e.target.name);

        aaa.forEach((element) => {
            if (!uniqueArr.includes(element)) {
                uniqueArr.push(element);
            } else {
                console.log(element);
                uniqueArr.splice(uniqueArr.indexOf(element),1);
            }
        });
        aaa.length = 0;
        console.log(uniqueArr);
   }

   const delClassListSubmit = e => {
        e.preventDefault();
        let ArrClassCode = uniqueArr.map(ArrClassCode => {
            return {class_code : `${ArrClassCode}`};
        });
        console.log(ArrClassCode);

        axios.post('classdelete', ArrClassCode).then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        }).then(() => readClass(), classListUpdate, setIsOpen(!isOpen))
    }

    const delClassListSetUp = userClassInfo.map((currElement, index) => 
        <div className="class_list_check">
            <input type="checkbox" id={index} name={currElement.class_code} onChange={handleCheck} />
            <label for={index}>{currElement.class_name}</label>
        </div>);

    return <>
        <button onClick={() => setIsOpen(!isOpen)}><img src="./img/nav_setting_btn.gif" alt="클래스 삭제" /></button>
        <Modal>
            <div className="modal delete_class">
                <div className="modal_area">
                    <div className="modal_head">
                        <p className="tit">클래스 삭제하기</p>
                        <p className="txt">클래스 삭제 시 복구하실 수 없습니다.</p>
                    </div>
                        <form onSubmit={delClassListSubmit}>
                            <div className="class_list_area">{delClassListSetUp}</div>
                            <button type="submit">삭제하기</button>
                        </form>
                    <button onClick={() => setIsOpen(false)} className="modal_close"><img src="./img/modal_close.gif" alt="모달 닫기" /></button>
                </div>  
            </div>
        </Modal>
    </>;

}

export default DeleteModal;