// pages/index.tsx

import React from 'react';
import LeftSection from "@/components/principal/main/section/izquierdo/page"; // Se elimina la extensión .tsx y la palabra Import en mayúscula
import RightSection from "@/components/principal/main/section/derecho/page"; // Se elimina la extensión .tsx y la palabra Import en mayúscula
import HimnoComunal from "@/components/principal/simbolos/himno/page";
import Logo from '@/components/principal/simbolos/logo/page';
import Bandera from '@/components/principal/simbolos/bandera/page';
import '../styles/main.css'; // Importa el archivo CSS personalizado

const Page: React.FC = () => {
    return (
        <main className="main-container">
            {/* Sección izquierda */}
            <LeftSection />

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

                    {/* Himno de la Acción Comunal */}
                    <HimnoComunal />

                    {/* Logo de la Acción Comunal */}
                    <Logo />
                    
                    {/* Bandera de la Acción Comunal */}
                    <Bandera />
                </div>

                <button className="cta-button">
                    Ingresar Ahora
                </button>
            </article>

            {/* Sección derecha */}
            <RightSection />
        </main>
    );
};

export default Page;
