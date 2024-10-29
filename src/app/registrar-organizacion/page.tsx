'use client';

import React, { useState } from 'react';
import Confederacion from '../../components/formulario/Confederacion'; // Ajusta la ruta según tu estructura de carpetas
import Federacion from '../../components/formulario/Federacion'; // Asegúrate de tener este componente
import Asociacion from '../../components/formulario/Asociacion'; // Asegúrate de tener este componente
import Jac from '../../components/formulario/Jac'; // Asegúrate de tener este componente
import Jvc from '../../components/formulario/Jvc'; // Asegúrate de tener este componente

const Page: React.FC = () => {
    const [activeComponent, setActiveComponent] = useState('confederacion');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'confederacion':
                return <Confederacion />;
            case 'federacion':
                return <Federacion />;
            case 'asociacion':
                return <Asociacion />;
            case 'jac':
                return <Jac />;
            case 'jvc':
                return <Jvc />;
            default:
                return null;
        }
    };

    return (
        <div>
            <nav>
                <ul className="nav-list">
                    <li onClick={() => setActiveComponent('confederacion')}>Confederación</li>
                    <li onClick={() => setActiveComponent('federacion')}>Federación</li>
                    <li onClick={() => setActiveComponent('asociacion')}>Asociación</li>
                    <li onClick={() => setActiveComponent('jac')}>JAC</li>
                    <li onClick={() => setActiveComponent('jvc')}>JVC</li>
                </ul>
            </nav>
            {renderComponent()}
        </div>
    );
};

export default Page;

