// components/Formulario.tsx
"use client"; // Agrega esta línea para marcar el componente como un Componente del Cliente

import React, { useState } from 'react';

const Formulario = () => {
    const [departamento, setDepartamento] = useState('');
    const [organizacion, setOrganizacion] = useState('');

    // Lista de departamentos para el ejemplo
    const departamentos = [
        { id: 1, nombre: 'Antioquia' },
        { id: 2, nombre: 'Cundinamarca' },
        { id: 3, nombre: 'Valle del Cauca' },
        { id: 4, nombre: 'Bogotá' },
        // Agrega más departamentos según sea necesario
    ];

    // Lista de organizaciones de acción comunal para el ejemplo
    const organizaciones = [
        { id: 1, nombre: 'Organización 1' },
        { id: 2, nombre: 'Organización 2' },
        { id: 3, nombre: 'Organización 3' },
        { id: 4, nombre: 'Organización 4' },
        // Agrega más organizaciones según sea necesario
    ];

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'departamento') {
            setDepartamento(value);
        } else if (name === 'organizacion') {
            setOrganizacion(value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica de envío del formulario
        console.log('Departamento seleccionado:', departamento);
        console.log('Organización seleccionada:', organizacion);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-gray-800 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Buscar Organización de Acción Comunal</h2>
            
            <div className="mb-6">
                <label htmlFor="departamento" className="block text-sm font-medium text-gray-300 mb-2">
                    Departamento:
                </label>
                <select
                    id="departamento"
                    name="departamento"
                    value={departamento}
                    onChange={handleChange}
                    className="block w-full border border-gray-600 bg-gray-700 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                    <option value="" disabled>
                        Selecciona un departamento
                    </option>
                    {departamentos.map(dept => (
                        <option key={dept.id} value={dept.nombre}>
                            {dept.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-6">
                <label htmlFor="organizacion" className="block text-sm font-medium text-gray-300 mb-2">
                    Organización:
                </label>
                <select
                    id="organizacion"
                    name="organizacion"
                    value={organizacion}
                    onChange={handleChange}
                    className="block w-full border border-gray-600 bg-gray-700 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                    <option value="" disabled>
                        Selecciona una organización
                    </option>
                    {organizaciones.map(org => (
                        <option key={org.id} value={org.nombre}>
                            {org.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Buscar
            </button>
        </form>
    );
};

export default Formulario;
