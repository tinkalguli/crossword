import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";

const Header = ({ answers, setAnswers, selectedIndex, selectedWord }) => {
  const navigate = useNavigate();
  const goToLevelList = () => navigate("/");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onRevealLetter = () => {
    console.log(answers);
    let answersClone = {...answers};
  }

  const onRevealWord = () => {
    console.log(answers);
    let answersClone = {...answers};
  }

  const onReset = () => {
    // setAnswers(answers)
  }

  return (
    <header className="header">
      <div className="flex flex-between flex-align-center">
        <h2 className="flex flex-align-center">
          <i onClick={goToLevelList} className="ri-arrow-left-line back-btn"></i>
          <span className="level-name">{answers.slug}</span>
        </h2>
        <i onClick={() => setIsMenuOpen(true)} className="ri-menu-3-line menu-btn"></i>
      </div>
      {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}
    </header>)
};

export default Header;