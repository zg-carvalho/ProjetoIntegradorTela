import { FaWhatsappSquare } from "react-icons/fa";
import fotoPerfil from "../assets/perfil.jpg";

function Cabecalho() {
  return (
    <header className="cabecalho">
      <nav className="menu">

        <div id="logo">
          <img
            src={fotoPerfil}
            alt="Logo do CETI José Amável"
          />

          <span id="nome-escola">
            CETI - José Amável
          </span>
        </div>

        <ul className="menu-list">

          <li>
            <a href="/noticias" className="btn btn-light">
              Notícias
            </a>
          </li>

          <li>
            <a href="#projetos" className="btn btn-light">
              Provas e Atividades
            </a>
          </li>

          <li>
            <a href="#calendario" className="btn btn-light">
              Calendário Escolar
            </a>
          </li>

          <li>
            <a href="#contato" className="btn btn-light">
              Contato
            </a>
          </li>

          <li className="item-whatsapp">
            <a
              href="https://wa.me"
              target="_blank"
              rel="noopener noreferrer"
              className="link-whatsapp"
            >
              <FaWhatsappSquare size={32} />
            </a>
          </li>

        </ul>

      </nav>
    </header>
  );
}

export default Cabecalho;