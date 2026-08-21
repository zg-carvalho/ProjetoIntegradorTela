import React from "react";

function ProjectCard({titulo, descricao, link }){

    return(
       <article className="card-projeto">
        <h3>{titulo}</h3>
        <p>{descricao}</p>
        <a href={link} target="_blank" rel="noopener noreferrer" >
          Ver no GitHub
        </a>
       </article>
    );
}

export default ProjectCard