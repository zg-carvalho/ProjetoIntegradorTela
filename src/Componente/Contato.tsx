import { useState } from "react";
import { FaWhatsappSquare } from "react-icons/fa";

function Contato() {


  return (
    
    <section id="contato">
            <a href="#contato" className="btn btn-light">
              Contato
            </a>
          

          <div className="item-whatsapp">
            <a
              href="https://wa.me"
              target="_blank"
              rel="noopener noreferrer"
              className="link-whatsapp"
            >
              <FaWhatsappSquare size={32} />
            </a>
          </div>   
    

    </section>
  );
}

export default Contato;