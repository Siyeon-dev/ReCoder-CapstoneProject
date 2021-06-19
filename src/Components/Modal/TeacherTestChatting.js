import React, { useState } from "react";

const TeacherTestChatting = ({
  StdName,
  StdEmail,
  isOpen,
  setIsOpen,
  Modal,
  socket,
}) => {
  const [messageDataArray, setMessageDataArray] = useState([]);
  const [sendMessage, setSendMessage] = useState("");

  const handleChange = (e, setFunction) => {
    e.preventDefault();
    setFunction(e.target.value);
  };

  const chattingHandleSubmit = (e) => {
    e.preventDefault();
    console.log(StdEmail);
    console.log(sendMessage);

    socket.emit("send message", {
      name: StdEmail,
      message: sendMessage,
    });
    setMessageDataArray([
      ...messageDataArray,
      { type: "send", message: sendMessage },
    ]);
    console.log(messageDataArray);
  };

  return (
    <>
      <Modal>
        <div className="modal tch_chatting">
          <div className="modal_area">
            <div className="chatting_header">
              <p>{`${StdName}의 메세지`}</p>
            </div>
            <div className="chatting_area">
              <ul>
                {/* <li className="send">
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Iure totam voluptas iusto magni ipsum temporibus aliquid,
                    nostrum repellendus rerum quis eius impedit accusamus
                    maiores delectus voluptates deleniti ipsa unde. Cupiditate.
                  </span>
                </li>
                <li className="receive">
                  <span>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Iure totam voluptas iusto magni ipsum
                  </span>
                </li> */}
                {messageDataArray.length !== 0 && messageDataArray.map((v) => (
                  <li className={v.type === "send" ? "send" : "receive"}>
                    <span>{v.message}</span>
                  </li>
                ))}
              </ul>
              <div className="chatting_send_input">
                <form onSubmit={chattingHandleSubmit}>
                  <input
                    type="text"
                    placeholder="메세지를 입력해주세요."
                    onChange={(e) => {
                      handleChange(e, setSendMessage);
                    }}
                  />
                  <button type="submit">
                    <img src="/img/chatting_send_ico.gif" alt="메세지 보내기" />
                  </button>
                </form>
              </div>
            </div>

            <button onClick={() => setIsOpen(false)} className="modal_close">
              <img src="/img/modal_close.gif" alt="모달 닫기" />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TeacherTestChatting;
