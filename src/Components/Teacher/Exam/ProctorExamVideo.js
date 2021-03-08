import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Janus from "../../../modules/janus/janus";

const ProctorExamVideo = ({
  particStdFlag,
  particStdList,
  highlightStateVoice,
  highlightStateEye,
  currentStdNumber,
}) => {
  useEffect(() => {
    console.log(particStdList)
  })


  const [streamData, setStreamData] = useState([]);
  const [streamDataId, setStreamDataId] = useState([]);

 useEffect(() => {
   console.log("********************");
   console.log(streamData);
 }, [streamData]);

  let server = null;
  let janus = null;

  let videoHandlerOnPC = null;

  let myId = 33;
  let mypvtid = null;

  let room = 1234;

  var opaqueId = "teacher" + Janus.randomString(12); // opaqueId 값을 통해서 유저 구분을 한다.

  const TEST_CANDIDATE_NUM = 5;

  if (window.location.protocol === "http:")
    server = "http://re-coder.net/janus";
  else server = "https://re-coder.net/janus";

  function runJanusTeacher() {
    Janus.init({
      debug: "all",
      callback: function () {
        janus = new Janus({
          server: server,
          opaqueId: opaqueId,

          success: function () {
            // VideoRoom plugin 지정
            janus.attach({
              plugin: "janus.plugin.videoroom",
              opaqueId: opaqueId,

              success: function (pluginHandle) {
                videoHandlerOnPC = pluginHandle;

                Janus.log(
                  ` --Janus-- Teacher Plugin attached! (${videoHandlerOnPC.getPlugin()}, ID = ${videoHandlerOnPC.getId()})`
                );

                var register = {
                  request: "join",
                  room: room,
                  id: 7777,
                  ptype: "publisher",
                };
                videoHandlerOnPC.send({ message: register });
              },
              // WebRTC 권한 허용 표시 관련 UI 출력
              // User 등록 후 실행 콜백
              // msg 값에 따라 event 처리 가능
              onmessage: function (msg, jsep) {
                Janus.debug(" ::: Got a message (publisher) :::", msg);
                console.log("msg error_code !!!!! : ", msg["error_code"]);

                // 같은 아이디 접속 발견 시 해당 사용자 강제퇴장
                if (msg["error_code"] == 436) {
                  const kick = {
                    request: "kick",
                    secret: "adminpwd",
                    room: 1234,
                    id: 7777,
                  };

                  videoHandlerOnPC.send({ message: kick });
                  //runJanusTeacher();
                }

                let event = msg["videoroom"];

                if (event) {
                  if (event === "joined") {
                    let list = msg["publishers"];

                    Janus.log(
                      "Got a list of available publishers/feeds:",
                      list
                    );

                    for (var f in list) {
                      var id = list[f]["id"];
                      let display = list[f]["display"];

                      // Student list에서 display Name이 있는 publisher에 한해서 Feed 생성
                      if (display !== null) {
                        Janus.log(
                          ` --Janus-- Display Name : ${display} 님이 Feed를 생성하였습니다.`
                        );
                        newRemoteFeed(id, display);
                      }
                    }

                    myId = msg["id"];
                    mypvtid = msg["private_id"];

                    Janus.log(
                      `${msg["room"]}에 성공적으로 접속하였습니다. ID = ${myId}`
                    );
                  } else if (event === "event") {
                    let list = msg["publishers"];

                    Janus.log(
                      "Got a list of available publishers/feeds:",
                      list
                    );
                    for (var f in list) {
                      var id = list[f]["id"];
                      let display = list[f]["display"];

                      if (display !== null) {
                        Janus.log(
                          ` --Janus-- Display Name : ${display} 님이 Feed를 생성하였습니다.`
                        );
                        newRemoteFeed(id, display);
                      }
                    }
                  }
                }
                if (jsep) {
                  Janus.debug("Handling SDP as well...", jsep);
                  videoHandlerOnPC.handleRemoteJsep({
                    jsep: jsep,
                  });
                }
              },
              iceState: function (state) {
                Janus.log("ICE state changed to " + state);
              },
              mediaState: function (medium, on) {
                Janus.log(
                  "Janus " +
                    (on ? "started" : "stopped") +
                    " receiving our " +
                    medium
                );
              },
              oncleanup: function () {},
              error: function (error) {
                console.log(error);
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

  function newRemoteFeed(id, displayValue) {
    let remoteFeed = null;
    janus.attach({
      plugin: "janus.plugin.videoroom",
      opaqueId: opaqueId,
      success: function (pluginHandle) {
        remoteFeed = pluginHandle;

        Janus.log(
          "Plugin attached! (" +
            remoteFeed.getPlugin() +
            ", id=" +
            remoteFeed.getId() +
            ")"
        );

        let subscribe = {
          request: "join",
          room: room,
          ptype: "subscriber",
          feed: id,
          private_id: mypvtid,
        };

        remoteFeed.send({ message: subscribe });
      },

      onmessage: function (msg, jsep) {
        Janus.debug(" ::: Got a message (subscriber) :::", msg);
        let event = msg["videoroom"];
        Janus.debug("Event: " + event);
        if (msg["error"]) {
        } else if (event) {
          if (event === "attached") {
            remoteFeed.rfdisplay = displayValue;

            Janus.log(
              "Successfully attached that Display Value is" +
                " (" +
                remoteFeed.rfdisplay +
                ") in room " +
                msg["room"]
            );
          }
        }
        if (jsep) {
          Janus.debug("Handling SDP as well...", jsep);
          // Answer and attach
          remoteFeed.createAnswer({
            jsep: jsep,
            // Add data:true here if you want to subscribe to datachannels as well
            // (obviously only works if the publisher offered them in the first place)
            media: { audioSend: false, videoSend: false }, // We want recvonly audio/video
            success: function (jsep) {
              Janus.debug("Got SDP!", jsep);
              var body = { request: "start", room: room };
              remoteFeed.send({ message: body, jsep: jsep });
            },
            error: function (error) {
              Janus.error("WebRTC error:", error);
            },
          });
        }
      },
      onremotestream: function (stream) {
        // div에 붙일 이름 규칙 정하기
        let video = document.getElementById("remote" + remoteFeed.rfdisplay);
        // tag에 stream data 붙이기
        console.log("온리모트스트림 피드 : remote", remoteFeed.rfdisplay);
       // Janus.attachMediaStream(video, stream);

        setStreamData([...streamData, stream]);
        console.log(streamData);
      },
    });
  }

  /**
   * @description 방 접속
   * @param {접속할 방 번호} roomID
   */
  function joinTheRoom(roomID, userId) {
    let register = {
      request: "join",
      room: roomID,
      id: userId,
      ptype: "subscriber",
      // display: myUsername,
    };

    videoHandlerOnPC.send({
      message: register,
      success: function () {
        Janus.log("방에 접속하였습니다 !");
        return true;
      },
      error: function (error) {
        Janus.error("WebRTC error:", error);
        Janus.log("방에 접속하지 못했습니다 !");
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
      request: "create",
      bitrate: 500000,
      // 참여 가능한 publisher 수 = (참가자 인원 * 3) + (eyetracker, promoter)
      publishers: numOfCandidate * 3 + 2,
    };

    videoHandlerOnPC.send({
      message: create,
      success: function (result) {
        Janus.log(`room = ${result["room"]} 방이 생성되었습니다.`);
        // 방 번호 return
        joinTheRoom(result["room"]);
      },
      error: function (error) {
        Janus.error("WebRTC error:", error);
        Janus.log("방이 생성되지 않았습니다 !");
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
      request: "exists",
      room: roomNum,
    };

    videoHandlerOnPC.send({
      message: exists,
      success: function () {
        Janus.log(`roomID = ${roomNum} 방이 존재합니다.`);
        return true;
      },
      error: function (error) {
        Janus.error("WebRTC error:", error);
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
        Janus.log("Got publisher SDP!", jsep);
        let publish = { request: "configure", audio: false, video: true };
        videoHandlerOnPC.send({ message: publish, jsep: jsep });

        // localScreenFeed 생성
        // Janus.log(msg['publishers']['id']);
        // localScreenFeed(msg);
      },
      error: function (error) {
        Janus.error("WebRTC error:", error);
        publishOwnFeed(msg);
      },
    });
  }

  return Object.keys(particStdList).length !== 0 ? (
    particStdList.map((v) => (
      <div className="std_video_area">
        <div className="std_test_info">
          <p>{v.s_name}</p>
          <ul>
            <li>경고 {v.eye_caution}회</li>
            <li>음성 {v.mic_caution}회</li>
          </ul>
        </div>
        <div
          className={`std_warning_area${
            currentStdNumber === v.s_number && highlightStateVoice
              ? " voice"
              : ""
          }`}
        ></div>
        <div
          className={`std_warning_area${
            currentStdNumber === v.s_number && highlightStateEye ? " eye" : ""
          }`}
        ></div>
        <div className="std_video_set">
          <div className="monitor_view">
            <video
              srcObject={streamDataId === Number(v.s_number + 1) && streamData}
              id={"remote" + Number(v.s_number + 1)}
              width="441"
              height="248"
              autoPlay="autoplay"
              muted="muted"
              loop="loop"
              border-radius="20px"
            >
              해당 브라우저는 video 태그를 지원하지 않습니다.
            </video>
          </div>
          <div className="web_mobile_cam">
            <video
              srcObject={streamDataId === v.s_number && streamData}
              id={"remote" + v.s_number}
              width="219"
              height="164"
              autoPlay="autoplay"
              muted="muted"
              loop="loop"
            >
              해당 브라우저는 video 태그를 지원하지 않습니다.
            </video>
            <video
              srcObject={streamDataId === Number(v.s_number + 2) && streamData}
              id={"remote" + Number(v.s_number + 2)}
              width="219"
              height="164"
              autoPlay="autoplay"
              muted="muted"
              loop="loop"
            >
              해당 브라우저는 video 태그를 지원하지 않습니다.
            </video>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p>접속중</p>
  );
};

export default ProctorExamVideo;