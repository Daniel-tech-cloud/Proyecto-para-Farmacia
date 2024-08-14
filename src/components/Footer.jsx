
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../style.css';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h3>Acerca de</h3>
                    <p>
                        Somos una empresa dedicada a la venta de medicamentos y productos de salud.
                        Nuestro objetivo es ofrecer productos de alta calidad a precios accesibles.
                    </p>
                </div>
                <div className="footer-section links">
                    <h3>Enlaces Rápidos</h3>
                    <ul>
                        <li><Link to="/home">Inicio</Link></li>
                        <li><Link to="/laboratorios">Laboratorios</Link></li>
                    </ul>
                </div>
                <div className="footer-section social">
                    <h3>Síguenos</h3>
                    <div className="social-icons">
                        <a href="" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a href="" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2024 Daniel López Barrera | Todos los derechos reservados.
            </div>
        </footer>
    );
};


