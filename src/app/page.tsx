// src/app/page.tsx
"use client";

import React, { useState } from 'react';

const Page = () => {
    const [departamento, setDepartamento] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [oacEncontradas, setOacEncontradas] = useState<string[]>([]);

    const data = {
        Antioquia: ['Medellín', 'Envigado', 'Itagüí'],
        Cundinamarca: ['Bogotá', 'Girardot', 'Soacha'],
        'Valle del Cauca': ['Cali', 'Palmira', 'Buenaventura'],
        Bogotá: ['Bogotá D.C.']
    };

    const organizaciones = {
        Girardot: ['OAC Girardot 1', 'OAC Girardot 2'],
        Medellín: ['OAC Medellín 1', 'OAC Medellín 2'],
        Cali: ['OAC Cali 1', 'OAC Cali 2'],
    };

    const handleDepartamentoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDepartamento(e.target.value);
        setMunicipio('');
    };

    const handleMunicipioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMunicipio(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (municipio) {
            const oacMunicipio = organizaciones[municipio as keyof typeof organizaciones] || [];
            setOacEncontradas(oacMunicipio);
        } else {
            setOacEncontradas([]);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-gray-800 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Buscar OAC por Municipio</h2>

            <div className="mb-6">
                <label htmlFor="departamento" className="block text-sm font-medium text-gray-300 mb-2">
                    Departamento:
                </label>
                <select
                    id="departamento"
                    name="departamento"
                    value={departamento}
                    onChange={handleDepartamentoChange}
                    className="block w-full border border-gray-600 bg-gray-700 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                    <option value="" disabled>Selecciona un departamento</option>
                    {Object.keys(data).map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                    ))}
                </select>
            </div>

            <div className="mb-6">
                <label htmlFor="municipio" className="block text-sm font-medium text-gray-300 mb-2">
                    Municipio:
                </label>
                <select
                    id="municipio"
                    name="municipio"
                    value={municipio}
                    onChange={handleMunicipioChange}
                    disabled={!departamento}
                    className="block w-full border border-gray-600 bg-gray-700 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                    <option value="" disabled>Selecciona un municipio</option>
                    {departamento && data[departamento as keyof typeof data]?.map(mun => (
                        <option key={mun} value={mun}>{mun}</option>
                    ))}

                </select>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Buscar
            </button>

            {oacEncontradas.length > 0 && (
                <div className="mt-6 bg-gray-700 text-white p-4 rounded-md">
                    <h3 className="text-xl font-bold mb-4">OAC Registradas en {municipio}:</h3>
                    <ul>
                        {oacEncontradas.map((oac, index) => (
                            <li key={index} className="mb-2">{oac}</li>
                        ))}
                    </ul>
                </div>
            )}
        </form>
    );
};

export default Page;
