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
        urlOac: "entry.1982445228",
        municipio: "entry.1164535605",
        ubicacion: "entry.222491440",
    };

    // Fetch tipos de OAC
    const fetchTiposOac = async () => {
        setLoading(true);
        const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_Id}/values/${sheetNameTipos_Oac}!A2?key=${api_Key}`;
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
        const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000/' : 'https://accion-comunal.vercel.app/';
        
        // URL generada con el orden adecuado
        const generatedUrl = `${baseUrl}${tipoOacName.replace(/\s+/g, '-').toLowerCase()}-del-barrio-${nombreOac.replace(/\s+/g, '-').toLowerCase()}-de-${selectedMunicipioName.replace(/\s+/g, '-').toLowerCase()}-${selectedDepartamentoName.replace(/\s+/g, '-').toLowerCase()}`.toLowerCase();
    
        setUrlOac(generatedUrl); // Asignación correcta de la URL generada
    
        const formData = new FormData();
    
        // Agregar solo los campos seleccionados al formulario
        if (selectedTipoOac) formData.append(fields.tipoOac, tipoOacName);
        if (selectedDepartamentoName) formData.append(fields.departamento, selectedDepartamentoName);
        if (selectedMunicipioName) formData.append(fields.municipio, selectedMunicipioName);
        if (selectedUbicacion) formData.append(fields.ubicacion, selectedUbicacion);
        formData.append(fields.nombreOac, nombreOac);
        formData.append(fields.urlOac, generatedUrl); // Solo el slug, no la URL completa
    
        try {
            const response = await fetch(googleFormUrl, {
                method: "POST",
                body: formData,
            });
    
            if (response.ok) {
                setMessage("Formulario enviado con éxito.");
                resetForm();
            } else {
                setMessage("Error al enviar el formulario.");
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            setMessage("Formulario enviado con éxito..");
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
        setMunicipios([]);
        setUrlOac('');
    };

    return (
        <div>
            <h2>¿Qué tipo de Organización Comunal deseas registrar?</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="tipoOac">Tipo de OAC:</label>
                <select id="tipoOac" value={selectedTipoOac} onChange={handleTipoOacChange}>
                    <option value="">Seleccione un tipo de OAC</option>
                    {tiposOac.map(tipo => (
                        <option key={tipo.id} value={tipo.id}>{tipo.name}</option>
                    ))}
                </select>

                <label htmlFor="departamento">Departamento:</label>
                <select id="departamento" value={selectedDepartamentoId} onChange={handleDepartamentoChange}>
                    <option value="">Seleccione un departamento</option>
                    {departamentos.map(departamento => (
                        <option key={departamento.id} value={departamento.id}>{departamento.name}</option>
                    ))}
                </select>

                <label htmlFor="municipio">Municipio:</label>
                <select id="municipio" value={selectedMunicipioId} onChange={handleMunicipioChange} disabled={!selectedDepartamentoId}>
                    <option value="">Seleccione un municipio</option>
                    {municipios.map(municipio => (
                        <option key={municipio.id} value={municipio.id}>{municipio.name}</option>
                    ))}
                </select>

                <label htmlFor="ubicacion">Ubicación:</label>
                <select id="ubicacion" value={selectedUbicacion} onChange={handleUbicacionChange}>
                    <option value="">Seleccione una ubicación</option>
                    {ubicaciones.map(ubicacion => (
                        <option key={ubicacion.id} value={ubicacion.id}>{ubicacion.name}</option>
                    ))}
                </select>

                <label htmlFor="nombreOac">Nombre de OAC:</label>
                <input type="text" id="nombreOac" value={nombreOac} onChange={handleNombreOacChange} />

                <button type="submit" disabled={loading}>Enviar</button>
                {loading && <p>Cargando...</p>}
            {message && <p>{message}</p>}
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
