import { useNavigate } from "react-router-dom";

const ResultModal = ({ id, setIsOpen }) => {
  const navigate = useNavigate();

  return (
    <div className="flex modal-div">
      <div className="modal">
        <p className="result-text">You have won the game 🥳</p>
        <div className="flex flex-end flex-align-center">
        <button className="btn secondary" onClick={() => setIsOpen(false)}>Cancel</button>
        <button className="btn primary next-btn" onClick={() => { window.location.href = `/${+id + 1}` }}>Next</button>
        </div>
      </div>
    </div>)
};

export default ResultModal;