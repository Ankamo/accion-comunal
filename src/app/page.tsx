'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
    department: string;
    municipality: string;
    tipoOac: string;
    tipoUbicacion: string;
    nombreBarrio: string; // Campo para el nombre del barrio o vereda
}

interface Departamento {
    id: string;
    nombre: string;
}

interface Municipio {
    id: string;
    nombre: string;
}

interface Tipo {
    nombre: string;
}

export default function Home() {
    const [formData, setFormData] = useState<FormData>({
        department: '',
        municipality: '',
        tipoOac: '',
        tipoUbicacion: '',
        nombreBarrio: '', // Inicialización del campo para el nombre del barrio
    });

    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
    const [municipios, setMunicipios] = useState<Municipio[]>([]);
    const [tiposOac, setTiposOac] = useState<Tipo[]>([]);
    const [tiposUbicacion, setTiposUbicacion] = useState<Tipo[]>([]);

    const [showTable, setShowTable] = useState(false); // Nuevo estado para mostrar la tabla

    const apiKey = 'AIzaSyDdbmm259ZMNXfmqwCptHtPwPcluVbb-WA'; // Reemplaza con tu API Key
    const sheetId = '1w_8hXKQVKbNMZz7jjx0K1VkqibzK3wm5M_pCIACEffo'; // Reemplaza con el ID de tu hoja de Google Sheets

    // Obtener los departamentos
    useEffect(() => {
        const fetchDepartamentos = async () => {
            const sheetName = 'Departamentos';

            try {
                const response = await fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A:B?key=${apiKey}`
                );

                if (response.ok) {
                    const data = await response.json();
                    const fetchedDepartamentos = data.values.slice(1).map((row: string[]) => ({
                        id: row[0],
                        nombre: row[1],
                    }));
                    setDepartamentos(fetchedDepartamentos);
                } else {
                    throw new Error('Error al obtener los departamentos');
                }
            } catch (error) {
                console.error('Error al obtener los datos de Google Sheets:', error);
            }
        };

        fetchDepartamentos();
    }, [apiKey, sheetId]);

    // Obtener los municipios basados en el departamento seleccionado
    useEffect(() => {
        const fetchMunicipios = async () => {
            if (!formData.department) return; // Evitar la llamada si no hay departamento seleccionado

            const sheetName = 'Municipios';

            try {
                const response = await fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A:D?key=${apiKey}`
                );

                if (response.ok) {
                    const data = await response.json();
                    const fetchedMunicipios = data.values.slice(1)
                        .filter((row: string[]) => row[0] === formData.department)
                        .map((row: string[]) => ({
                            id: row[2],
                            nombre: row[3],
                        }));
                    setMunicipios(fetchedMunicipios);
                } else {
                    throw new Error('Error al obtener los municipios');
                }
            } catch (error) {
                console.error('Error al obtener los datos de Google Sheets:', error);
            }
        };

        fetchMunicipios();
    }, [formData.department, apiKey, sheetId]);

    // Obtener los tipos de OAC
    useEffect(() => {
        const fetchTiposOac = async () => {
            const sheetName = 'TipoOac';

            try {
                const response = await fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A:A?key=${apiKey}`
                );

                if (response.ok) {
                    const data = await response.json();
                    const fetchedTiposOac = data.values.slice(1).map((row: string[]) => ({
                        nombre: row[0],
                    }));
                    setTiposOac(fetchedTiposOac);
                } else {
                    throw new Error('Error al obtener los tipos de OAC');
                }
            } catch (error) {
                console.error('Error al obtener los datos de Google Sheets:', error);
            }
        };

        fetchTiposOac();
    }, [apiKey, sheetId]);

    // Obtener los tipos de ubicación
    useEffect(() => {
        const fetchTiposUbicacion = async () => {
            const sheetName = 'TipoUbicacion';

            try {
                const response = await fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A:A?key=${apiKey}`
                );

                if (response.ok) {
                    const data = await response.json();
                    const fetchedTiposUbicacion = data.values.slice(1).map((row: string[]) => ({
                        nombre: row[0],
                    }));
                    setTiposUbicacion(fetchedTiposUbicacion);
                } else {
                    throw new Error('Error al obtener los tipos de ubicación');
                }
            } catch (error) {
                console.error('Error al obtener los datos de Google Sheets:', error);
            }
        };

        fetchTiposUbicacion();
    }, [apiKey, sheetId]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar que se seleccionaron los datos necesarios
        if (!formData.department || !formData.municipality || !formData.tipoOac || !formData.tipoUbicacion) {
            alert('Por favor completa todos los campos.');
            return;
        }

        try {
            setShowTable(true); // Mostrar la tabla con los datos enviados
        } catch (error) {
            console.error('Error al procesar los datos:', error);
            alert('Hubo un error al procesar los datos.');
        }
    };

    return (
        <main className="min-h-screen bg-gray-800 flex items-center justify-center">
            <div className="bg-gray-900 shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-white text-center mb-6">
                    Formulario de Selección
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Campo Departamento */}
                    <div>
                        <label htmlFor="department" className="block text-gray-300">
                            Departamento:
                        </label>
                        <select
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="w-full border border-gray-600 bg-gray-800 text-gray-300 p-2 rounded-lg"
                        >
                            <option value="">Selecciona un departamento</option>
                            {departamentos.map((d) => (
                                <option key={d.id} value={d.id}>
                                    {d.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Campo Municipio */}
                    <div>
                        <label htmlFor="municipality" className="block text-gray-300">
                            Municipio:
                        </label>
                        <select
                            id="municipality"
                            name="municipality"
                            value={formData.municipality}
                            onChange={handleChange}
                            className="w-full border border-gray-600 bg-gray-800 text-gray-300 p-2 rounded-lg"
                        >
                            <option value="">Selecciona un municipio</option>
                            {municipios.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Campo Tipo de OAC */}
                    <div>
                        <label htmlFor="tipoOac" className="block text-gray-300">
                            Tipo de OAC:
                        </label>
                        <select
                            id="tipoOac"
                            name="tipoOac"
                            value={formData.tipoOac}
                            onChange={handleChange}
                            className="w-full border border-gray-600 bg-gray-800 text-gray-300 p-2 rounded-lg"
                        >
                            <option value="">Selecciona un tipo de OAC</option>
                            {tiposOac.map((t, index) => (
                                <option key={index} value={t.nombre}>
                                    {t.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Campo Tipo de Ubicación */}
                    <div>
                        <label htmlFor="tipoUbicacion" className="block text-gray-300">
                            Tipo de Ubicación:
                        </label>
                        <select
                            id="tipoUbicacion"
                            name="tipoUbicacion"
                            value={formData.tipoUbicacion}
                            onChange={handleChange}
                            className="w-full border border-gray-600 bg-gray-800 text-gray-300 p-2 rounded-lg"
                        >
                            <option value="">Selecciona un tipo de ubicación</option>
                            {tiposUbicacion.map((t, index) => (
                                <option key={index} value={t.nombre}>
                                    {t.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Campo Nombre del Barrio */}
                    <div>
                        <label htmlFor="nombreBarrio" className="block text-gray-300">
                            Nombre del Barrio o Vereda:
                        </label>
                        <input
                            id="nombreBarrio"
                            name="nombreBarrio"
                            value={formData.nombreBarrio}
                            onChange={handleChange}
                            className="w-full border border-gray-600 bg-gray-800 text-gray-300 p-2 rounded-lg"
                            placeholder="Nombre del barrio o vereda"
                        />
                    </div>

                    {/* Botón de envío */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg"
                    >
                        Revisar
                    </button>
                </form>

                {/* Mostrar la tabla si showTable es true */}
                {showTable && (
                    <div className="mt-8 bg-gray-800 p-4 rounded-lg">
                        <h2 className="text-2xl text-white font-bold mb-4">Datos Diligenciados:</h2>
                        <table className="w-full text-left text-gray-300">
                            <tbody>
                                <tr>
                                    <th className="pr-4">Departamento:</th>
                                    <td>{departamentos.find(d => d.id === formData.department)?.nombre || ''}</td>
                                </tr>
                                <tr>
                                    <th className="pr-4">Municipio:</th>
                                    <td>{municipios.find(m => m.id === formData.municipality)?.nombre || ''}</td>
                                </tr>
                                <tr>
                                    <th className="pr-4">Tipo de OAC:</th>
                                    <td>{formData.tipoOac}</td>
                                </tr>
                                <tr>
                                    <th className="pr-4">Tipo de Ubicación:</th>
                                    <td>{formData.tipoUbicacion}</td>
                                </tr>
                                <tr>
                                    <th className="pr-4">Nombre del Barrio:</th>
                                    <td>{formData.nombreBarrio}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </main>
    );
}
