// src/app/registrar-asociacion.tsx
import React from 'react';
import AsociacionForm from '../../../components/formulario/Asociacion'; // Asegúrate de que esta ruta sea correcta

const RegistrarAsociacion: React.FC = () => {
    return (
        <div>
            <h1>Registrar Asociación</h1>
            <AsociacionForm />
        </div>
    );
};

export default RegistrarAsociacion;
