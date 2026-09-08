import "./Noticias.css";

function Noticias() {
  const noticias = [
    {
      id: 1,
      titulo: "Início do ano letivo",
      data: "2026",
      imagem: "/imagens/escola.jpg",
      descricao:
        "Confira as principais informações sobre o início do ano letivo do CETI José Amável.",
    },

    {
      id: 2,
      titulo: "Projetos desenvolvidos pelos alunos",
      data: "2026",
      imagem: "/imagens/projeto.jpg",
      descricao:
        "Conheça os projetos e atividades desenvolvidos pelos estudantes durante o ano letivo.",
    },

    {
      id: 3,
      titulo: "Eventos escolares",
      data: "2026",
      imagem: "/src/img/Desfile.png",
      descricao:
        "Desfile de 7 de setembro, apresentações culturais e outras atividades que aconteceram na escola.",
    },
  ];

  return (
    <main className="pagina-noticias">

      <section className="noticias-header">
        <h1>Notícias</h1>

        <p>
          Acompanhe as principais notícias, eventos e atividades
          do CETI José Amável.
        </p>
      </section>

      <section className="noticias-container">

        {noticias.map((noticia) => (
          <article className="noticia-card" key={noticia.id}>

            <img
              src={noticia.imagem}
              alt={noticia.titulo}
            />

            <div className="noticia-conteudo">

              <span className="noticia-data">
                {noticia.data}
              </span>

              <h2>{noticia.titulo}</h2>

              <p>{noticia.descricao}</p>

              <button>
                Ler notícia
              </button>

            </div>

          </article>
        ))}

      </section>

    </main>
  );
}

export default Noticias;