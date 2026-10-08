
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaWhatsappSquare } from 'react-icons/fa';
import type { Noticia } from '../types/noticia';
import { fetchNoticias } from '../api/noticias';
import fotoPerfil from "../assets/JPEG.jpg";
import './home.css';

export function Home() {
  const navigate = useNavigate();
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNoticias()
      .then((dados) => {
        // Pega apenas as 3 primeiras notícias da lista recebida
        const tresPrimeiras = dados.slice(0, 3);
        setNoticias(tresPrimeiras);
      })
      .catch((err) => console.error('Erro ao carregar home:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="home-loading">Carregando novidades...</div>;
  }

  return (
    <div className="home-container">

      {/* Cabeçalho */}
      <header className="home-header-wrapper">
        <div className="home-header-content">

          {/* Bloco do Logo */}
          <div id="logo">
            <img
              src={fotoPerfil}
              alt="Logo do CETI José Amável"
            />
          </div>

          {/* Bloco de Texto */}
          <div className="home-header-text">
            <h1>CETI JOSÉ AMÁVEL</h1>
            <p>Editor visual de páginas web para seus noticias</p>
          </div>

          {/* Botão na extrema direita */}
          <button
            onClick={() =>
              navigate('/noticias', {
                state: { hideHeader: true }
              })
            }
            className="btn-header-news"
          >
            Todas as Notícias
          </button>

        </div>
      </header>

      {/* Conteúdo Centralizado */}
      <main className="home-main-content">

        {noticias.length === 0 ? (
          <p className="home-empty-message">
            Nenhuma notícia cadastrada no momento.
          </p>
        ) : (
          <div className="home-news-grid">

            {noticias.map((item) => (
              <div
                key={item.id}
                className="news-card"
              >

                {/* Imagem da notícia */}
                {item.coverImage && (
                  <img
                    src={item.coverImage}
                    alt={item.name}
                    className="news-card-image"
                  />
                )}

                <div className="news-card-body">

                  {/* Título da notícia */}
                  <h3>{item.name}</h3>

                  {/* Link para a notícia completa */}
                  <Link
                    to={`/noticias/${item.slug}`}
                    className="btn-read-more"
                  >
                    Ler notícia completa
                  </Link>

                </div>

              </div>
            ))}

          </div>
        )}

        {/* Calendário Escolar */}
        <section id="calendario">

          <h2>Calendário Escolar</h2>

          <p>
            Confira abaixo o Calendário Escolar 2026:
          </p>

          <iframe
            src="/calendario_escola_2026.pdf"
            width="100%"
            height="700px"
            title="Calendário Escolar 2026"
          ></iframe>

        </section>

        {/* Mais notícias */}
        <div className="home-more-news">

          <Link
            to="/noticias"
            className="btn-view-all"
          >
            Login e Notícias
          </Link>

        </div>

      </main>

      {/* Seção de Contato */}
      <section
        id="contato"
        className="whatsapp-floating-section"
      >

        <a
          href="#contato"
          className="btn btn-light btn-floating-contato"
        >
          Contato
        </a>

        <div className="item-whatsapp">

          <a
            href="https://wa.me"
            target="_blank"
            rel="noopener noreferrer"
            className="link-whatsapp"
          >
            <FaWhatsappSquare size={36} />
          </a>

        </div>

      </section>

      {/* Rodapé */}
      <footer className="home-footer-global">

        <p>
          © 2026 - Desenvolvido pela equipe do Projeto Integrador.
          Todos os direitos reservados.
        </p>

      </footer>

    </div>
  );
}



