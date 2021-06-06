import axios from "axios";
import { useCookies } from "react-cookie";
import useModal from "./useModal";

const DeleteModal = ({ readClass, classListUpdate, userClassInfo }) => {
  const [isOpen, setIsOpen, Modal] = useModal();


  const [cookies, setCookie, removeCookie] = useCookies();

  const handleCheckArray = [];
  const uniqueArr = [];

  const handleCheck = (e) => {
    handleCheckArray.push(e.target.name);

    handleCheckArray.forEach((element) => {
      if (!uniqueArr.includes(element)) {
        uniqueArr.push(element);
      } else {
        console.log(element);
        uniqueArr.splice(uniqueArr.indexOf(element), 1);
      }
    });
    handleCheckArray.length = 0;
    console.log(uniqueArr);
  };

  const delClassListSubmit = (e) => {
    e.preventDefault();
    let ArrClassCode = uniqueArr.map((ArrClassCode) => {
      return { class_code: `${ArrClassCode}` };
    });
    console.log(ArrClassCode);

    axios
      .post("/classdelete", ArrClassCode)
      .then((res) => {
        console.log(res);
        readClass(cookies.t_email);
      })
      .catch((err) => {
        console.log(err);
      })
      .then(
        () => readClass({ t_email: cookies.t_email }),
        classListUpdate,
        setIsOpen(!isOpen)
      );
  };

  const delClassListSetUp = userClassInfo.map((currElement, index) => (
    <div className="class_list_check">
      <input
        type="checkbox"
        id={index}
        name={currElement.class_code}
        onChange={handleCheck}
      />
      <label for={index}>{currElement.class_name}</label>
    </div>
  ));

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        <img src="/img/nav_setting_btn.gif" alt="클래스 삭제" />
      </button>
      <Modal>
        <div className="modal delete_class">
          <div className="modal_area">
            <div className="modal_head">
              <p className="tit">클래스 삭제하기</p>
              <p className="txt">클래스 삭제 시 복구하실 수 없습니다.</p>
            </div>
            <form onSubmit={delClassListSubmit}>
              <div className="class_list_area">
                {userClassInfo.length === 0 ? <p className="no_class_list">생성된 클래스가 없습니다.</p> : delClassListSetUp}
              </div>
              <button type="submit">삭제하기</button>
            </form>
            <button onClick={() => setIsOpen(false)} className="modal_close">
              <img src="/img/modal_close.gif" alt="모달 닫기" />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
