// src/app/page.tsx
"use client";

import React, { useState } from 'react';

const Page = () => {
    const [departamento, setDepartamento] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [tipoOAC, setTipoOAC] = useState('');
    const [nombreOAC, setNombreOAC] = useState('');
    const [nitOAC, setNitOAC] = useState('');
    const [rucOAC, setRucOAC] = useState('');
    const [direccionOAC, setDireccionOAC] = useState('');
    const [barrioOAC, setBarrioOAC] = useState('');
    const [telefonoOAC, setTelefonoOAC] = useState('');
    const [correoOAC, setCorreoOAC] = useState('');
    const [showRegistroForm, setShowRegistroForm] = useState(false);

    const handleRegistroSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newOAC = {
            departamento,
            municipio,
            tipoOAC,
            nombreOAC,
            nitOAC,
            rucOAC,
            direccionOAC,
            barrioOAC,
            telefonoOAC,
            correoOAC,
        };

        console.log("Registro de OAC:", newOAC); // Para propósitos de prueba

        // Resetear el formulario
        setDepartamento('');
        setMunicipio('');
        setTipoOAC('');
        setNombreOAC('');
        setNitOAC('');
        setRucOAC('');
        setDireccionOAC('');
        setBarrioOAC('');
        setTelefonoOAC('');
        setCorreoOAC('');
        setShowRegistroForm(false);
    };

    return (
        <div className="p-6 bg-gray-800 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Registro de Organización de Acción Comunal (OAC)</h2>

            <button
                onClick={() => setShowRegistroForm(!showRegistroForm)}
                className="mb-4 w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
            >
                {showRegistroForm ? 'Ocultar Formulario' : 'Mostrar Formulario'}
            </button>

            {showRegistroForm && (
                <form onSubmit={handleRegistroSubmit} className="bg-gray-700 p-4 rounded-md">
                    <h3 className="text-xl font-bold mb-4 text-white">Completa los Datos de la OAC</h3>

                    <div className="mb-4">
                        <label htmlFor="departamento" className="block text-sm font-medium text-gray-300 mb-2">
                            Departamento:
                        </label>
                        <select
                            id="departamento"
                            value={departamento}
                            onChange={(e) => setDepartamento(e.target.value)}
                            className="block w-full border border-gray-600 bg-gray-600 text-white rounded-md p-3 focus:outline-none"
                            required
                        >
                            <option value="" disabled>Selecciona un departamento</option>
                            <option value="Antioquia">Antioquia</option>
                            <option value="Cundinamarca">Cundinamarca</option>
                            <option value="Valle del Cauca">Valle del Cauca</option>
                            <option value="Bogotá">Bogotá</option>
                            <option value="Otros">Otros</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="municipio" className="block text-sm font-medium text-gray-300 mb-2">
                            Municipio:
                        </label>
                        <input
                            id="municipio"
                            type="text"
                            value={municipio}
                            onChange={(e) => setMunicipio(e.target.value)}
                            className="block w-full border border-gray-600 bg-gray-600 text-white rounded-md p-3 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="tipoOAC" className="block text-sm font-medium text-gray-300 mb-2">
                            Tipo de OAC:
                        </label>
                        <select
                            id="tipoOAC"
                            value={tipoOAC}
                            onChange={(e) => setTipoOAC(e.target.value)}
                            className="block w-full border border-gray-600 bg-gray-600 text-white rounded-md p-3 focus:outline-none"
                            required
                        >
                            <option value="" disabled>Selecciona un tipo de OAC</option>
                            <option value="Junta de Acción Comunal">Junta de Acción Comunal</option>
                            <option value="Junta de Vivienda Comunal">Junta de Vivienda Comunal</option>
                            <option value="Asociación de Juntas de Acción Comunal">Asociación de Juntas de Acción Comunal</option>
                            <option value="Juntas de Vivienda Comunal">Juntas de Vivienda Comunal</option>
                            <option value="Federación Departamental de Acción Comunal">Federación Departamental de Acción Comunal</option>
                            <option value="Confederación Nacional de Acción Comunal">Confederación Nacional de Acción Comunal</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="nombreOAC" className="block text-sm font-medium text-gray-300 mb-2">
                            Nombre de la OAC:
                        </label>
                        <input
                            id="nombreOAC"
                            type="text"
                            value={nombreOAC}
                            onChange={(e) => setNombreOAC(e.target.value)}
                            className="block w-full border border-gray-600 bg-gray-600 text-white rounded-md p-3 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="nitOAC" className="block text-sm font-medium text-gray-300 mb-2">
                            NIT de la OAC:
                        </label>
                        <input
                            id="nitOAC"
                            type="text"
                            value={nitOAC}
                            onChange={(e) => setNitOAC(e.target.value)}
                            className="block w-full border border-gray-600 bg-gray-600 text-white rounded-md p-3 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="rucOAC" className="block text-sm font-medium text-gray-300 mb-2">
                            RUC de la OAC:
                        </label>
                        <input
                            id="rucOAC"
                            type="text"
                            value={rucOAC}
                            onChange={(e) => setRucOAC(e.target.value)}
                            className="block w-full border border-gray-600 bg-gray-600 text-white rounded-md p-3 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="direccionOAC" className="block text-sm font-medium text-gray-300 mb-2">
                            Dirección de la OAC:
                        </label>
                        <input
                            id="direccionOAC"
                            type="text"
                            value={direccionOAC}
                            onChange={(e) => setDireccionOAC(e.target.value)}
                            className="block w-full border border-gray-600 bg-gray-600 text-white rounded-md p-3 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="barrioOAC" className="block text-sm font-medium text-gray-300 mb-2">
                            Barrio:
                        </label>
                        <input
                            id="barrioOAC"
                            type="text"
                            value={barrioOAC}
                            onChange={(e) => setBarrioOAC(e.target.value)}
                            className="block w-full border border-gray-600 bg-gray-600 text-white rounded-md p-3 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="telefonoOAC" className="block text-sm font-medium text-gray-300 mb-2">
                            Teléfono de Contacto:
                        </label>
                        <input
                            id="telefonoOAC"
                            type="text"
                            value={telefonoOAC}
                            onChange={(e) => setTelefonoOAC(e.target.value)}
                            className="block w-full border border-gray-600 bg-gray-600 text-white rounded-md p-3 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="correoOAC" className="block text-sm font-medium text-gray-300 mb-2">
                            Correo Electrónico de Contacto:
                        </label>
                        <input
                            id="correoOAC"
                            type="email"
                            value={correoOAC}
                            onChange={(e) => setCorreoOAC(e.target.value)}
                            className="block w-full border border-gray-600 bg-gray-600 text-white rounded-md p-3 focus:outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition duration-200"
                    >
                        Registrar OAC
                    </button>
                </form>
            )}
        </div>
    );
};

export default Page;
