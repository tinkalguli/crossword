import { useNavigate } from "react-router-dom";

import { PAPER_COLORS } from "./constants";

const LevelCard = ({ level }) => {
  const navigate = useNavigate();
  const randomNumber = Math.floor(Math.random() * 10);
  const firstRandomBoolean = Math.random() > 0.5;
  const secondRandomBoolean = Math.random() > 0.5;
  const paperColor = PAPER_COLORS[randomNumber] || "blue";

  const goInsideLevel = (id) => navigate(`/${id}`);

  return (
    <div onClick={() => goInsideLevel(level.id)} key={level.id} className="level-card-wrapper flex">
      <div className={`level-card paper ${paperColor}`}>
        <div className={`${firstRandomBoolean ? "tape-section" : "top-tape"}`}></div>
        <div>
          <i className="ri-grid-line grid-icon"></i>
          <center>{level.id}</center>
        </div>
        {secondRandomBoolean && <div className={`${secondRandomBoolean ? "tape-section" : "top-tape"}`}></div>}
      </div>
    </div>);
}

export default LevelCard;