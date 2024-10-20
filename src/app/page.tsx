import React from 'react';
import '../styles/page.css'; // Asegúrate de tener los estilos actualizados

const Page: React.FC = () => {
    return (
        <div className="page-container">
            {/* Aside Izquierdo */}
            <aside className="aside-left">
                <section className="ad-section">
                    <h3>Publicidad 1</h3>
                    <p>Espacio publicitario para empresas 1.</p>
                </section>

                <section className="ad-section">
                    <h3>Publicidad 2</h3>
                    <p>Espacio publicitario para empresas 2.</p>
                </section>

                <section className="ad-section">
                    <h3>Publicidad 3</h3>
                    <p>Espacio publicitario para empresas 3.</p>
                </section>
            </aside>

            {/* Sección Principal */}
            <main className="main-content">
                <h1>Contenido Principal</h1>
                <p>Este es el área principal de la página.</p>
            </main>

            {/* Aside Derecho */}
            <aside className="aside-right">
                <section className="ad-section">
                    <h3>Publicidad 1</h3>
                    <p>Espacio publicitario para empresas 1.</p>
                </section>

                <section className="ad-section">
                    <h3>Publicidad 2</h3>
                    <p>Espacio publicitario para empresas 2.</p>
                </section>

                <section className="ad-section">
                    <h3>Publicidad 3</h3>
                    <p>Espacio publicitario para empresas 3.</p>
                </section>
            </aside>
        </div>
    );
};

export default Page;
