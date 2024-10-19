// components/Formulario.tsx
"use client"; // Agrega esta línea para marcar el componente como un Componente del Cliente

import React, { useState } from 'react';

const Formulario = () => {
    const [departamento, setDepartamento] = useState('');
    const [busqueda, setBusqueda] = useState('');

    // Lista de departamentos para el ejemplo
    const departamentos = [
        { id: 1, nombre: 'Antioquia' },
        { id: 2, nombre: 'Cundinamarca' },
        { id: 3, nombre: 'Valle del Cauca' },
        { id: 4, nombre: 'Bogotá' },
        // Agrega más departamentos según sea necesario
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'departamento') {
            setDepartamento(value);
        } else if (name === 'busqueda') {
            setBusqueda(value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica de envío del formulario
        console.log('Departamento seleccionado:', departamento);
        console.log('Búsqueda:', busqueda);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Buscar Organización de Acción Comunal</h2>
            
            <div className="mb-4">
                <label htmlFor="departamento" className="block text-sm font-medium text-gray-700 mb-2">
                    Departamento:
                </label>
                <select
                    id="departamento"
                    name="departamento"
                    value={departamento}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md p-2"
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

            <div className="mb-4">
                <label htmlFor="busqueda" className="block text-sm font-medium text-gray-700 mb-2">
                    Búsqueda:
                </label>
                <input
                    type="text"
                    id="busqueda"
                    name="busqueda"
                    value={busqueda}
                    onChange={handleChange}
                    placeholder="Ingresa el nombre de la organización"
                    className="block w-full border border-gray-300 rounded-md p-2"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Buscar
            </button>
        </form>
    );
};

export default Formulario;
