import { useState } from 'react';
import type { Noticia } from './types/noticia';
import { NoticiaList} from './pages/NoticiaList';
import { NoticiaEditor } from './pages/NoticiaEditor';
import { NoticiaPage } from './pages/NoticiaPage';

type View =
  | { page: 'list' }
  | { page: 'editor'; noticia?: Noticia }
  | { page: 'view'; noticia: Noticia };

function HomeNoticia() {
  const [view, setView] = useState<View>({ page: 'list' });

  if (view.page === 'editor') {
    return (
      <NoticiaEditor
        initial={view.noticia}
        onBack={() => setView({ page: 'list' })}
        onSaved={(saved) => setView({ page: 'editor', noticia: saved })}
      />
    );
  }

  if (view.page === 'view') {
    return (
      <NoticiaPage
        noticia={view.noticia}
        onBack={() => setView({ page: 'list' })}
        onEdit={() => setView({ page: 'editor', noticia: view.noticia })}
      />
    );
  }

  return (
    <NoticiaList
      onNew={() => setView({ page: 'editor' })}
      onEdit={(p) => setView({ page: 'editor', noticia: p })}
      onView={(p) => setView({ page: 'view', noticia: p })}
    />
  );
}

export default HomeNoticia;
