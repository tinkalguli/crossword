import { KEYS } from "./constant"

const KeyBoard = ({onKeyPressed, onBackSpace, setIsKeyBoardOpen}) => {
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
                <span className="key" onClick={() => onKeyPressed(key)} key={key}>{key}</span>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default KeyBoard;