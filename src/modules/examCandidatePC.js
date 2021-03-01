import Janus from './janus/janus'

let server = null;
let janus = null;

let videoHandlerOnPC = null;	// WebCam Handler
let screenHandle = null;		// Screen Handler
let mobileFeedHandler = null;	// Mobile Handler

let myId = null;		// 학생 primaryKey 값
let screenId = null;
let mypvtid = null;

let roomNumber = null;
let opaqueId = "student" + Janus.randomString(12); // opaqueId 값을 통해서 유저 구분을 한다.


if (window.location.protocol === 'http:')
	server = 'http://re-coder.net/janus';
else server = 'https://re-coder.net/janus';

export function runJanusPC (studentId, testRoomNum) {
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
							myId = studentId;
							roomNumber = Number(testRoomNum);

							Janus.log(
								` --Janus-- WebCam Plugin attached! (${videoHandlerOnPC.getPlugin()}, ID = ${videoHandlerOnPC.getId()})`
							);
							
							isRoomExist(roomNumber);
						},
						error: function (error) {
							Janus.error(" --Janus-- WebCam Error attaching plugin...", error);
						},
						iceState: function (state) {
							Janus.log(" --Janus-- WebCam ICE state changed to " + state);
						},
						mediaState: function (medium, on) {
							Janus.log(
								" --Janus-- WebCam Janus " +
									(on ? "started" : "stopped") +
									" receiving our " +
									medium
							);
						},
						webrtcState: function(on) {
							Janus.log(
								" --Janus-- WebCam Janus says our WebRTC PeerConnection is " +
									(on ? "up" : "down") +
									" now"
							);
						},
						// WebRTC 권한 허용 표시 관련 UI 출력
						// User 등록 후 실행 콜백
						// msg 값에 따라 event 처리 가능
						onmessage: function (msg, jsep) {
							Janus.debug(
								' --Janus-- ::: Got a message (publisher) :::',
								msg
							);
							let event = msg['videoroom'];
							Janus.debug("Event: " + event);

							if (event) {
								if (event === 'joined') {
									let list = msg['publishers'];
									
									Janus.log(
										` --Janus-- Room : ${msg['room']}에 성공적으로 접속하였습니다.`
									);
									Janus.log(` --Janus-- WebCam Display Name : ${myId} 님이 Feed를 생성하였습니다.`);

									for (var f in list) {
										var display = list[f]['display'];
										var id = list[f]['id'];
										let mobileId =  myId + 2;
										
										if (display === String(mobileId) && !isNaN(display)) {
											Janus.log(` --Janus-- Mobile Display name : ${display} 님이 Feed를 생성하였습니다.`);
											// createAnswer 제작
											mobileFeed(id);
										}
									}

									publishOwnFeed(msg);
								} else if (event === 'event') {
									let list = msg['publishers'];

									Janus.log(
										' --Janus-- Got a list of available publishers/feeds:',
										list
									);

									for (var f in list) {
										var display = list[f]['display'];
										var id = list[f]['id'];
										let mobileId =  myId + 2;
										
										Janus.log(`Display Value : ${display}, Mobile Display Value : ${mobileId}`)

										if (display === String(mobileId) && !isNaN(display)) {
											// createAnswer 제작
											mobileFeed(id);
										}
									}
								} else if (event === 'destroyed') {
									Janus.warn("The room has been destroyed!");
									alert('The Janus room has been destroyed', function() {
										window.location.reload();
									});
								} else if (msg["leaving"]) {
									// One of the publishers has gone away?
									var leaving = msg["leaving"];
									Janus.log(" --Janus-- Publisher left: " + leaving);
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
							Janus.debug(' --Janus-- ::: WebCam Got a local stream :::', stream);
							// html tag 값 가져오기
							let myVideo = document.getElementById('myvideo');
							// tag에 stream data 붙이기
							Janus.attachMediaStream(myVideo, stream);
						},
						oncleanup: function () {
							Janus.log(
								" --Janus-- ::: WebCam Got a cleanup notification: we are unpublished now :::"
							);
							runJanusPC(studentId);
						},
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
}

/**
 * @description screenFeed handle 생성
 * @param {Publisher의 정보 } msg
 */
function localScreenFeed(msg) {
	janus.attach({
		plugin: 'janus.plugin.videoroom',
		opaqueId: opaqueId,

		success: function (pluginHandle) {
			screenHandle = pluginHandle; // pluginHandle 은 변수명 그대로의 의미를 지닌다.
			Janus.log(
				' --Janus-- Screen Plugin attached! (' +
					screenHandle.getPlugin() +
					', id=' +
					screenHandle.getId() +
					')'
			);
			
			screenId = myId + 1;

			var register = {
				request: 'join',
				room: msg['room'],
				ptype: 'publisher',
				private_id: mypvtid,
				display: String(screenId),
				feed: myId,
			};
			screenHandle.send({ message: register });
		},
		iceState: function (state) {
			Janus.log(' --Janus-- Screen ICE state changed to ' + state);
		},
		mediaState: function (medium, on) {
			Janus.log(
				' --Janus-- Screen Janus ' +
					(on ? 'started' : 'stopped') +
					' receiving our ' +
					medium
			);
		},
		error: function (error) {
			Janus.error(' --Janus-- Screen Error attaching plugin...', error);
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
					Janus.log(` --Janus-- Screen Display Name : ${screenId} 님이 Feed를 생성하였습니다.`);
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
			Janus.debug(' --Janus-- ::: Got a local Screen stream :::', stream);
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
	janus.attach({
		plugin: 'janus.plugin.videoroom',
		opaqueId: opaqueId,
		success: function (pluginHandle) {
			mobileFeedHandler = pluginHandle;

			Janus.log(
				' --Janus-- Mobile Plugin attached! (' +
					mobileFeedHandler.getPlugin() +
					', id=' +
					mobileFeedHandler.getId() +
					')'
			);
			Janus.log('  -- This is a mobile subscriber -- ');

			let subscribe = {
				request: 'join',
				room: roomNumber,
				ptype: 'subscriber',
				feed: id,
			};

			mobileFeedHandler.send({ message: subscribe });
		},
		onmessage: function (msg, jsep) {
			if (jsep) {
				Janus.debug('Handling SDP as well...', jsep);
				// Answer and attach
				mobileFeedHandler.createAnswer({
					jsep: jsep,
					// Add data:true here if you want to subscribe to datachannels as well
					// (obviously only works if the publisher offered them in the first place)
					media: { audioSend: false, videoSend: true }, // We want recvonly audio/video
					success: function (jsep) {
						Janus.debug('Got SDP!', jsep);
						var body = { request: 'start', room: roomNumber };
						mobileFeedHandler.send({ message: body, jsep: jsep });
					},
					error: function (error) {
						Janus.error('WebRTC error:', error);
					},
				});
			}
		},
		onremotestream: function (stream) {
			Janus.debug(' --Janus-- ::: Got a local Mobile stream :::', stream);
			// html tag 값 가져오기
			let myVideoMobile = document.getElementById('myVideoMobile');
			// tag에 stream data 붙이기
			Janus.attachMediaStream(myVideoMobile, stream);
		},
		oncleanup: function () {
			mobileFeed(id);
		},
	});
}

/**
 * @description createOffer 를 통해서 screenFeed 생성
 */
function publishOwnScreenFeed() {
	// Publish our stream
	screenHandle.createOffer({
		media: { video: 'screen', audioSend: true, videoRecv: true }, // Publishers are sendonly
		success: function (jsep) {
			Janus.debug('Got publisher screen SDP!', jsep);
			var publish = { request: 'configure', audio: true, video: true };
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
function joinTheRoom(roomID) {
	let register = {
		request: 'join',
		room: roomID,
		ptype: 'publisher',
		feed: myId,
		display: String(myId),
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
		room: numOfCandidate,
		require_pvtid: false,
		bitrate: 500000,
		notify_joining: true,
		// 참여 가능한 publisher 수 = (참가자 인원 * 3) + (eyetracker, promoter)
		publishers: numOfCandidate * 4 + 2,
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
		success: function (res) {
			if (res.exists) {
				console.log("방있음 -- in isRoomExist");
				joinTheRoom(roomNum);
			} else {
				console.log("방없음 -- in isRoomExist");
				createTheRoom(roomNumber);
			}
		},
		error: function (error) {
			Janus.error('WebRTC error:', error);
			Janus.log(`roomID = ${roomNum} 방이 존재하지 않습니다.`);
			return null;
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
			videoRecv: true,
			audioSend: false,
			videoSend: true,
		},
		success: function (jsep) {
			Janus.log('Got publisher SDP!', jsep);
			let publish = { request: 'configure', audio: false, video: true };
			videoHandlerOnPC.send({ message: publish, jsep: jsep });

			// localScreenFeed 생성
			localScreenFeed(msg);
		},
		error: function (error) {
			Janus.error('WebRTC error:', error);
			publishOwnFeed(msg);
		},
	});
}