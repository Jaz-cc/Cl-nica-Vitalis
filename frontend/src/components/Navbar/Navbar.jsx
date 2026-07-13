import { Link } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar__logo">
        <FaHeartbeat />
        <span>Clínica Vitalis</span>
      </Link>

      <nav className="navbar__links">
        <a href="#inicio">Inicio</a>
        <a href="#servicios">Servicios</a>
        <a href="#beneficios">Beneficios</a>
        <a href="#contacto">Contacto</a>
      </nav>

      <div className="navbar__actions">
        <Link to="/iniciar-sesion" className="navbar__login">
          Iniciar sesión
        </Link>

        <Link to="/registro" className="navbar__register">
          Registrarse
        </Link>
      </div>
    </header>
  );
}

export default Navbar;