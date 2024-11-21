// src/app/registrar-jvc.tsx
import React from 'react';
import JvcForm from '../../../components/formulario/Jvc'; // Ruta correcta a jvc.tsx

const RegistrarJvc: React.FC = () => {
    return (
        <div>
            <h1>Registrar Junta de Vivienda Comunal (JVC)</h1>
            <JvcForm />
        </div>
    );
};

export default RegistrarJvc;
