'use client';

import React, { useEffect, useState } from 'react';
import Confederacion from '../../components/formulario/Confederacion';
import Federacion from '../../components/formulario/Federacion';
import Asociacion from '../../components/formulario/Asociacion';
import Jac from '../../components/formulario/Jac';
import Jvc from '../../components/formulario/Jvc';

const Page: React.FC = () => {
    const [activeComponent, setActiveComponent] = useState<string>(window.location.hash.slice(1) || 'confederacion');

    // Cambia el componente activo y actualiza la URL con el hash
    const handleNavClick = (component: string) => {
        setActiveComponent(component);
        window.location.hash = component;
    };

    // Actualiza el componente activo cuando cambia el hash en la URL
    useEffect(() => {
        const onHashChange = () => {
            setActiveComponent(window.location.hash.slice(1) || 'confederacion');
        };
        window.addEventListener('hashchange', onHashChange);

        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

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
                    <li onClick={() => handleNavClick('confederacion')}>Confederación</li>
                    <li onClick={() => handleNavClick('federacion')}>Federación</li>
                    <li onClick={() => handleNavClick('asociacion')}>Asociación</li>
                    <li onClick={() => handleNavClick('jac')}>JAC</li>
                    <li onClick={() => handleNavClick('jvc')}>JVC</li>
                </ul>
            </nav>
            {renderComponent()}
        </div>
    );
};

export default Page;
