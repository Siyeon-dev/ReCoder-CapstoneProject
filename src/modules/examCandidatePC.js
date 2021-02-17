import Janus from './janus/janus'

let server = null;
let janus = null;

let screenHandle = null;
let videoHandlerOnPC = null;

let myId = 33;
let mypvtid = null;

let room = 1234;

let myUsername = 'siyeon park';
let opaqueId = '박시연'; // 무슨 역할?

const TEST_CANDIDATE_NUM = 5;

if (window.location.protocol === 'http:')
	server = 'http://' + 're-coder.net' + '/janus';
else server = 'https://' + 're-coder.net' + '/janus';

export function runJanusPC () {
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

							Janus.log(
								`Plugin attached! (${videoHandlerOnPC.getPlugin()}, ID = ${videoHandlerOnPC.getId()})`
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

							if (event) {
								if (event === 'joined') {
									myId = msg['id'];
									mypvtid = msg['private_id'];

									Janus.log(
										`${msg['room']}에 성공적으로 접속하였습니다. ID = $ myId}`
									);

									publishOwnFeed(msg);
								} else if (event === 'event') {
									let list = msg['publishers'];

									Janus.log(
										'Got a list of available publishers/feeds:',
										list
									);
									for (var f in list) {
										var id = list[f]['id'];
										if (id === myId + 2)
											// createAnswer 제작
											mobileFeed(id);
									}
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
 * @description screenFeed handle 생성
 * @param {register의 feed 값} id
 */
function localScreenFeed(msg) {
	janus.attach({
		plugin: 'janus.plugin.videoroom',
		opaqueId: opaqueId,

		success: function (pluginHandle) {
			screenHandle = pluginHandle; // pluginHandle 은 변수명 그대로의 의미를 지닌다.
			Janus.log(
				'Plugin attached! (' +
					screenHandle.getPlugin() +
					', id=' +
					screenHandle.getId() +
					')'
			);

			var register = {
				request: 'join',
				room: msg['room'],
				id: myId + 1,
				ptype: 'publisher',
				private_id: mypvtid,
				feed: msg['publishers']['id'],
			};
			screenHandle.send({ message: register });
		},
		iceState: function (state) {
			Janus.log('ICE state changed to ' + state);
		},
		mediaState: function (medium, on) {
			Janus.log(
				'Janus ' +
					(on ? 'started' : 'stopped') +
					' receiving our ' +
					medium
			);
		},
		error: function (error) {
			Janus.error('  -- Error attaching plugin...', error);
		},

		onmessage: function (msg, jsep) {
			Janus.debug(
				' ::: Got a message (publisher) on Screen Sharing :::',
				msg
			);
			let event = msg['videoroom'];
			console.dir(event);

			if (event) {
				if (event === 'joined') {
					publishOwnScreenFeed();
				}
			}
			if (jsep) {
				Janus.debug('Handling SDP as well...', jsep);
				screenHandle.handleRemoteJsep({ jsep: jsep });
			}
		},
		// 여기부터 작업
		onlocalstream: function (stream) {
			console.log('onlocalstream(on Screen handle) 실행 !');
			Janus.debug(' ::: Got a local Screen stream :::', stream);
			// html tag 값 가져오기
			let myVideoScreen = document.getElementById('myVideoScreen');
			// tag에 stream data 붙이기
			Janus.attachMediaStream(myVideoScreen, stream);
		},
		oncleanup: function () {
			publishOwnScreenFeed();
		},
	});
}

function mobileFeed(id) {
	let mobileFeed = null;

	janus.attach({
		plugin: 'janus.plugin.videoroom',
		opaqueId: opaqueId,
		success: function (pluginHandle) {
			mobileFeed = pluginHandle;

			Janus.log(
				'Plugin attached! (' +
					mobileFeed.getPlugin() +
					', id=' +
					mobileFeed.getId() +
					')'
			);
			Janus.log('  -- This is a subscriber');

			let subscribe = {
				request: 'join',
				room: room,
				ptype: 'subscriber',
				feed: id,
				private_id: mypvtid,
			};

			mobileFeed.send({ message: subscribe });
		},
		onmessage: function (msg, jsep) {
			if (jsep) {
				Janus.debug('Handling SDP as well...', jsep);
				// Answer and attach
				mobileFeed.createAnswer({
					jsep: jsep,
					// Add data:true here if you want to subscribe to datachannels as well
					// (obviously only works if the publisher offered them in the first place)
					media: { audioSend: false, videoSend: false }, // We want recvonly audio/video
					success: function (jsep) {
						Janus.debug('Got SDP!', jsep);
						var body = { request: 'start', room: room };
						mobileFeed.send({ message: body, jsep: jsep });
					},
					error: function (error) {
						Janus.error('WebRTC error:', error);
					},
				});
			}
		},
		onremotestream: function (stream) {
			console.log('onremotestream(on mobile Feed) 실행 !');
			Janus.debug(' ::: Got a local Screen stream :::', stream);
			// html tag 값 가져오기
			let myVideoMobile = document.getElementById('myVideoMobile');
			// tag에 stream data 붙이기
			Janus.attachMediaStream(myVideoMobile, stream);
		},
	});
}

/**
 * @description createOffer 를 통해서 screenFeed 생성
 */
function publishOwnScreenFeed() {
	// Publish our stream
	screenHandle.createOffer({
		media: { video: 'screen', audioSend: false, videoRecv: false }, // Publishers are sendonly
		success: function (jsep) {
			Janus.debug('Got publisher screen SDP!', jsep);
			var publish = { request: 'configure', audio: false, video: true };
			screenHandle.send({ message: publish, jsep: jsep });
		},
		error: function (error) {
			Janus.error('WebRTC error:', error);
		},
	});
}

/**
 * @description 방 접속
 * @param {접속할 방 번호} roomID
 */
function joinTheRoom(roomID, userId) {
	let register = {
		request: 'join',
		room: roomID,
		id: userId,
		ptype: 'publisher',
		display: myUsername,
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
		require_pvtid: true,
		bitrate: 500000,
		notify_joining: true,
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
			Janus.log(msg['publishers']['id']);
			localScreenFeed(msg);
		},
		error: function (error) {
			Janus.error('WebRTC error:', error);
			publishOwnFeed(msg);
		},
	});
}