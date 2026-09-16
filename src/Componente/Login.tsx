
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate(); // 2. Instancie o hook

  // 3. Crie a função de envio
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Evita que a página recarregue
    
    // Aqui você pode colocar a validação de login se quiser
    
    navigate("/HomeNoticia"); // Redireciona para a rota desejada
  };

  return (
    <section id="Login">
      <h2>Admin</h2>
      {/* 4. Adicione o onSubmit no formulário */}
      <form onSubmit={handleSubmit}> 
        <div className="campo">
          <label htmlFor="nome">Nome</label>
          <input id="nome" type="text" />
        </div>

        <div className="campo">
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" />
        </div>

        <button type="submit">login</button>
      </form>
    </section>
  );
}

export default Login;