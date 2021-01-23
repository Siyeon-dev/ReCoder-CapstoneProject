import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';


const NavMenu = () => {

    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal(){
        setIsOpen(false);
    }

    return (
        <div id="nav_menu">
            <ul>
                <li>
                    <div className="nav_tit">
                        <p>나의 클래스</p>
                        <div className="nav_tit_btn">
                                {/* <Link to="" onClick={openModal}><img src="./img/nav_plus_btn.gif" alt="클래스 추가" /></Link> */}
                                <button onClick={openModal}><img src="./img/nav_plus_btn.gif" alt="클래스 추가" /></button>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    className="create_class"
                                >
                                    
                                    <div className="modal_area create_class">
                                        <div className="modal_head">
                                            <p className="tit">클래스 생성하기</p>
                                            <p className="txt">학생 및 시험을 생성한 클래스별로 관리할 수 있습니다. </p>
                                        </div>
                                        <form>
                                            <input type="text" placeholder="클래스명을 입력해주세요."  />
                                            <button type="submit" className="bg">생성하기</button>
                                        </form>
                                        <button onClick={closeModal} className="modal_close"><img src="./img/modal_close.gif" alt="모달 닫기"/></button>
                                    </div>
                                </Modal>
                                <Link to=""><img src="./img/nav_setting_btn.gif" alt="메뉴 설정" /></Link>
                        </div>
                    </div>
                    <ul className="dep2">
                        <li><Link to="">일본어 특강 A반</Link></li>
                        <li><Link to="">일본어 특강 B반</Link></li>
                        <li><Link to="" className="on">우당탕탕 웹디제이</Link></li>
                    </ul>
                </li>
                <li><Link to="">시험통계</Link></li>
                <li><Link to="">시험 체험하기</Link></li>
            </ul>
        </div>
    )
}

export default NavMenu;
