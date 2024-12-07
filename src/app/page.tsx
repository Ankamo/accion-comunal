// pages/index.tsx

import React from "react";
import "../styles/globals.css";

const Page: React.FC = () => {
    return (
        <main className="main-container">

            {/* Artículo central */}
            <article className="main-article">
                <h1 className="article-title">Bienvenido a la WebApp de Acción Comunal</h1>
                <p className="article-paragraph">
                    Estamos encantados de tenerte aquí. Este sitio está diseñado para ofrecerte
                    toda la información y recursos que necesitas de manera clara y accesible.
                </p>
                <p className="article-paragraph">
                    Explora nuestras secciones, descubre los servicios que ofrecemos y no dudes
                    en contactarnos si necesitas más información.
                </p>

                {/* Sección de símbolos comunales */}
                <div className="communal-symbols">
                    <h2 className="symbols-title">Símbolos Comunales</h2>
                </div>
            </article>
        </main>
    );
};

export default Page;
