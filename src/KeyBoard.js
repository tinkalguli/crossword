import { useState } from "react";
import InsideKeyBoard from "./InsideKeyBoard";
import { INTERNAL_KEYS, KEYS } from "./constant"

const KeyBoard = ({onKeyPressed, onBackSpace, setIsKeyBoardOpen}) => {
  const [clickedKey, setClickedKey] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const onClick = (key) => {
    if (!INTERNAL_KEYS[key]) return onKeyPressed(key);

    setClickedKey(key);
    setIsOpen(true);
  }

  return (
    <div className="key-board">
      <div className="board-settings flex">
        <i onClick={() => setIsKeyBoardOpen(false)} className="ri-arrow-drop-down-line board-close-btn"></i>
      </div>
      {
        KEYS.map((row, index) => (
          <div key={index} className="board-row">
            {
              row.map((key) => (
                key === "delete" ?
                <span key={key} className="key backspace" onClick={() => onBackSpace()}>
                  <i className="ri-delete-back-2-line backspace-icon"></i>
                </span> :
                <span className="key" onClick={() => onClick(key)} key={key}>{key}</span>
              ))
            }
          </div>
        ))
      }
      {isOpen && <InsideKeyBoard onKeyPressed={onKeyPressed} setIsOpen={setIsOpen} keys={INTERNAL_KEYS[clickedKey]} />}
    </div>
  )
}

export default KeyBoard;