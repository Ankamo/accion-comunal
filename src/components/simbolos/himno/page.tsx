// components/Hymn.tsx

import React from 'react';

const HimnoComunal: React.FC = () => {
    return (
        <div className="symbol-item">
            <h3>Himno de la Acción Comunal</h3>
            <div className="hymn-lyrics">
                <p><strong>Coro</strong><br />
                    Como hermanos que amamos la patria<br />
                    Olvidemos el odio y el mal<br />
                    Empuñemos la nueva bandera<br />
                    Que nos brinda la acción comunal</p>

                <p><strong>I</strong><br />
                    Colombianos la patria nos llama<br />
                    Con su voz sublime e inmortal<br />
                    A librar la batalla gloriosa<br />
                    De la transformación nacional</p>

                <p><strong>II</strong><br />
                    Nuestro suelo claro ha de brillar<br />
                    Cambiaremos el medio ambiental<br />
                    Con salud, educación y trabajo<br />
                    Y que viva la acción comunal</p>

                <p><strong>III</strong><br />
                    Que la paz reviva en los campos<br />
                    Y la tierra volvamos ha arar<br />
                    Para ver orgullosos flameando<br />
                    Nuestro gran tricolor nacional</p>

                <p><strong>Coro</strong><br />
                    Como hermanos que amamos la patria<br />
                    Olvidemos el odio y el mal<br />
                    Empuñemos la nueva bandera<br />
                    Que nos brinda la acción comunal</p>

                <p><strong>IV</strong><br />
                    Su futuro está en nuestras manos<br />
                    Nuestros hijos frutos han de dar<br />
                    Forjaremos valores conscientes<br />
                    A través de la Acción Comunal</p>

                <p><strong>V</strong><br />
                    Del Caribe al lejano Amazonas<br />
                    Del Vichada al Pacífico inmortal<br />
                    Cantaremos unidos los himnos<br />
                    El de Núñez y Acción Comunal</p>

                <p><strong>VI</strong><br />
                    Nuestro esfuerzo será el homenaje<br />
                    Que en San Pedro Bolívar pidió<br />
                    Al bajar al sepulcro tranquilo<br />
                    Ofreciendo la paz que forjó</p>

                <p><strong>Coro</strong><br />
                    Como hermanos que amamos la patria<br />
                    Olvidemos el odio y el mal<br />
                    Empuñemos la nueva bandera<br />
                    Que nos brinda la acción comunal</p>
            </div>
            <iframe
                className="hymn-video"
                src="https://www.youtube.com/embed/2kpoRKKis9A"
                title="Himno de la Acción Comunal"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default HimnoComunal;
