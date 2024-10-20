// src/app/registro/page.tsx

"use client"; // Marca este componente como un Client Component

import React, { useState, useEffect } from 'react';
import '@styles/globals.css'; // Asegúrate de importar los estilos globales

const Registro = () => {
    const [departamentos, setDepartamentos] = useState<string[]>([]);
    const [selectedDepartamento, setSelectedDepartamento] = useState('');

    useEffect(() => {
        const obtenerDepartamentos = async () => {
            const data = [
                'Antioquia',
                'Cundinamarca',
                'Valle del Cauca',
                'Santander',
                'Atlántico',
                'Bolívar',
                'Nariño',
                'Caldas',
                // Agrega más departamentos según sea necesario
            ];
            setDepartamentos(data);
        };

        obtenerDepartamentos();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Departamento seleccionado:', selectedDepartamento);
        // Aquí puedes agregar la lógica para enviar el formulario
    };

    return (
        <div className="registro-container">
            <h1>Registro de Juntas de Acción Comunal</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="departamento">Seleccione un Departamento:</label>
                    <select
                        id="departamento"
                        value={selectedDepartamento}
                        onChange={(e) => setSelectedDepartamento(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un departamento</option>
                        {departamentos.map((departamento) => (
                            <option key={departamento} value={departamento}>
                                {departamento}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="nombre">Nombre de la Junta:</label>
                    <input type="text" id="nombre" required />
                </div>
                <div>
                    <label htmlFor="direccion">Dirección:</label>
                    <input type="text" id="direccion" required />
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default Registro;
