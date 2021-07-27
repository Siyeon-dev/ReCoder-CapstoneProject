import React, { useEffect, useState } from "react";

const TeacherTestChatting = ({
  StdName,
  StdEmail,
  isOpen,
  setIsOpen,
  Modal,
  socket,
}) => {
  const [messageDataArray, setMessageDataArray] = useState([]);
  const [sendMessageText, setSendMessageText] = useState({});
  const [sendMessage, setSendMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState({});

  useEffect(() => {
    socket.on("receive message", (receiveMessage) => {
      console.log(receiveMessage);
      setReceiveMessage(
        { type: "receive", message: receiveMessage.message });
    });
  }, []);

  useEffect(() => {

    console.log("sendMessage");
    console.log(sendMessageText);

    setMessageDataArray([...messageDataArray, sendMessageText]);
  }, [sendMessageText, setMessageDataArray]);

  useEffect(() => {
  
console.log("receiveMessage");
console.log(receiveMessage);

  setMessageDataArray([...messageDataArray, receiveMessage]);
}, [receiveMessage, setMessageDataArray]);

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
      teacher: true,
    });
    setSendMessageText({ type: "send", message: sendMessage });
    setSendMessage("");
    console.log(messageDataArray);
  };

  return (
    <>
      <Modal>
        <div className="modal tch_chatting">
          <div className="modal_area">
            <div className="chatting_header">
              <p>{`${StdName}学生のお知らせリスト`}</p>
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
                {messageDataArray.length !== 0 &&
                  messageDataArray.map((v) => (
                    <li className={v.type === "send" ? "send" : "receive"}>
                      <span>{v.message}</span>
                    </li>
                  ))}
              </ul>
              <div className="chatting_send_input">
                <form onSubmit={chattingHandleSubmit}>
                  <input
                    type="text"
                    value={sendMessage}
                    placeholder="メッセージを入力してください。"
                    onChange={(e) => {
                      handleChange(e, setSendMessage);
                    }}
                  />
                  <button type="submit">
                    <img
                      src="/img/chatting_send_ico.gif"
                      alt="メッセージを送る"
                    />
                  </button>
                </form>
              </div>
            </div>

            <button onClick={() => setIsOpen(false)} className="modal_close">
              <img src="/img/modal_close.gif" alt="Modal Close" />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TeacherTestChatting;
