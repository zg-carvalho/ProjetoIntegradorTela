import Cabecalho from "./Componente/Cabecalho";
import Destaque from "./Componente/Destaque";
import Noticias from "./Componente/Noticias";
import Projetos from "./Componente/Projetos";
import Calendario from "./Componente/Calendario";
import Contato from "./Componente/Contato";
import Rodape from "./Componente/Rodape";

import "./index.css";

function App() {
  return (
    <div className="pagina">

      <Cabecalho />

      <main>
        <Destaque />
        <Noticias />
        <Projetos />
        <Calendario />
        <Contato />
      </main>

      <Rodape />

    </div>
  );
}

export default App;