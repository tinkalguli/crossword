const InsideKeyBoard = ({ keys, onKeyPressed, setIsOpen }) => {
  const onClick = (key) => {
    onKeyPressed(key);
    setIsOpen(false);
  }

  return (
    <div className="inside-board-wrapper flex flex-center">
      <div className="inside-board flex">
        <div>
          {
            keys.map((key) => (
              <span onClick={() => onClick(key)} className="key">{key}</span>
            ))
          }
        </div>
        <i onClick={() => setIsOpen(false)} className="ri-close-circle-line close-btn"></i>
      </div>
    </div>
  )
}

export default InsideKeyBoard;