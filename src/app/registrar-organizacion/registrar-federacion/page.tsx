// src/app/registrar-federacion.tsx
import React from 'react';
import FederacionForm from '../../../components/formulario/Federacion'; // Asegúrate de que esta ruta sea correcta

const RegistrarFederacion: React.FC = () => {
    return (
        <div>
            <h1>Registrar Federación</h1>
            <FederacionForm />
        </div>
    );
};

export default RegistrarFederacion;
