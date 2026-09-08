import { useState } from "react";

function Contato() {

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    msg: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.email) {
      alert("Preencha os campos obrigatórios.");
      return;
    }

    alert(`Obrigado, ${formData.nome}! Mensagem enviada.`);

    setFormData({
      nome: "",
      email: "",
      msg: ""
    });
  };

  return (
    <section id="contato">

      <h2>Contato</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Nome"
          value={formData.nome}
          onChange={(e) =>
            setFormData({
              ...formData,
              nome: e.target.value
            })
          }
        />

        <input
          type="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value
            })
          }
        />

        <textarea
          placeholder="Mensagem"
          value={formData.msg}
          onChange={(e) =>
            setFormData({
              ...formData,
              msg: e.target.value
            })
          }
        />

        <button type="submit">
          Enviar
        </button>

      </form>

    </section>
  );
}

export default Contato;