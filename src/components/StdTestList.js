import React from 'react'
import { Link } from 'react-router-dom'
import StdNavMenu from './StdNavMenu'
import StdContTitle from './StdContTitle'
import TchContTitle from './TchContTitle'


const StdTestList = () => {
    return (
        <div id="wrapper">
            <div id="container">
                <StdNavMenu />
                <div id="contents">
                    <div className="cont_visual">
                        <p className="eng small">Welcome.</p>
                        <p className="eng big">Re:Coder</p>
                        <p className="kor">공정한 시험 문화를 위한 코딩 테스트 프로그램</p>
                    </div>
                    <StdContTitle />
                    <div className="cont_wrap">
                        <div className="my_test_box">
                            <p className="test_name">2020학년도 1학기 중간고사</p>
                            <p className="question">3문항</p>
                            <p className="infobox date">2020-07-26</p>
                            <p className="infobox time">AM 11:00 ~ AM 11:50</p>

                            <Link to="" className="test_btn yellow"><span>채점중</span></Link>
                        </div>

                        <div className="my_test_box">
                            <p className="test_name">2020학년도 1학기 중간고사</p>
                            <p className="question">3문항</p>
                            <p className="infobox date">2020-07-26</p>
                            <p className="infobox time">AM 11:00 ~ AM 11:50</p>

                            <Link to="" className="test_btn puple">결과보기<div className="score">80 / <span>100</span></div></Link>
                        </div>

                        <div className="my_test_box">
                            <p className="test_name">2020학년도 1학기 중간고사</p>
                            <p className="question">3문항</p>
                            <p className="infobox date">2020-07-26</p>
                            <p className="infobox time">AM 11:00 ~ AM 11:50</p>

                            <Link to="" className="test_btn mint"><span>시험시작</span></Link>
                        </div>

                        <div className="my_test_box">
                            <p className="test_name">2020학년도 1학기 중간고사</p>
                            <p className="question">3문항</p>
                            <p className="infobox date">2020-07-26</p>
                            <p className="infobox time">AM 11:00 ~ AM 11:50</p>

                            <Link to="" className="test_btn red"><span>미응시</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StdTestList
