"use client"; // Marca este componente como Client Component

import React, { useState, useEffect } from 'react';
import '../../styles/formulario.css'; // Importa los estilos del formulario

const Registro = () => {
    const [departamentos, setDepartamentos] = useState<{ id: string, nombre: string }[]>([]);
    const [municipios, setMunicipios] = useState<{ id: string, nombre: string }[]>([]);
    const [tiposOac, setTiposOac] = useState<string[]>([]);
    const [tiposUbicacion, setTiposUbicacion] = useState<string[]>([]);

    const [selectedDepartamento, setSelectedDepartamento] = useState('');
    const [selectedMunicipio, setSelectedMunicipio] = useState('');
    const [selectedTipoOac, setSelectedTipoOac] = useState('');
    const [selectedTipoUbicacion, setSelectedTipoUbicacion] = useState('');
    const [nombreOac, setNombreOac] = useState('');

    // Constantes de configuración
    const sheetId = '1w_8hXKQVKbNMZz7jjx0K1VkqibzK3wm5M_pCIACEffo';
    const apiKey = 'AIzaSyDdbmm259ZMNXfmqwCptHtPwPcluVbb-WA';
    const sheetNameDepartamentos = 'Departamentos';
    const sheetNameMunicipios = 'Municipios';
    const sheetNameTiposOac = 'TipoOac';
    const sheetNameTiposUbicacion = 'TipoUbicacion';

    // Obtener departamentos
    useEffect(() => {
        const obtenerDepartamentos = async () => {
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetNameDepartamentos}!A2:B?key=${apiKey}`;
            
            try {
                const response = await fetch(url);
                const data = await response.json();
                
                const departamentosData = data.values.map((row: string[]) => ({
                    id: row[0], // ID del departamento
                    nombre: row[1] // Nombre del departamento
                }));

                setDepartamentos(departamentosData);
            } catch (error) {
                console.error("Error al obtener los departamentos:", error);
            }
        };

        obtenerDepartamentos();
    }, []);

    // Obtener municipios al seleccionar un departamento
    useEffect(() => {
        const obtenerMunicipios = async () => {
            if (selectedDepartamento) {
                const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetNameMunicipios}!A2:D?key=${apiKey}`;
                
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    
                    // Filtrar municipios por departamento
                    const municipiosData = data.values
                        .filter((row: string[]) => row[1] === selectedDepartamento) // Filtrar por departamento
                        .map((row: string[]) => ({
                            id: row[2], // ID del municipio
                            nombre: row[3] // Nombre del municipio
                        }));

                    setMunicipios(municipiosData);
                } catch (error) {
                    console.error("Error al obtener los municipios:", error);
                }
            }
        };

        obtenerMunicipios();
    }, [selectedDepartamento]);

    // Obtener tipos de OAC
    useEffect(() => {
        const obtenerTiposOac = async () => {
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetNameTiposOac}!A2:A?key=${apiKey}`;
            
            try {
                const response = await fetch(url);
                const data = await response.json();
                
                const tiposOacData = data.values.map((row: string[]) => row[0]); // Solo los nombres
                setTiposOac(tiposOacData);
            } catch (error) {
                console.error("Error al obtener los tipos de OAC:", error);
            }
        };

        obtenerTiposOac();
    }, []);

    // Obtener tipos de ubicación
    useEffect(() => {
        const obtenerTiposUbicacion = async () => {
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetNameTiposUbicacion}!A2:A?key=${apiKey}`;
            
            try {
                const response = await fetch(url);
                const data = await response.json();
                
                const tiposUbicacionData = data.values.map((row: string[]) => row[0]); // Solo los nombres
                setTiposUbicacion(tiposUbicacionData);
            } catch (error) {
                console.error("Error al obtener los tipos de ubicación:", error);
            }
        };

        obtenerTiposUbicacion();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const nombreCompletoOac = `${selectedTipoOac} de ${selectedTipoUbicacion} - ${nombreOac}`;
        const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://accion-comunal.vercel.app';
        const url = `${baseUrl}/${selectedDepartamento}/${selectedMunicipio}/${nombreCompletoOac.replace(/\s+/g, '-')}`; // Reemplazar espacios por guiones

        // Mostrar los datos en un cuadro de diálogo
        alert(`Datos Ingresados:\n\nDepartamento: ${selectedDepartamento}\nMunicipio: ${selectedMunicipio}\nTipo de OAC: ${selectedTipoOac}\nTipo de Ubicación: ${selectedTipoUbicacion}\nNombre: ${nombreOac}\n\nURL: ${url}`);
    };

    return (
        <div className="formulario-container">
            <h1>Registro de Juntas de Acción Comunal</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="departamento">Seleccione un Departamento:</label>
                    <select
                        id="departamento"
                        value={selectedDepartamento}
                        onChange={(e) => {
                            setSelectedDepartamento(e.target.value);
                            setMunicipios([]); // Limpiar municipios al cambiar de departamento
                            setSelectedMunicipio(''); // Limpiar selección de municipio
                        }}
                        required
                    >
                        <option value="">Seleccione un departamento</option>
                        {departamentos.map((departamento) => (
                            <option key={departamento.id} value={departamento.nombre}>
                                {departamento.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="municipio">Seleccione un Municipio:</label>
                    <select
                        id="municipio"
                        value={selectedMunicipio}
                        onChange={(e) => setSelectedMunicipio(e.target.value)}
                        required
                        disabled={municipios.length === 0} // Desactivar si no hay municipios
                    >
                        <option value="">Seleccione un municipio</option>
                        {municipios.map((municipio) => (
                            <option key={municipio.id} value={municipio.nombre}>
                                {municipio.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="tipoOac">Seleccione el Tipo de OAC:</label>
                    <select
                        id="tipoOac"
                        value={selectedTipoOac}
                        onChange={(e) => setSelectedTipoOac(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un tipo de OAC</option>
                        {tiposOac.map((tipo, index) => (
                            <option key={index} value={tipo}>
                                {tipo}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="tipoUbicacion">Seleccione el Tipo de Ubicación:</label>
                    <select
                        id="tipoUbicacion"
                        value={selectedTipoUbicacion}
                        onChange={(e) => setSelectedTipoUbicacion(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un tipo de ubicación</option>
                        {tiposUbicacion.map((tipo, index) => (
                            <option key={index} value={tipo}>
                                {tipo}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="nombreOac">Nombre de la OAC:</label>
                    <input
                        type="text"
                        id="nombreOac"
                        value={nombreOac}
                        onChange={(e) => setNombreOac(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Revisar</button>
            </form>
        </div>
    );
};

export default Registro;
