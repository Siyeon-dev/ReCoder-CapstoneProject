import React from 'react'
import Clipboard from "react-clipboard.js";

const CodeClipboardCopy = ({ classCode }) => {
  const CopySuccess = () => {
    alert("招待コードクリップボードコピーされました。");
  };

  return (
    <Clipboard
      data-clipboard-text={`クラスに招待されました。 \nクラス招待コードを入力すると加入することができます。 \n招待コード : ${classCode}`}
      onSuccess={CopySuccess}
    >
      招待コード <span>{classCode}</span>
    </Clipboard>
  );
};

export default CodeClipboardCopy
