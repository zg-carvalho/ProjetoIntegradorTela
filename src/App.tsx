import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import { Home } from './pages/Home'; // ✅ Importação da nova página Home
import { NoticiaList } from './pages/NoticiaList';
import { NoticiaEditor } from './pages/NoticiaEditor';
import { NoticiaPage } from './pages/NoticiaPage';
import { UserList } from './pages/UserList';
import { UserForm } from './pages/UserForm';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Home — exibe apenas as 3 primeiras notícias */}
        <Route path="/" element={<Home />} /> {/* ✅ Configurada como rota principal */}

        {/* ✅ ADICIONE ESTA LINHA: Rota pública para listar todas as notícias */}
        <Route path="/noticias" element={<NoticiaList />} />

        {/* Noticia pública — visualização da notícia completa */}
        <Route path="/noticias/:slug" element={<NoticiaPage />} />

        {/* Painel Administrativo — listagem completa exige login */}
        <Route path="/admin/noticias" element={<PrivateRoute><NoticiaList /></PrivateRoute>} /> {/* ✅ Protegida e movida para /admin */}

        {/* Noticias — criar e editar exigem login */}
        <Route path="/noticias/new" element={<PrivateRoute><NoticiaEditor /></PrivateRoute>} />
        <Route path="/noticias/:id/edit" element={<PrivateRoute><NoticiaEditor /></PrivateRoute>} />

        {/* Usuários — exigem login */}
        <Route path="/users" element={<PrivateRoute><UserList /></PrivateRoute>} />
        <Route path="/users/new" element={<PrivateRoute><UserForm /></PrivateRoute>} />
        <Route path="/users/:id/edit" element={<PrivateRoute><UserForm /></PrivateRoute>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;