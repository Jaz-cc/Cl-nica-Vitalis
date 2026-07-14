import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaClock,
  FaEnvelope,
  FaUserMd,
} from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";

import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero" id="inicio">
          <div className="hero__content">
            <span className="hero__badge">Atención médica disponible 24/7</span>

            <h1>
              Tu salud, al alcance de <span>un clic</span>
            </h1>

            <p>
              Agenda, consulta, reprograma o cancela tus citas médicas de forma
              rápida, segura y sin llamadas telefónicas.
            </p>

            <div className="hero__buttons">
              <Link to="/registro" className="button button--primary">
                Agendar una cita
              </Link>

              <Link to="/iniciar-sesion" className="button button--secondary">
                Iniciar sesión
              </Link>
            </div>

            <div className="hero__information">
              <span>✓ Atención segura</span>
              <span>✓ Médicos especialistas</span>
              <span>✓ Recordatorios automáticos</span>
            </div>
          </div>

          <div className="hero__visual">
            <div className="appointment-card">
              <div className="appointment-card__icon">
                <FaCalendarCheck />
              </div>

              <h2>Agenda tu consulta</h2>

              <p>Selecciona especialidad, médico, fecha y horario.</p>

              <div className="appointment-card__detail">
                <FaUserMd />
                <div>
                  <strong>Médicos especialistas</strong>
                  <span>Consulta disponibilidad en tiempo real</span>
                </div>
              </div>

              <div className="appointment-card__detail">
                <FaClock />
                <div>
                  <strong>Horarios flexibles</strong>
                  <span>Programa tu cita desde cualquier lugar</span>
                </div>
              </div>

              <div className="appointment-card__detail">
                <FaEnvelope />
                <div>
                  <strong>Recordatorios</strong>
                  <span>Recibe confirmaciones por correo electrónico</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="services" id="servicios">
          <div className="section-heading">
            <span>Nuestros servicios</span>
            <h2>Una plataforma diseñada para cuidar tu tiempo</h2>
            <p>
              Gestiona tus citas médicas desde una sola plataforma sencilla y
              accesible.
            </p>
          </div>

          <div className="services__grid">
            <article className="service-card">
              <FaCalendarCheck />
              <h3>Agenda en línea</h3>
              <p>
                Programa citas médicas sin acudir personalmente ni realizar
                llamadas.
              </p>
            </article>

            <article className="service-card">
              <FaClock />
              <h3>Disponibilidad 24/7</h3>
              <p>
                Consulta horarios y administra tus citas en cualquier momento.
              </p>
            </article>

            <article className="service-card">
              <FaUserMd />
              <h3>Especialistas</h3>
              <p>
                Encuentra médicos disponibles de acuerdo con la especialidad que
                necesitas.
              </p>
            </article>

            <article className="service-card">
              <FaEnvelope />
              <h3>Notificaciones</h3>
              <p>
                Recibe confirmaciones y recordatorios para reducir olvidos e
                inasistencias.
              </p>
            </article>
          </div>
        </section>

        <section className="cta" id="contacto">
          <div>
            <span>Clínica Vitalis</span>
            <h2>Comienza a gestionar tus citas médicas</h2>
            <p>Regístrate y encuentra el horario más adecuado para ti.</p>
          </div>

          <Link to="/registro" className="button button--white">
            Crear una cuenta
          </Link>
        </section>
      </main>
    </>
  );
}

export default Home;