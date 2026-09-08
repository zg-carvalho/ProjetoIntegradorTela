import ProjectCard from "./ProjectCard";

const meusProjetos = [
  {
    id: 1,
    titulo: "Projetos Escolar",
    descricao: "Espaço Virtual feito com HTML, CSS e Java"
  },
  {
    id: 2,
    titulo: "Provas e Atividades",
    descricao: "Apresentação feita com tecnologia moderna"
  },
  {
    id: 3,
    titulo: "Calendário Acadêmico",
    descricao: "Sistema Web para acompanhar metas e resultados da Escola"
  }
];

function Projetos() {
  return (
    <section id="projetos">

      <h2>Provas e Atividades</h2>

      <div className="projetos-container">

        {meusProjetos.map((projeto) => (
          <ProjectCard
            key={projeto.id}
            titulo={projeto.titulo}
            descricao={projeto.descricao}
            link={projeto.link}
          />
        ))}

      </div>

    </section>
  );
}

export default Projetos;