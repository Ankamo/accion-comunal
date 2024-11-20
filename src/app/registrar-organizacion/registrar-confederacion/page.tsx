// src/app/registrar-confederacion.tsx
import React from 'react';
import ConfederacionForm from '../../../components/formulario/Confederacion'; // Asegúrate de que esta ruta sea correcta

const RegistrarConfederacion: React.FC = () => {
    return (
        <div>
            <h1>Registrar Confederación</h1>
            <ConfederacionForm />
        </div>
    );
};

export default RegistrarConfederacion;

