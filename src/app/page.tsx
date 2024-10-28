'use client';

import React, { useEffect, useState } from 'react';
import { sheet_Id, api_Key, sheetName_Municipios, sheetName_Departamentos, sheetNameTipos_Oac, sheetNameTiposUbicacion } from "../../secret";
import '../styles/formulario.css';

interface Pais {
    id: string;
    name: string;
}

interface Departamento {
    id: string;
    name: string;
}

interface Municipio {
    id: string;
    name: string;
}

interface TipoOac {
    id: string;
    name: string;
}

interface TipoUbicacion {
    id: string;
    name: string;
}

const Formulario: React.FC = () => {
    const [paises, setPaises] = useState<Pais[]>([]);
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
    const [municipios, setMunicipios] = useState<Municipio[]>([]);
    const [tipoOacs, setTipoOacs] = useState<TipoOac[]>([]);
    const [tipoUbicaciones, setTipoUbicaciones] = useState<TipoUbicacion[]>([]);

    const [selectedPaisName, setSelectedPaisName] = useState<string>('');
    const [selectedDepartamentoName, setSelectedDepartamentoName] = useState<string>('');
    const [selectedMunicipioName, setSelectedMunicipioName] = useState<string>('');
    const [selectedTipoOacName, setSelectedTipoOacName] = useState<string>('');
    const [selectedTipoUbicacionName, setSelectedTipoUbicacionName] = useState<string>('');
    const [nombreOac, setNombreOac] = useState<string>('');

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const googleFormUrl = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSecxBWV0IyEWtQi6H9vm8ouGECY-TYiJkFLv4oapPvy9KJOsA/formResponse";
    const fieldPaisName = "entry.846032752"; // Cambia esto por el nombre correcto del campo para país
    const fieldDepartamentoName = "entry.123456789"; // Cambia esto por el nombre correcto del campo para departamento
    const fieldMunicipioName = "entry.987654321"; // Cambia esto por el nombre correcto del campo para municipio
    const fieldTipoOac = "entry.188398698"; // Cambia esto por el nombre correcto del campo para Tipo OAC
    const fieldTipoUbicacion = "entry.654321987"; // Cambia esto por el nombre correcto del campo para Tipo Ubicación
    const fieldNombreOac = "entry.123123123"; // Cambia esto por el nombre correcto del campo para Nombre OAC

    // Cargar países
    useEffect(() => {
        const fetchPaises = async () => {
            const range = `${sheetName_Municipios}!A2:B`;
            const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_Id}/values/${range}?key=${api_Key}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                if (data.values) {
                    const paisesUnicos = data.values.reduce((acc: Pais[], row: string[]) => {
                        const [id, name] = row;
                        if (!acc.some((pais) => pais.id === id)) {
                            acc.push({ id, name });
                        }
                        return acc;
                    }, []);
                    setPaises(paisesUnicos);
                }
            } catch (error) {
                console.error("Error al cargar los países:", error);
            }
        };

        fetchPaises();
    }, []);

    // Cargar departamentos
    useEffect(() => {
        const fetchDepartamentos = async () => {
            const range = `${sheetName_Departamentos}!A2:B`;
            const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_Id}/values/${range}?key=${api_Key}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                if (data.values) {
                    const departamentosUnicos = data.values.reduce((acc: Departamento[], row: string[]) => {
                        const [id, name] = row;
                        if (!acc.some((departamento) => departamento.id === id)) {
                            acc.push({ id, name });
                        }
                        return acc;
                    }, []);
                    setDepartamentos(departamentosUnicos);
                }
            } catch (error) {
                console.error("Error al cargar los departamentos:", error);
            }
        };

        fetchDepartamentos();
    }, []);

    // Cargar municipios cuando se selecciona un departamento
    useEffect(() => {
        if (!selectedDepartamentoName) return; // No cargar si no hay departamento seleccionado

        const fetchMunicipios = async () => {
            const range = `${sheetName_Municipios}!E2:F`;
            const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_Id}/values/${range}?key=${api_Key}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                if (data.values) {
                    const municipiosUnicos = data.values.reduce((acc: Municipio[], row: string[]) => {
                        const [id, name] = row;
                        if (!acc.some((municipio) => municipio.id === id)) {
                            acc.push({ id, name });
                        }
                        return acc;
                    }, []);
                    setMunicipios(municipiosUnicos);
                }
            } catch (error) {
                console.error("Error al cargar los municipios:", error);
            }
        };

        fetchMunicipios();
    }, [selectedDepartamentoName]); // Dependencia en el departamento seleccionado


    // Cargar tipos de OAC
    useEffect(() => {
        const fetchTipoOac = async () => {
            const range = `${sheetNameTipos_Oac}!A2:A6`;
            const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_Id}/values/${range}?key=${api_Key}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                if (data.values) {
                    const tipoOacsUnicos = data.values.map((row: string[]) => ({ id: row[0], name: row[0] }));
                    setTipoOacs(tipoOacsUnicos);
                }
            } catch (error) {
                console.error("Error al cargar los tipos de OAC:", error);
            }
        };

        fetchTipoOac();
    }, []);

    // Cargar tipos de ubicación
    useEffect(() => {
        const fetchTipoUbicacion = async () => {
            const range = `${sheetNameTiposUbicacion}!A2:A4`;
            const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_Id}/values/${range}?key=${api_Key}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                if (data.values) {
                    const tiposUbicacionUnicos = data.values.map((row: string[]) => ({ id: row[0], name: row[0] }));
                    setTipoUbicaciones(tiposUbicacionUnicos);
                }
            } catch (error) {
                console.error("Error al cargar los tipos de ubicación:", error);
            }
        };

        fetchTipoUbicacion();
    }, []);

    const handlePaisSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPaisName(event.target.value);
        setSelectedDepartamentoName(''); // Reiniciar el departamento al cambiar de país
        setSelectedMunicipioName(''); // Reiniciar el municipio al cambiar de país
    };

    const handleDepartamentoSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDepartamentoName(event.target.value);
    };

    const handleMunicipioSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMunicipioName(event.target.value);
    };

    const handleTipoOacSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTipoOacName(event.target.value);
    };

    const handleTipoUbicacionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTipoUbicacionName(event.target.value);
    };

    const handleNombreOacChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombreOac(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedPaisName || !selectedTipoOacName || !nombreOac) {
            setMessage("Por favor, completa todos los campos obligatorios.");
            return;
        }

        setLoading(true);
        setMessage("");

        const formData = new FormData();
        formData.append(fieldPaisName, selectedPaisName);

        // Solo se agrega el departamento si ha sido seleccionado
        if (selectedDepartamentoName) {
            formData.append(fieldDepartamentoName, selectedDepartamentoName);
        }

        // Solo se agrega el municipio si ha sido seleccionado
        if (selectedMunicipioName) {
            formData.append(fieldMunicipioName, selectedMunicipioName);
        }

        // Siempre se debe agregar el tipo OAC y el nombre OAC
        formData.append(fieldTipoOac, selectedTipoOacName);
        formData.append(fieldTipoUbicacion, selectedTipoUbicacionName);
        formData.append(fieldNombreOac, nombreOac);

        try {
            const response = await fetch(googleFormUrl, {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                setMessage("Formulario enviado exitosamente.");
                // Reiniciar el formulario después de enviar
                setSelectedPaisName('');
                setSelectedDepartamentoName('');
                setSelectedMunicipioName('');
                setSelectedTipoOacName('');
                setSelectedTipoUbicacionName('');
                setNombreOac('');
            } else {
                setMessage("Error al enviar el formulario. Intenta nuevamente.");
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            setMessage("Error al enviar el formulario. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2>Formulario de Registro OAC</h2>
            {message && <div className="message">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="pais">País:</label>
                    <select id="pais" value={selectedPaisName} onChange={handlePaisSelect}>
                        <option value="">Selecciona un país</option>
                        {paises.map((pais) => (
                            <option key={pais.id} value={pais.name}>{pais.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="departamento">Departamento:</label>
                    <select id="departamento" value={selectedDepartamentoName} onChange={handleDepartamentoSelect}>
                        <option value="">Selecciona un departamento</option>
                        {departamentos.map((departamento) => (
                            <option key={departamento.id} value={departamento.name}>{departamento.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="municipio">Municipio:</label>
                    <select id="municipio" value={selectedMunicipioName} onChange={handleMunicipioSelect}>
                        <option value="">Selecciona un municipio</option>
                        {municipios.map((municipio) => (
                            <option key={municipio.id} value={municipio.name}>{municipio.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="tipo-oac">Tipo OAC:</label>
                    <select id="tipo-oac" value={selectedTipoOacName} onChange={handleTipoOacSelect}>
                        <option value="">Selecciona un tipo OAC</option>
                        {tipoOacs.map((tipoOac) => (
                            <option key={tipoOac.id} value={tipoOac.name}>{tipoOac.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="tipo-ubicacion">Tipo Ubicación:</label>
                    <select id="tipo-ubicacion" value={selectedTipoUbicacionName} onChange={handleTipoUbicacionSelect}>
                        <option value="">Selecciona un tipo de ubicación</option>
                        {tipoUbicaciones.map((tipoUbicacion) => (
                            <option key={tipoUbicacion.id} value={tipoUbicacion.name}>{tipoUbicacion.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="nombre-oac">Nombre OAC:</label>
                    <input
                        type="text"
                        id="nombre-oac"
                        value={nombreOac}
                        onChange={handleNombreOacChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>{loading ? "Enviando..." : "Enviar"}</button>
            </form>
        </div>
    );
};

export default Formulario;
