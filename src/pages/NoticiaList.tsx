import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { Noticia } from '../types/noticia';
import { fetchNoticias, deleteNoticia } from '../api/noticias';
import { SECTION_LABELS } from '../types/noticia';
import type { SectionType } from '../types/noticia';
import { useAuth } from '../context/AuthContext';
import './NoticiaList.css';

export function NoticiaList() {
  const navigate = useNavigate();
  const location = useLocation();

  // Recebe a propriedade hideHeader enviada pela página anterior
  const hideHeader = location.state?.hideHeader ?? false;

  const { isAuthenticated } = useAuth();

  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNoticias()
      .then(setNoticias)
      .catch(() =>
        setError(
          'Backend não encontrado. Verifique se o servidor está rodando em localhost:3000'
        )
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () =>
      document.removeEventListener('mousedown', handler);
  }, []);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Remover "${name}"?`)) return;

    await deleteNoticia(id).catch(() => alert('Erro ao remover'));

    setNoticias(ps => ps.filter(p => p.id !== id));
  };

  const MENU_ACTIONS = [
    {
      label: 'Usuários',
      icon: '👤',
      description: 'Gerenciar usuários do sistema',
      onClick: () => {
        setMenuOpen(false);
        navigate('/users');
      },
    },
  ];

  return (
    <div className="noticia-list">

      {/* HEADER */}
      {!hideHeader && (
        <header className="noticia-header">
          <div className="noticia-header-inner">

            <div className="noticia-header-title">
              <h1>Páginas de Noticia</h1>

              <p>
                Editor visual de páginas web para seus noticias
              </p>
            </div>

            <div className="noticia-header-spacer" />

            <div className="noticia-header-actions">

              {isAuthenticated ? (
                <>
                  <button
                    className="btn-new-page"
                    onClick={() => navigate('/noticias/new')}
                  >
                    + Nova página
                  </button>

                  {/* DROPDOWN */}
                  <div
                    ref={menuRef}
                    className="noticia-actions-menu"
                  >
                    <button
                      className={`btn-actions ${
                        menuOpen ? 'active' : ''
                      }`}
                      onClick={() =>
                        setMenuOpen(o => !o)
                      }
                      title="Mais ações"
                    >
                      <span>Ações</span>

                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className={
                          menuOpen
                            ? 'actions-arrow open'
                            : 'actions-arrow'
                        }
                      >
                        <path
                          d="M3 5l4 4 4-4"
                          stroke="#64748b"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {menuOpen && (
                      <div className="actions-dropdown">

                        <div className="actions-dropdown-title">
                          <span>Ações</span>
                        </div>

                        {MENU_ACTIONS.map(action => (
                          <button
                            key={action.label}
                            className="action-item"
                            onClick={action.onClick}
                          >
                            <span className="action-icon">
                              {action.icon}
                            </span>

                            <div>
                              <div className="action-label">
                                {action.label}
                              </div>

                              <div className="action-description">
                                {action.description}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <button
                  className="btn-login"
                  onClick={() => navigate('/login')}
                >
                  Entrar
                </button>
              )}

            </div>
          </div>
        </header>
      )}

      {/* CONTEÚDO */}
      <main className="noticia-content">

        {/* Loading */}
        {loading && (
          <div className="noticia-loading">
            Carregando…
          </div>
        )}

        {/* Erro */}
        {error && (
          <div className="noticia-error">
            ⚠️ {error}
          </div>
        )}

        {/* Nenhuma notícia */}
        {!loading &&
          noticias.length === 0 &&
          !error && (
            <div className="noticia-empty">

              <h2>
                Nenhuma página criada
              </h2>

              <p>
                {isAuthenticated
                  ? 'Crie sua primeira página de noticia com editor visual'
                  : 'Entre para criar e gerenciar páginas de noticia'}
              </p>

              <button
                className="btn-create-first"
                onClick={() =>
                  isAuthenticated
                    ? navigate('/noticias/new')
                    : navigate('/login')
                }
              >
                {isAuthenticated
                  ? 'Criar primeira página'
                  : 'Fazer login'}
              </button>

            </div>
          )}

        {/* LISTA */}
        {noticias.length > 0 && (
          <div className="noticias-grid">

            {noticias.map(p => (
              <div
                key={p.id}
                className="noticia-card"
              >

                {/* CAPA */}
                <div
                  className="noticia-cover"
                  onClick={() =>
                    navigate(`/noticias/${p.slug}`)
                  }
                >
                  {p.coverImage ? (
                    <img
                      src={p.coverImage}
                      alt={p.name}
                    />
                  ) : (
                    <div className="no-cover">
                      Sem foto de capa
                    </div>
                  )}

                  <div className="cover-overlay">
                    <span>
                      /{p.slug}
                    </span>
                  </div>
                </div>

                {/* CONTEÚDO */}
                <div className="noticia-card-content">

                  <h3>
                    {p.name}
                  </h3>

                  {p.description && (
                    <p className="noticia-description">
                      {p.description}
                    </p>
                  )}

                  {/* SEÇÕES */}
                  <div className="noticia-sections">

                    {(p.sections ?? []).map(s => (
                      <span
                        key={s.id}
                        className="section-tag"
                      >
                        {SECTION_LABELS[
                          s.type as SectionType
                        ] ?? s.type}
                      </span>
                    ))}

                    {(p.sections ?? []).length === 0 && (
                      <span className="no-sections">
                        Sem seções
                      </span>
                    )}

                  </div>
                </div>

                {/* AÇÕES */}
                <div className="noticia-card-actions">

                  <button
                    className="btn-view"
                    onClick={() =>
                      navigate(`/noticias/${p.slug}`)
                    }
                  >
                    Ver página
                  </button>

                  {isAuthenticated && (
                    <>
                      <button
                        className="btn-edit"
                        onClick={() =>
                          navigate(`/noticias/${p.id}/edit`)
                        }
                      >
                        Editar
                      </button>

                      <button
                        className="btn-delete"
                        onClick={() =>
                          p.id &&
                          handleDelete(p.id, p.name)
                        }
                      >
                        ×
                      </button>
                    </>
                  )}

                </div>
              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}