import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Noticia } from '../types/noticia';
import { fetchNoticias } from '../api/noticias';
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
      
      {/* Cabeçalho Isolado (Estilizado via CSS com fundo branco e alinhado à esquerda) */}
      <header className="home-header-wrapper">
        <div className="home-header-content">
          <h1>CETI JOSÉ AMÁVEL</h1>
          <p>Editor visual de páginas web para seus noticias</p>
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

      {/* 🚀 Seu novo Rodapé adicionado no local correto */}
      <footer className="home-footer-global"> 
        <p> © 2026 - Desenvolvido pela equipe do Projeto Integrador. Todos os direitos reservados. </p> 
      </footer>
    </div>
  );
}