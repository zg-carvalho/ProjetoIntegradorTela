import React, { useState } from 'react'
import ProjectCard from './Componente/ProjectCard'
import fotoPerfil from './assets/perfil.jpg'
import fotoPerfil2 from './assets/perfil2.jpg'
import { FaWhatsappSquare } from "react-icons/fa";

import'./index.css'

const meusProjetos = [
  {id:1, titulo: "Projetos Escolar", descricao: "Espaço Virtual feito com HTML, CSS e Java"},
  {id:2, titulo: "Provas e Atividades", descricao: "Apresentação Feito com tecnologia moderna"},
  {id:3, titulo: "Calendário Acadêmico", descricao: "Sistema Web para Acompanhar metas e resultados da Escola"}
]


function App() {
  


  const [formData, setFormData] = useState({nome:"", email:"", msg:""})
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!formData.nome || !formData.email){
      alert("Preencha os caompos obrigatórios")
    }
    else{
      alert(`Obrigado, ${formData.nome}! Mensagem enviada.`)
      setFormData({nome:"", email:"", msg:""})
    }
  }

  return (

   <div>
     <header>
       
        <div id='logo'>
            <img src={fotoPerfil} alt='logo cabeçalho'></img>

             <span id="nome-escola"> Unidade Escolar <br></br>José Amável</span>       
        </div>
       
         
      
         <nav>
            <ul>
               <li> <a href="#sobre">Projetos Escolar</a></li>
               <li> <a href="#projetos">Provas</a></li>
               <li> <a href="#contato">Colendário Escolar</a></li>
              <li></li>

            </ul>
         </nav>

         <div>
                  
         </div>

     </header>

      <main>

<section id="destaque">
    <h2>Destaques</h2>
    <img src={fotoPerfil2} alt='Foto Logo Destaque'></img>
    <p>Unidade Escolar José Amável - Matias Olímpio (PI).</p>
  </section>

  <section id="projetos">
    <h2>Notícias</h2>
       <div class="projetos-container">
        {meusProjetos.map((projeto) => (
          <ProjectCard
          key={projeto.id}
          titulo={projeto.titulo}
          descricao={projeto.descricao}
          link={projeto.link}
        />
        ))}
       </div>
  </section>

 


 </main>

 <footer>
  <p>2026 - Desenvolvido por Josiel Carvalho</p>
 </footer>

   </div>
  )
}

export default App
