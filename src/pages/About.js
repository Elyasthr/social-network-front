import React from 'react';

const About = () => {
  return (
    <div className="jumbotron">
            <h1 className="display-6">A Propos</h1>
            <hr className="my-6"></hr>
            <div className="row">
                <div className="col-sm-6">
                    <h3>WebMaster : Touahria Elyas</h3>
                    <p> Projet realisé en 4 mois pour valider ma formation</p>
                    <p>Technologies utilisé :</p>
                    <p>Back-End: NodeJs, ExpressJs, MongoDB</p>
                    <p>Front-End: ReactJs, Bootstrap</p>
                    <p><a href="https://github.com/Elyasthr/social-network">lien vers le code source du projet </a></p>
                    <p>Remerciement à l'equipe Ifocop et Virtuoworks pour leur enseignement</p>
                </div>
            </div>
    </div>
  )
}

export default About;