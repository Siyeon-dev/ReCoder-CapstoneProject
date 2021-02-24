import React from 'react'
import Clipboard from "react-clipboard.js";

const CodeClipboardCopy = ({ classCode }) => {
  const CopySuccess = () => {
    alert("초대 코드 클립보드 복사가 완료되었습니다.");
  };

  return (
    <Clipboard
      data-clipboard-text={`클래스에 초대되셨습니다. \n클래스 초대 코드를 입력하면 가입하실 수 있습니다. \n초대 코드 : ${classCode}`}
      onSuccess={CopySuccess}
    >
      초대코드 <span>{classCode}</span>
    </Clipboard>
  );
};

export default CodeClipboardCopy
