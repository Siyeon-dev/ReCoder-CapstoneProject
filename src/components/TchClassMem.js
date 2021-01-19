import React from 'react'
import TchContTitle from './TchContTitle'
import StdNavMenu from './StdNavMenu'

const TchclassNameMem = () => {
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
                <TchContTitle />
                <div className="cont_wrap">
                    <div className="class_member_list">
                        <div className="all_member">
                            <div className="mem_check_box">
                                <input type="checkbox" id="a1" name="전체동의" />
                                <label for="a1"><span>rntmf1247</span>이구슬</label>
                            </div>
                            <div className="mem_check_box">
                                <input type="checkbox" id="a2" name="전체동의" />
                                <label for="a2"><span>rntmf1247</span>이구슬</label>
                            </div>
                            <div className="mem_check_box">
                                <input type="checkbox" id="a3" name="전체동의" />
                                <label for="a3"><span>rntmf1247</span>이구슬</label>
                            </div>
                            <div className="mem_check_box">
                                <input type="checkbox" id="a4" name="전체동의" />
                                <label for="a4"><span>rntmf1247</span>이구슬</label>
                            </div>
                            <div className="mem_check_box">
                                <input type="checkbox" id="a5" name="전체동의" />
                                <label for="a5"><span>rntmf1247</span>이구슬</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default TchclassNameMem
