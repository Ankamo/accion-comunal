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
    const sheetNameOacRegistrados = 'OacRegistrados'; // Nombre de la hoja donde se enviarán los datos

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

    // Función para enviar los datos a Google Sheets
    const enviarDatosAGoogleSheets = async () => {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetNameOacRegistrados}!A2:G:append?valueInputOption=USER_ENTERED&key=${apiKey}`;

    const data = {
        values: [
            [
                "", // IDRegistro (dejar vacío si se genera automáticamente)
                selectedDepartamento, // IdDepartamento
                selectedMunicipio, // IdMunicipio
                selectedTipoOac, // TipoOac
                selectedTipoUbicacion, // Tipo de Ubicación
                nombreOac, // NombreOac
                `${window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://accion-comunal.vercel.app'}/${selectedDepartamento.toLowerCase()}/${selectedMunicipio.toLowerCase()}/${selectedTipoOac.toLowerCase().replace(/\s+/g, '')}-${selectedTipoUbicacion.toLowerCase().replace(/\s+/g, '')}-${nombreOac.toLowerCase().replace(/\s+/g, '')}` // URL
            ]
        ]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response from Google Sheets:', errorData);
            throw new Error('Error al enviar los datos a Google Sheets');
        }

        alert('Datos enviados correctamente a Google Sheets.');
    } catch (error) {
        console.error("Error al enviar datos:", error);
        alert('Error al enviar los datos a Google Sheets. Verifica la consola para más detalles.');
    }
};

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Convertir a minúsculas y eliminar espacios
        const departamentoSlug = selectedDepartamento.toLowerCase();
        const municipioSlug = selectedMunicipio.toLowerCase();
        const tipoOacSlug = selectedTipoOac.toLowerCase().replace(/\s+/g, ''); // Eliminar espacios
        const tipoUbicacionSlug = selectedTipoUbicacion.toLowerCase().replace(/\s+/g, ''); // Eliminar espacios
        const nombreOacSlug = nombreOac.toLowerCase().replace(/\s+/g, ''); // Eliminar espacios
        
        const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://accion-comunal.vercel.app';
        const url = `${baseUrl}/${departamentoSlug}/${municipioSlug}/${tipoOacSlug}-${tipoUbicacionSlug}-${nombreOacSlug}`; // Formato de la URL deseada

        // Mostrar los datos en un cuadro de diálogo y enviar a Google Sheets
        alert(`Datos Ingresados:\n\nDepartamento: ${selectedDepartamento}\nMunicipio: ${selectedMunicipio}\nTipo de OAC: ${selectedTipoOac}\nTipo de Ubicación: ${selectedTipoUbicacion}\nNombre: ${nombreOac}\n\nURL: ${url}`);
        
        // Llamar a la función para enviar los datos a Google Sheets
        enviarDatosAGoogleSheets();
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
                        {departamentos.map((dep) => (
                            <option key={dep.id} value={dep.nombre}>{dep.nombre}</option>
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
                    >
                        <option value="">Seleccione un municipio</option>
                        {municipios.map((mun) => (
                            <option key={mun.id} value={mun.nombre}>{mun.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="tipoOac">Tipo de OAC:</label>
                    <select
                        id="tipoOac"
                        value={selectedTipoOac}
                        onChange={(e) => setSelectedTipoOac(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un tipo de OAC</option>
                        {tiposOac.map((tipo) => (
                            <option key={tipo} value={tipo}>{tipo}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="tipoUbicacion">Tipo de Ubicación:</label>
                    <select
                        id="tipoUbicacion"
                        value={selectedTipoUbicacion}
                        onChange={(e) => setSelectedTipoUbicacion(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un tipo de ubicación</option>
                        {tiposUbicacion.map((tipo) => (
                            <option key={tipo} value={tipo}>{tipo}</option>
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

                <button type="submit">Aceptar</button>
            </form>
        </div>
    );
};

export default Registro;
