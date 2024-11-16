import React from 'react';
import '../styles/nav.css'; // Si tienes un archivo CSS para los estilos de navegación

const Nav = () => {
    return (
        <nav>
            <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="/cartelera-comunal">Cartelera Comunal</a></li>
                <li><a href="/eventos-y-actividades">Eventos y Actividades</a></li>
                <li><a href="/reuniones-y-asambleas">Reuniones y Asambleas</a></li>
                <li><a href="/proyectos-comunales">Proyectos</a></li>
                <li><a href="/servicios-comunales">Servicios Comunales</a></li>
                <li><a href="/sobre-nosostros">Sobre Nosotros</a></li>
                <li><a href="/ingresar">Ingresar</a></li>
            </ul>
        </nav>
    );
};

export default Nav;
