import React from 'react'
import { Link } from 'react-router-dom'

const TchContTitle = () => {
    return (
        <div className="cont_tit">
            <p className="eng_txt">className :</p>
            <p className="class_name">우당탕탕 웹디제이</p>

            <div className="test_info">
                <p className="test_num">전체 시험 수 <span className="mint">10</span>개</p>
                <p className="test_std">전체 학생 수 <span className="blue">30</span>명</p>
            </div>

            <div className="cont_tit_tab tab_b">
                <ul className="no3">
                    <li><Link className="on">회원관리</Link></li>
                    <li><Link>시험관리</Link></li>
                    <li><Link>클래스 통계</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default TchContTitle
