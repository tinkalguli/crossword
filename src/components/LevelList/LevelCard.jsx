import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { PAPER_COLORS } from "./constants";
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";

const LevelCard = ({ level }) => {
  const navigate = useNavigate();
  const randomNumber = Math.floor(Math.random() * 10);
  const firstRandomBoolean = Math.random() > 0.5;
  const secondRandomBoolean = Math.random() > 0.5;
  const paperColor = PAPER_COLORS[randomNumber] || "blue";

  const goInsideLevel = (id) => navigate(`/${id}`);

  const wordCount = level.words.length;
  const answeredWordCount = level.words.filter(word => word.isAnswered).length;
  const percentage = (answeredWordCount / wordCount) * 100;

  return (
    <div key={level.id} className="level-card-wrapper flex">
      <div className={`level-card paper ${paperColor}`} onClick={() => goInsideLevel(level.id)} >
        <div className={`${firstRandomBoolean ? "tape-section" : "top-tape"}`}></div>
        <div className="flex flex-between flex-align-center level-card-content">
          <div style={{ width: 50, height: 50 }}>
          <AnimatedProgressProvider
            valueStart={0}
            valueEnd={percentage}
            duration={1.4}
            easingFunction={easeQuadInOut}
          >
            {value => {
              const roundedValue = Math.round(value);
              return (
                <CircularProgressbar
                  value={value}
                  text={`${roundedValue}%`}
                  background
                  backgroundPadding={6}
                  styles={buildStyles({
                    pathTransition: "none",
                    backgroundColor: "#333",
                    textColor: "#fff",
                    pathColor: "#fff",
                    trailColor: "#666"
                  })}
                />
              );
            }}
          </AnimatedProgressProvider>
          </div>
          <div>
            <i className="ri-grid-line grid-icon"></i>
            <center>{level.slug}</center>
          </div>
          <i className="ri-arrow-right-s-line"></i>
        </div>
        {secondRandomBoolean && <div className={`${secondRandomBoolean ? "tape-section" : "top-tape"}`}></div>}
      </div>
    </div>);
}

export default LevelCard;