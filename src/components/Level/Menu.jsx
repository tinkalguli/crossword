const Menu = ({setIsMenuOpen}) => {
  return (
    <nav className="menu">
      <i onClick={() => setIsMenuOpen(false)} className="ri-close-line close-btn"></i>
      <ul className="nav-list">
        <li>Reveal letter</li>
        <li>Reveal word</li>
        <li>Reset</li>
      </ul>
    </nav>
  )
};

export default Menu;