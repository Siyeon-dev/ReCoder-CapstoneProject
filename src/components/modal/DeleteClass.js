import axios from 'axios';
import React, { useState, useRef } from 'react'
import { useCookies } from 'react-cookie';
import useModal from './useModal';

const DeleteModal = ({ readClass }) => {
    const [isOpen, setIsOpen, Modal] = useModal();

    return <>
        <button onClick={() => setIsOpen(!isOpen)}><img src="./img/nav_setting_btn.gif" alt="클래스 삭제" /></button>
        <Modal>
            <div className="modal delete_class">
                <div className="modal_area">
                    <div className="modal_head">
                        <p className="tit">클래스 삭제하기</p>
                        <p className="txt">클래스 삭제 시 복구하실 수 없습니다.</p>
                    </div>
                    <form>
                        <div className="class_list_check">
                            <input type="checkbox" id="delClass1" name="우당탕탕 웹디제이" />
                            <label for="delClass1">우당탕탕 웹디제이</label>
                        </div>
                        <div className="class_list_check">
                            <input type="checkbox" id="delClass2" name="우당탕탕 웹디제이" />
                            <label for="delClass2">우당탕탕 웹디제이</label>
                        </div>
                        <div className="class_list_check">
                            <input type="checkbox" id="delClass3" name="우당탕탕 웹디제이" />
                            <label for="delClass3">우당탕탕 웹디제이</label>
                        </div>
                        <button type="submit">삭제하기</button>
                    </form>
                    <button className="modal_close"><img src="./img/modal_close.gif" alt="모달 닫기"/></button>
                </div>  
            </div>
        </Modal>
    </>;

}

export default DeleteModal;
