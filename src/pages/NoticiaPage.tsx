import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { generatePageHtml } from '../utils/pageGenerator';
import { fetchNoticiaBySlug } from '../api/noticias';
import type { Noticia } from '../types/noticia';

export function NoticiaPage() {
  const { slug } = useParams<{ slug: string }>();

  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    fetchNoticiaBySlug(slug)
      .then(setNoticia)
      .catch(() => setError('Noticia não encontrado'))
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif', color: '#ef4444' }}>
        {error || 'Noticia não encontrada'}
      </div>
    );
  }

  const html = generatePageHtml(noticia);

  return (
    <iframe
      srcDoc={html}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', border: 'none' }}
      sandbox="allow-scripts allow-same-origin"
      title={noticia.name}
    />
  );
}
