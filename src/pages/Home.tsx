import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWhatsappSquare } from 'react-icons/fa'; // 💡 Importação do ícone mantida aqui
import type { Noticia } from '../types/noticia';
import { fetchNoticias } from '../api/noticias';
import fotoPerfil from "../assets/JPEG.jpg"
import './home.css'; // ✅ Importação do arquivo css atualizado acima

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
      
      {/* Cabeçalho Isolado com o novo botão integrado */}
      <header className="home-header-wrapper">
  <div className="home-header-content">
    
    {/* Bloco do Logo */}
    <div id="logo">
      <img src={fotoPerfil} alt="Logo do CETI José Amável" />
    </div>

    {/* Bloco de Texto */}
    <div className="home-header-text">
      <h1>CETI JOSÉ AMÁVEL</h1>
      <p>Editor visual de páginas web para seus noticias</p>
    </div>
    
    {/* Botão na extrema direita */}
    <button 
      onClick={() => navigate('/noticias', { state: { hideHeader: true } })} 
      className="btn-header-news"
    >
      Todas as Notícias
    </button>

  </div>
</header>

      {/* Conteúdo Centralizado */}
      <main className="home-main-content">
        {noticias.length === 0 ? (
          <p className="home-empty-message">Nenhuma notícia cadastrada no momento.</p>
        ) : (
          <div className="home-news-grid">
            {noticias.map((item) => (
              <div key={item.id} className="news-card">
                {item.coverImage && (
                  <img src={item.coverImage} alt={item.name} className="news-card-image" />
                )}
                <div className="news-card-body">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <button
                    onClick={() => navigate(`/noticias/${item.slug}`)}
                    className="btn-read-more"
                  >
                    Ler notícia completa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Alterado para evitar conflito de classes com o footer global */}
        <div className="home-more-news">
          <button 
            onClick={() => navigate('/noticias')} 
            className="btn-view-all"
          >
            Ver Todas as Notícias →
          </button>
        </div>
      </main>

      {/* 🚀 Seção de Contato Flutuante com o botão e ícone do WhatsApp */}
      <section id="contato" className="whatsapp-floating-section">
        <a href="#contato" className="btn btn-light btn-floating-contato">
          Contato
        </a>

        <div className="item-whatsapp">
          {/* 💡 Lembre-se de substituir os zeros pelo número real com o DDD (ex: https://wa.me) */}
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

      {/* 🚀 Seu novo Rodapé adicionado no local correto */}
      <footer className="home-footer-global"> 
        <p> © 2026 - Desenvolvido pela equipe do Projeto Integrador. Todos os direitos reservados. </p> 
      </footer>
    </div>
  );
}