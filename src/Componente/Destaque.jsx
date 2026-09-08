import fotoPerfil2 from "../assets/perfil2.jpg";

function Destaque() {
  return (
    <section id="destaque">

      <h2>Destaques</h2>

      <img
        src={fotoPerfil2}
        alt="Logo da Unidade Escolar José Amável"
      />

      <p>
        Unidade Escolar José Amável - Matias Olímpio (PI).
      </p>

    </section>
  );
}

export default Destaque;