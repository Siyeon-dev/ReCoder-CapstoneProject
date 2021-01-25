import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
import {useCookies} from 'react-cookie';
import axios from 'axios';

const NavMenu = () => {
    const [newClassName, setnewClassName] = useState();
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal(){
        setIsOpen(false);
    }

const [createClassList, setcreateClassList] = useState();
const [cookies, setCookie, removeCookie] = useCookies();
const [classList, setclassList] = useState();

const readClass = async () => {
    let data = {
        t_email : cookies.t_email
    };
    await axios.post('classinfo', data).then(res => {
        const classList = res.data.map(classList => <li><Link to="">{classList.class_name}</Link></li>);
        setclassList(classList);
    })
    .catch(err => {

    })
}

useEffect(() => {
    readClass();
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
        readClass();
    })
    .catch(err => {

    })
    closeModal();
}

// setcreateClassList = classData.map((classList) => (<li><Link to="" className="on">{classList.class_name}</Link></li>));
// console.log(setcreateClassList);

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
                                        <form onSubmit={handleSubmit}>
                                            <input type="text" name="newClassName" placeholder="클래스명을 입력해주세요."  onChange={e => {setnewClassName(e.target.value)}}   />
                                            <button type="submit" className="bg">생성하기</button>
                                        </form>
                                        <button onClick={closeModal} className="modal_close"><img src="./img/modal_close.gif" alt="모달 닫기"/></button>
                                    </div>
                                </Modal>
                                <Link to=""><img src="./img/nav_setting_btn.gif" alt="메뉴 설정" /></Link>
                        </div>
                    </div>
                    <ul className="dep2">
                        {/* <li><Link to="">일본어 특강 A반</Link></li>
                        <li><Link to="">일본어 특강 B반</Link></li>
                        <li><Link to="" className="on">우당탕탕 웹디제이</Link></li> */}
                        {classList}
                    </ul>
                </li>
                <li><Link to="">시험통계</Link></li>
                <li><Link to="">시험 체험하기</Link></li>
            </ul>
        </div>
    )
}

export default NavMenu;
