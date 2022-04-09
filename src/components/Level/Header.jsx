import { useNavigate } from "react-router-dom";

const Header = ({ level }) => {
  const navigate = useNavigate();
  const goToLevelList = () => navigate("/");

  return (
    <header className="header flex flex-between flex-align-center">
      <h2 className="flex flex-align-center">
        <i onClick={goToLevelList} className="ri-arrow-left-line back-btn"></i>
        <span className="level-name">{level.id}</span>
      </h2>
      <i className="ri-menu-3-line"></i>
    </header>)
};

export default Header;