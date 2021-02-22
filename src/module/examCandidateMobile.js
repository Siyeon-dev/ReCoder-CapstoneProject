import Janus from './janus/janus';

let server = null;
let janus = null;

let screenHandle = null;
let videoHandlerOnPC = null;

let myId = null;
let room = 1234;

let opaqueId = '박시연'; // 무슨 역할?
const TEST_CANDIDATE_NUM = 5;

if (window.location.protocol === 'http:')
	server = 'http://' + 're-coder.net' + '/janus';
else server = 'https://' + 're-coder.net' + '/janus';

export function runJanusMobile(studentId) {
	Janus.init({
		debug: 'all',
		callback: function () {
			janus = new Janus({
				server: server,
				opaqueId: opaqueId,
				success: function () {
					// VideoRoom plugin 지정
					janus.attach({
						plugin: 'janus.plugin.videoroom',
						opaqueId: opaqueId,

						success: function (pluginHandle) {
							videoHandlerOnPC = pluginHandle;
							myId = Number(studentId) + 2;

							Janus.log(
								`Plugin attached! (${videoHandlerOnPC.getPlugin()}
                                    , ID = ${videoHandlerOnPC.getId()})`
							);

							// room = createTheRoom(TEST_CANDIDATE_NUM);
							joinTheRoom(1234, myId);
						},
						// WebRTC 권한 허용 표시 관련 UI 출력
						// User 등록 후 실행 콜백
						// msg 값에 따라 event 처리 가능
						onmessage: function (msg, jsep) {
							Janus.debug(
								' ::: Got a message (publisher) :::',
								msg
							);

							let event = msg['videoroom'];
							Janus.debug('Event: ' + event);

							if (event) {
								if (event === 'joined') {
									myId = msg['id'];

									Janus.log(
										`${msg['room']}에 성공적으로 접속하였습니다. ID = ${myId}`
									);

									publishOwnFeed(msg);
								}
							}
							if (jsep) {
								Janus.debug('Handling SDP as well...', jsep);
								videoHandlerOnPC.handleRemoteJsep({
									jsep: jsep,
								});
							}
						},
						// localStreamData를 받아온다
						onlocalstream: function (stream) {
							Janus.debug(' ::: Got a local stream :::', stream);
							Janus.log('onlocalstream 실행');

							// html tag 값 가져오기
							let myVideo = document.getElementById('myvideo');
							// tag에 stream data 붙이기
							Janus.attachMediaStream(myVideo, stream);
						},
						oncleanup: function () {},
					});
				},
				error: function (error) {
					Janus.error(error);
				},
				destroyed: function () {
					window.location.reload();
				},
			});
		},
	});
};

/**
 * @description 방 접속
 * @param {접속할 방 번호} roomID
 */
function joinTheRoom(roomID, userId) {
	let register = {
		request: 'join',
		room: roomID,
		ptype: 'publisher',
		display: "" + userId,
	};

	videoHandlerOnPC.send({
		message: register,
		success: function () {
			Janus.log('방에 접속하였습니다 !');
			return true;
		},
		error: function (error) {
			Janus.error('WebRTC error:', error);
			Janus.log('방에 접속하지 못했습니다 !');
			return false;
		},
	});
}

/**
 * @description 방 생성
 * @param {시험의 총 참가자 수} numOfCandidate
 */
function createTheRoom(numOfCandidate) {
	let create = {
		request: 'create',
		bitrate: 500000,
		// 참여 가능한 publisher 수 = (참가자 인원 * 3) + (eyetracker, promoter)
		publishers: numOfCandidate * 3 + 2,
	};

	videoHandlerOnPC.send({
		message: create,
		success: function (result) {
			Janus.log(`room = ${result['room']} 방이 생성되었습니다.`);
			// 방 번호 return
			joinTheRoom(result['room']);
		},
		error: function (error) {
			Janus.error('WebRTC error:', error);
			Janus.log('방이 생성되지 않았습니다 !');
			return false;
		},
	});

	return null;
}

/**
 * @description 방 존재 여부 체크
 * @param {시험 방 번호} roomNum
 */
function isRoomExist(roomNum) {
	let exists = {
		request: 'exists',
		room: roomNum,
	};

	videoHandlerOnPC.send({
		message: exists,
		success: function () {
			Janus.log(`roomID = ${roomNum} 방이 존재합니다.`);
			return true;
		},
		error: function (error) {
			Janus.error('WebRTC error:', error);
			Janus.log(`roomID = ${roomNum} 방이 존재하지 않습니다.`);
			return false;
		},
	});
}

/**
 * @description createOffer 를 통해서 webCamFeed 생성
 */
function publishOwnFeed(msg) {
	videoHandlerOnPC.createOffer({
		media: {
			audioRecv: false,
			videoRecv: false,
			audioSend: false,
			videoSend: true,
		},
		success: function (jsep) {
			Janus.log('Got publisher SDP!', jsep);
			let publish = { request: 'configure', audio: false, video: true };
			videoHandlerOnPC.send({ message: publish, jsep: jsep });

			// localScreenFeed 생성
			// Janus.log(msg['publishers']['id']);
			// localScreenFeed(msg);
		},
		error: function (error) {
			Janus.error('WebRTC error:', error);
			publishOwnFeed(msg);
		},
	});
}
