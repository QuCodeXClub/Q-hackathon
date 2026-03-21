import logo from "../assets/qhackathon-name.svg";
import { Link } from "react-router-dom";

const exploreLinks = [
  { name: "Home", to: "/" },
  { name: "About", to: "/#about" },
  { name: "Tracks", to: "/#tracks" },
  { name: "Roadmap", to: "/#timeline-section" },
  { name: "FAQs", to: "/#faq" },
];

const engageLinks = [
  { name: "Register Now", to: "/register" },
  { name: "Sponsor Us", to: "/sponsors" },
  { name: "Contact Support", to: "/#contact" },
  { name: "Code of Conduct", to: "#" },
  { name: "Privacy Policy", to: "#" },
];

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-glow-line"></div>

      <div className="container footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo-link">
            <img src={logo} className="footer-logo-img" />
          </Link>

          <p>
            Empowering the next generation of innovators through code,
            collaboration, and creativity.
          </p>

          <div className="social-links">
            <a href="#" className="social-icon">IG</a>
            <a href="#" className="social-icon">IN</a>
            <a href="#" className="social-icon">X</a>
          </div>
        </div>

        {/* Explore */}
        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            {exploreLinks.map((link, i) => (
              <li key={i}>
                <Link to={link.to}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Engage */}
        <div className="footer-links">
          <h4>Engage</h4>
          <ul>
            {engageLinks.map((link, i) => (
              <li key={i}>
                <Link to={link.to}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div className="container bottom-flex">
          <p>
            © 2026 CodeX Club. Built with{" "}
            <span className="heart">♥</span>
          </p>
          <p className="footer-location">📍 Quantum University</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;