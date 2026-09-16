
import fotoPerfil from "../assets/perfil.jpg";

function Cabecalho() {
  return (
    <header className="cabecalho">

      {/* BLOCO 1: Logo e Nome da Escola lado a lado */}
      <div id="logo">
        <img
          src={fotoPerfil}
          alt="Logo do CETI José Amável"
        />

        <span id="nome-escola">
          CETI - José Amável
        </span>
      </div>

      {/* BLOCO 2: Menu de botões à direita */}
      <nav className="menu">
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

       

        </ul>

      </nav>
    </header>
  );
}

export default Cabecalho;