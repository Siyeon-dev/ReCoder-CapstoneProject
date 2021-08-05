import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
import * as janus from "../../../modules/examPromoter";
import ProctorExamVideo from "./ProctorExamVideo";
import socketio from "socket.io-client";
import TeacherTestChatting from "Components/Modal/TeacherTestChatting";
import useModal from "Components/Modal/useModal";

const socket = socketio.connect("http://18.215.120.133:3001");

const ProctorExamView = () => {
	const TestDataParams = useParams();
	const [cookies, setCookie, removeCookie] = useCookies();
	const [particStdList, setParticStdList] = useState([]);
	const [particStdFlag, setParticStdFlag] = useState(false);
	const [highlightStateVoice, setHighlightStateVoice] = useState(false);
	const [highlightStateEye, setHighlightStateEye] = useState(false);
	const [currentStdNumber, setCurrentStdNumber] = useState(0);
	const [student, setStudent] = useState();
	const [micStudent, setMicStudent] = useState();
	const [eyeStudent, setEyeStudent] = useState();
	const [isOpen, setIsOpen, Modal] = useModal();

	useEffect(() => {
		janus.runJanusTeacher();
	}, []);

	useEffect(() => {
		socket.emit("create", {
			t_email: cookies.t_email,
			test_id: TestDataParams.testId,
		});

		console.log("방 개설 시작중");

		socket.emit("join", {
			t_email: cookies.t_email,
			test_id: Number(TestDataParams.testId),
		});

		console.log(cookies.t_email);
		console.log(TestDataParams.testId);
		socket.on("student_join", (msg) => {
			particStdFlag === true && setParticStdFlag(false);
			//janus.runJanusTeacher();
			console.log("야누스 student_join");

			const StdDataSave = () => {
				setStudent(msg);
				console.log(student);
				console.log(particStdList);
				Object.keys(msg).length !== 0 && setParticStdFlag(true);
			};
			msg !== null && StdDataSave();
		});

		socket.on("room_out", (res) => {
			console.log(res);
		});

		socket.on("volumeMeter", (res) => {
			console.log("volumeMeter : ", res);
			setMicStudent(res);
			setCurrentStdNumber(res.s_number);
			setHighlightStateVoice(true);
			setTimeout(() => {
				setHighlightStateVoice(false);
			}, 2000);
		});

		socket.on("eyetrackingcount", (msg) => {
			console.log("eyetrackingcount : ", msg);
			setEyeStudent(msg);
			setCurrentStdNumber(msg.s_number);
			setHighlightStateEye(true);
			setTimeout(() => {
				setHighlightStateEye(false);
			}, 2000);
		});
	}, []);

	useEffect(() => {
		student && setParticStdList([...particStdList, student]);
	}, [student]);

	useEffect(() => {
		if (micStudent) {
			console.log("micStudent 115", micStudent);

			const indexNum = particStdList.findIndex(
				(x) => x.s_number === micStudent.s_number
			); // 찾은 index
			console.log("particStdList", particStdList);
			console.log("micStudent", micStudent);
			console.log("isLargeNumber", indexNum);

			const std1 = particStdList.find(
				(v) => v.s_number === micStudent.s_number
			);
			std1.mic_caution = micStudent.mic_caution;

			const EmptyArray = particStdList;
			EmptyArray[indexNum] = std1;

			setParticStdList(EmptyArray);
		}
	}, [micStudent]);

	useEffect(() => {
		if (eyeStudent) {
			const indexNum = particStdList.findIndex(
				(x) => x.s_number === eyeStudent.s_number
			); // 찾은 index

			const std2 = particStdList.find(
				(v) => v.s_number === eyeStudent.s_number
			);
			std2.eye_caution = eyeStudent.eye_caution;

			const EmptyArray = particStdList;
			EmptyArray[indexNum] = std2;

			setParticStdList(EmptyArray);
		}
	}, [eyeStudent]);

	useEffect(() => {
		console.log(particStdList);
	}, []);

	const SocketRoomOut = () => {
		console.log("TestDataParams.testId", TestDataParams.testId);
		socket.emit("m_room_out", {
			t_email: cookies.t_email,
			test_id: Number(TestDataParams.testId),
		});
		console.log("Room Out");
		window.location.replace("/teacher");
	};

	return (
		<div className='proctor_exam_container'>
			<div className='side_list_area'>
				<p className='tit'>
					学生目録
					<div>
						<span>{particStdFlag ? particStdList.length : 0}</span>
						/30
					</div>
				</p>
				<ul>
					{particStdFlag &&
						particStdList.map((v) => (
							<li>
								{v.s_name}
								<button onClick={() => setIsOpen(!isOpen)}>
									<img
										src='../../img/test_chatting_ico.gif'
										alt={`学生にチャットする`}
									/>
								</button>
								<TeacherTestChatting
									socket={socket}
									StdName={v.s_name}
									StdEmail={v.s_email}
									Modal={Modal}
									setIsOpen={setIsOpen}
									isOpen={isOpen}
								/>
							</li>
						))}
				</ul>
				<div className='btn_wrap'>
					<Link
						onClick={() => {
							SocketRoomOut();
						}}
					>
						Close
					</Link>
				</div>
			</div>
			<div className='video_area'>
				<div className='tit_area'>
					<p>{TestDataParams.testName}</p>
					<ul className='status_desc'>
						<li className='voice'>音声フォーカシング</li>
						<li className='cheating'>不正行為警告</li>
					</ul>
				</div>
				<div className='video_area_align'>
					{particStdFlag ? (
						<ProctorExamVideo
							particStdFlag={particStdFlag}
							particStdList={particStdList}
							highlightStateVoice={highlightStateVoice}
							highlightStateEye={highlightStateEye}
							currentStdNumber={currentStdNumber}
						/>
					) : (
						<div className='loading'>
							<img
								src='../../img/test_proctor_loading.gif'
								alt='試験監督ページのロード'
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProctorExamView;
