import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNoticiaBySlug } from '../api/noticias';
import type { Noticia } from '../types/noticia';

// Importação das classes estilizadas modernas mapeadas do arquivo de CSS externo
import styles from './NoticiaPage.module.css';

export function NoticiaPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    fetchNoticiaBySlug(slug)
      .then(setNoticia)
      .catch(() => setError('Notícia não encontrada'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif', color: '#94a3b8' }}>
        Carregando…
      </div>
    );
  }

  if (error || !noticia) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif', color: '#ef4444', gap: '16px' }}>
        <p>{error || 'Notícia não encontrada'}</p>
        <button 
          onClick={() => navigate('/')}
          style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Voltar para Home
        </button>
      </div>
    );
  }

  return (
    /* ✅ Div de Isolamento Absoluto adicionada para remover a linha vertical e cobrir a tela inteira */
    <div style={{
      position: 'fixed',
      inset: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#ffffff',
      zIndex: 99999,
      overflowY: 'auto',
      boxSizing: 'border-box'
    }}>
      <div className={styles.container}>
        {/* Botão Voltar moderno com micro-interações */}
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          ← Voltar
        </button>

        {/* Título com espaçamento estilizado */}
        <h1 className={styles.title}>
          {noticia.name}
        </h1>

        {/* Wrapper com sombra moderna e efeito hover na imagem */}
        {noticia.coverImage && (
          <div className={styles.imageWrapper}>
            <img 
              src={noticia.coverImage} 
              alt={noticia.name} 
              className={styles.image} 
            />
          </div>
        )}

        {/* Bloco de Conteúdo / Informações com melhor tipografia e legibilidade */}
        <article className={styles.content}>
          {noticia.description}
        </article>
      </div>
    </div>
  );
}