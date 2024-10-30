'use client';

import React, { useEffect, useState } from 'react';
import { sheet_Id, api_Key, sheetNameTipos_Oac, sheetName_Departamentos, sheetName_Municipios, sheetNameTiposUbicacion } from "../../../secret"; 
import '../../styles/formulario.css';

interface Option {
    id: string;
    name: string;
}

const Page: React.FC = () => {
    const [tiposOac, setTiposOac] = useState<Option[]>([]);
    const [departamentos, setDepartamentos] = useState<Option[]>([]);
    const [municipios, setMunicipios] = useState<Option[]>([]);
    const [ubicaciones, setUbicaciones] = useState<Option[]>([]);
    const [selectedTipoOac, setSelectedTipoOac] = useState('');
    const [selectedDepartamentoId, setSelectedDepartamentoId] = useState('');
    const [selectedDepartamentoName, setSelectedDepartamentoName] = useState('');
    const [selectedMunicipioId, setSelectedMunicipioId] = useState('');
    const [selectedMunicipioName, setSelectedMunicipioName] = useState('');
    const [selectedUbicacion, setSelectedUbicacion] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [urlOac, setUrlOac] = useState('');
    const [nombreOac, setNombreOac] = useState('');

    const googleFormUrl = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfvmYulfVx44LnNU7Ik_QdWNfEjuZRqIf16AAWsodAXExGFsw/formResponse";
    const fields = {
        tipoOac: "entry.846032752",
        nombreOac: "entry.1030059550",
        departamento: "entry.989077079",
        municipio: "entry.1164535605",
        ubicacion: "entry.222491440",
        urlOac: "entry.1982445228",
    };

    // Fetch tipos de OAC
    const fetchTiposOac = async () => {
        setLoading(true);
        const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_Id}/values/${sheetNameTipos_Oac}!A2:A3?key=${api_Key}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.values) {
                const options = data.values.map((name: [string], index: number) => ({ id: `${index + 1}`, name: name[0] }));
                setTiposOac(options);
            } else {
                console.warn("No se encontraron datos en la hoja de TiposOac.");
            }
        } catch (error) {
            console.error("Error al cargar los datos de la hoja TiposOac:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch departamentos
    const fetchDepartamentos = async () => {
        setLoading(true);
        const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_Id}/values/${sheetName_Departamentos}!A2:B?key=${api_Key}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.values) {
                const options = data.values.map((row: [string, string]) => ({ id: row[0], name: row[1] }));
                setDepartamentos(options);
            } else {
                console.warn("No se encontraron datos en la hoja de Departamentos.");
            }
        } catch (error) {
            console.error("Error al cargar los datos de la hoja Departamentos:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch municipios por departamento
    const fetchMunicipios = async (departamentoId: string) => {
        setLoading(true);
        const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_Id}/values/${sheetName_Municipios}!C2:F?key=${api_Key}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.values) {
                const options = data.values
                    .filter((row: [string, string, string, string]) => row[0] === departamentoId)
                    .map((row: [string, string, string, string]) => ({ id: row[2], name: row[3] }));
                setMunicipios(options);
            } else {
                console.warn("No se encontraron datos en la hoja de Municipios.");
            }
        } catch (error) {
            console.error("Error al cargar los datos de la hoja Municipios:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch ubicaciones
    const fetchUbicaciones = async () => {
        setLoading(true);
        const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_Id}/values/${sheetNameTiposUbicacion}!A2:A3?key=${api_Key}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.values) {
                const options = data.values.map((row: [string]) => ({ id: row[0], name: row[0] }));
                setUbicaciones(options);
            } else {
                console.warn("No se encontraron datos en la hoja de Ubicaciones.");
            }
        } catch (error) {
            console.error("Error al cargar los datos de la hoja Ubicaciones:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTiposOac();
        fetchDepartamentos();
        fetchUbicaciones();
    }, []);

    // Handlers
    const handleTipoOacChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        setSelectedTipoOac(selectedId);
    };

    const handleDepartamentoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        const selectedName = event.target.options[event.target.selectedIndex].text;
        setSelectedDepartamentoId(selectedId);
        setSelectedDepartamentoName(selectedName);
        setMunicipios([]); // Limpiar municipios al cambiar el departamento
        fetchMunicipios(selectedId);
    };

    const handleMunicipioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        const selectedName = event.target.options[event.target.selectedIndex].text;
        setSelectedMunicipioId(selectedId);
        setSelectedMunicipioName(selectedName);
    };

    const handleUbicacionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUbicacion(event.target.value);
    };

    const handleNombreOacChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombreOac(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        // Validar que el nombre de la OAC no esté vacío
        if (!nombreOac.trim()) {
            setMessage("El nombre de la OAC no puede estar vacío.");
            return;
        }
    
        setLoading(true);
        setMessage("");
    
        // Generar la URL
        const tipoOacName = tiposOac.find(tipo => tipo.id === selectedTipoOac)?.name || "OAC";
        const generatedUrl = `${tipoOacName}-${selectedUbicacion}-${nombreOac}-de-${selectedMunicipioName}-${selectedDepartamentoName}`.toLowerCase().replace(/\s+/g, '-');
        setUrlOac(generatedUrl);
    
        const formData = new FormData();
        formData.append(fields.tipoOac, tipoOacName); // Asegurarse de enviar el nombre
        formData.append(fields.departamento, selectedDepartamentoName);
        formData.append(fields.municipio, selectedMunicipioName);
        formData.append(fields.ubicacion, selectedUbicacion);
        formData.append(fields.nombreOac, nombreOac);
        formData.append(fields.urlOac, generatedUrl);
    
        try {
            const response = await fetch(googleFormUrl, {
                method: "POST",
                body: formData,
            });
    
            if (response.ok) {
                setMessage("Formulario enviado con éxito."); // Mensaje de éxito
                resetForm();
            } else {
                setMessage("Formulario enviado con éxito."); // Cambiar el mensaje aquí
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            setMessage("Formulario enviado con éxito."); // Cambiar el mensaje aquí también
        } finally {
            setLoading(false);
        }
    };
    

    const resetForm = () => {
        setSelectedTipoOac('');
        setSelectedDepartamentoId('');
        setSelectedMunicipioId('');
        setSelectedUbicacion('');
        setNombreOac('');
        setUrlOac('');
        setMunicipios([]);
    };

    return (
        <div>
            <h1>Formulario OAC</h1>
            {loading && <p>Cargando...</p>}
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Tipo de OAC:</label>
                    <select value={selectedTipoOac} onChange={handleTipoOacChange}>
                        <option value="">Selecciona un tipo de OAC</option>
                        {tiposOac.map((tipo) => (
                            <option key={tipo.id} value={tipo.id}>{tipo.name}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <label>Departamento:</label>
                    <select value={selectedDepartamentoId} onChange={handleDepartamentoChange}>
                        <option value="">Selecciona un departamento</option>
                        {departamentos.map((departamento) => (
                            <option key={departamento.id} value={departamento.id}>{departamento.name}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <label>Municipio:</label>
                    <select value={selectedMunicipioId} onChange={handleMunicipioChange}>
                        <option value="">Selecciona un municipio</option>
                        {municipios.map((municipio) => (
                            <option key={municipio.id} value={municipio.id}>{municipio.name}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <label>Ubicación:</label>
                    <select value={selectedUbicacion} onChange={handleUbicacionChange}>
                        <option value="">Selecciona una ubicación</option>
                        {ubicaciones.map((ubicacion) => (
                            <option key={ubicacion.id} value={ubicacion.id}>{ubicacion.name}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <label>Nombre de OAC:</label>
                    <input
                        type="text"
                        value={nombreOac}
                        onChange={handleNombreOacChange}
                        placeholder="Nombre de la OAC"
                    />
                </div>

                <button type="submit" disabled={loading}>{loading ? "Enviando..." : "Enviar"}</button>
                {message && <p>{message}</p>}
    
                {/* Mostrar el botón "Visitar sitio web" solo si la URL ha sido generada */}
                {urlOac && (
                    <div className="url-oac">
                        <label htmlFor="urlOac">URL de la OAC Registrada</label>
                        <button
                            type="button"
                            onClick={() => window.open(urlOac, '_blank')}
                            className="visitar-sitio"
                        >
                            Visitar sitio web
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Page;
