
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNoticiaBySlug } from '../api/noticias';
import type { Noticia } from '../types/noticia';

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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontFamily: 'sans-serif',
          color: '#94a3b8'
        }}
      >
        Carregando…
      </div>
    );
  }

  if (error || !noticia) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontFamily: 'sans-serif',
          color: '#ef4444',
          gap: '16px'
        }}
      >
        <p>{error || 'Notícia não encontrada'}</p>

        <button
          onClick={() => navigate('/')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Voltar para Home
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ffffff',
        zIndex: 99999,
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}
    >
      <div className={styles.container}>

        {/* Botão Voltar */}
        <button
          onClick={() => navigate(-1)}
          className={styles.backButton}
        >
          ← Voltar
        </button>

        {/* Título */}
        <h1 className={styles.title}>
          {noticia.name}
        </h1>

        {/* Imagem principal */}
        {noticia.coverImage && (
          <div className={styles.imageWrapper}>
            <img
              src={noticia.coverImage}
              alt={noticia.name}
              className={styles.image}
            />
          </div>
        )}

        {/* Conteúdo da notícia */}
        <article className={styles.content}>

          {noticia.sections && noticia.sections.length > 0 ? (

            noticia.sections.map((section, index) => {

              /* ============================
                 SEÇÃO DE TEXTO
                 ============================ */
              if (section.type === 'text') {

                const content = section.content as {
                  title?: string;
                  body?: string;
                  align?: string;
                };

                return (
                  <div
                    key={section.id ?? index}
                    style={{
                      marginBottom: '24px',
                      textAlign:
                        content.align === 'center'
                          ? 'center'
                          : content.align === 'right'
                            ? 'right'
                            : 'left'
                    }}
                  >

                    {/* Título da seção, se existir */}
                    {content.title && (
                      <h2
                        style={{
                          marginBottom: '12px'
                        }}
                      >
                        {content.title}
                      </h2>
                    )}

                    {/* TEXTO ATUALIZADO */}
                    {content.body && (
                      <div
                        style={{
                          whiteSpace: 'pre-wrap',
                          lineHeight: 1.7
                        }}
                      >
                        {content.body}
                      </div>
                    )}

                  </div>
                );
              }

              /* ============================
                 GALERIA
                 ============================ */
              if (section.type === 'gallery') {

                const content = section.content as {
                  title?: string;
                  images?: Array<{
                    url: string;
                    caption: string;
                  }>;
                };

                return (
                  <div
                    key={section.id ?? index}
                    style={{
                      marginBottom: '32px'
                    }}
                  >

                    {content.title && (
                      <h2
                        style={{
                          marginBottom: '16px'
                        }}
                      >
                        {content.title}
                      </h2>
                    )}

                    {content.images?.map((image, imageIndex) => (

                      <figure
                        key={imageIndex}
                        style={{
                          margin: '0 0 24px 0'
                        }}
                      >

                        <img
                          src={image.url}
                          alt={image.caption || ''}
                          style={{
                            width: '100%',
                            maxWidth: '100%',
                            height: 'auto',
                            display: 'block',
                            borderRadius: '8px'
                          }}
                        />

                        {image.caption && (
                          <figcaption
                            style={{
                              marginTop: '8px',
                              fontSize: '14px',
                              color: '#64748b',
                              textAlign: 'center'
                            }}
                          >
                            {image.caption}
                          </figcaption>
                        )}

                      </figure>

                    ))}

                  </div>
                );
              }

              return null;
            })

          ) : (

            /* Compatibilidade com notícias antigas */
            <div
              style={{
                whiteSpace: 'pre-wrap',
                lineHeight: 1.7
              }}
            >
              {noticia.description}
            </div>

          )}

        </article>

      </div>
    </div>
  );
}

