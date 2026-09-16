import Cabecalho from "./Componente/Cabecalho";
import Calendario from "./Componente/Calendario";
import Login from "./Componente/Login";
import Contato from "./Componente/Contato";
import Rodape from "./Componente/Rodape";
import NoticiasCard from "./Componente/NoticiasCard";


import "./index.css";


function Home() {
  return (
    <div className="pagina">

      <Cabecalho />

      <main>
        <NoticiasCard />
        <Calendario />
        <Login/>
        <Contato />
      </main>

      <Rodape />

    </div>
  );
}

export default Home;