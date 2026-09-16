import ProjectCard from "./ProjectCard";

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