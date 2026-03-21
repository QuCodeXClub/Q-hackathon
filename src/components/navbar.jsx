import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/logo.svg";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container">
        
        {/* Logo */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src={logo} className="nav-logo" />
        </Link>

        {/* Mobile Toggle */}
        <div
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Nav Links */}
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          
          {/* Page Links */}
          <div className="page-links">
            <Link to="/" className="nav-item" onClick={closeMenu}>Home</Link>
            <Link to="/#about" className="nav-item" onClick={closeMenu}>About</Link>
            <Link to="/#tracks" className="nav-item" onClick={closeMenu}>Tracks</Link>
            <Link to="/#timeline-section" className="nav-item" onClick={closeMenu}>Roadmap</Link>
            <Link to="/#faq" className="nav-item" onClick={closeMenu}>FAQ</Link>
          </div>

          {/* Action Links */}
          <div className="action-links">
            <Link to="/sponsors" className="nav-item external-link" onClick={closeMenu}>
              Sponsors
            </Link>
            <Link to="/register" className="btn-nav" onClick={closeMenu}>
              Register
            </Link>
          </div>

        </nav>
      </div>
    </header>
  );
}

export default Navbar;