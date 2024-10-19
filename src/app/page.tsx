"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Lista de departamentos y municipios simulados
const departamentos = {
    Cundinamarca: ['Girardot', 'Bogotá', 'Soacha'],
    Antioquia: ['Medellín', 'Envigado', 'Bello'],
    // Agrega más departamentos y municipios aquí
};

// Lista de organizaciones simuladas por municipio
const organizacionesSimuladas = {
    Girardot: [
        { nombre: 'Junta de Acción Comunal del Barrio de Rosa Blanca', id: 1 },
    ],
    Bogotá: [],
    Soacha: [],
    Medellín: [],
    Envigado: [],
    Bello: [],
    // Agrega más organizaciones por municipio
};

const FormularioOAC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        department: '',
        municipality: '',
    });

    const [organizaciones, setOrganizaciones] = useState([]);
    const [nuevaOAC, setNuevaOAC] = useState({ tipo: '', nombre: '', nit: '' });
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        if (e.target.name === 'municipality') {
            const resultado = organizacionesSimuladas[e.target.value] || [];
            setOrganizaciones(resultado);

            if (resultado.length === 0) {
                setMostrarFormulario(true); // Mostrar formulario si no hay organizaciones
            } else {
                setMostrarFormulario(false); // Ocultar formulario si hay organizaciones
            }
        }
    };

    const handleNuevaOACChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNuevaOAC({
            ...nuevaOAC,
            [e.target.name]: e.target.value,
        });
    };

    const handleNuevaOACSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Aquí puedes agregar la lógica para enviar los datos a Google Sheets o una API
        console.log("Nueva OAC registrada:", nuevaOAC);
        setNuevaOAC({ tipo: '', nombre: '', nit: '' }); // Limpiar el formulario
        alert('Nueva OAC registrada correctamente.');
    };

    const handleIngresar = (oacId: number) => {
        // Redirigir a la página de la OAC
        router.push(`/oac/${oacId}`);
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-lg mt-10">
            <h1 className="text-2xl mb-6 text-center">Organizaciones de Acción Comunal</h1>

            {/* Seleccionar Departamento */}
            <div className="mb-4">
                <label htmlFor="department" className="block text-sm mb-2">Departamento:</label>
                <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 rounded"
                >
                    <option value="">Selecciona un departamento</option>
                    {Object.keys(departamentos).map((department) => (
                        <option key={department} value={department}>
                            {department}
                        </option>
                    ))}
                </select>
            </div>

            {/* Seleccionar Municipio (solo si se seleccionó un departamento) */}
            {formData.department && departamentos[formData.department] && (
                <div className="mb-4">
                    <label htmlFor="municipality" className="block text-sm mb-2">Municipio:</label>
                    <select
                        id="municipality"
                        name="municipality"
                        value={formData.municipality}
                        onChange={handleChange}
                        className="w-full p-2 bg-gray-700 rounded"
                    >
                        <option value="">Selecciona un municipio</option>
                        {departamentos[formData.department].map((municipality) => (
                            <option key={municipality} value={municipality}>
                                {municipality}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Mostrar organizaciones registradas o formulario para nueva OAC */}
            {formData.municipality && (
                <div className="mt-4">
                    {organizaciones.length > 0 ? (
                        <div>
                            <h2 className="text-lg mb-2">Organizaciones Registradas en {formData.municipality}:</h2>
                            <ul className="mb-4">
                                {organizaciones.map((org) => (
                                    <li key={org.id} className="mb-2 flex justify-between">
                                        {org.nombre}
                                        <button
                                            onClick={() => handleIngresar(org.id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                        >
                                            Ingresar
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : mostrarFormulario ? (
                        <div>
                            <h2 className="text-lg mb-2">Registrar Nueva OAC en {formData.municipality}:</h2>
                            <form onSubmit={handleNuevaOACSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="tipo" className="block text-sm mb-2">Tipo de OAC:</label>
                                    <input
                                        type="text"
                                        id="tipo"
                                        name="tipo"
                                        value={nuevaOAC.tipo}
                                        onChange={handleNuevaOACChange}
                                        className="w-full p-2 bg-gray-700 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="nombre" className="block text-sm mb-2">Nombre de la OAC:</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={nuevaOAC.nombre}
                                        onChange={handleNuevaOACChange}
                                        className="w-full p-2 bg-gray-700 rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="nit" className="block text-sm mb-2">NIT de la OAC:</label>
                                    <input
                                        type="text"
                                        id="nit"
                                        name="nit"
                                        value={nuevaOAC.nit}
                                        onChange={handleNuevaOACChange}
                                        className="w-full p-2 bg-gray-700 rounded"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded w-full"
                                >
                                    Registrar OAC
                                </button>
                            </form>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default FormularioOAC;
