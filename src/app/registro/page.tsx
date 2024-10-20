"use client"; // Marca este componente como Client Component

import React, { useState, useEffect } from 'react';
import '../../styles/formulario.css'; // Importa los estilos del formulario

const Registro = () => {
    const [departamentos, setDepartamentos] = useState<{ id: string, nombre: string }[]>([]);
    const [selectedDepartamento, setSelectedDepartamento] = useState('');

    useEffect(() => {
        const obtenerDepartamentos = async () => {
            const sheetId = '1w_8hXKQVKbNMZz7jjx0K1VkqibzK3wm5M_pCIACEffo';
            const apiKey = 'AIzaSyDdbmm259ZMNXfmqwCptHtPwPcluVbb-WA';
            const sheetName = 'Departamentos';

            // Verificar si las variables de entorno están cargadas correctamente
            console.log("Sheet ID:", sheetId);
            console.log("API Key:", apiKey);
            console.log("Sheet Name:", sheetName);

            const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A2:B?key=${apiKey}`;
            
            try {
                const response = await fetch(url);
                const data = await response.json();
                
                // Procesa los datos obtenidos de la API y actualiza el estado
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Departamento seleccionado:', selectedDepartamento);
        // Aquí puedes agregar la lógica para enviar el formulario
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
                        onChange={(e) => setSelectedDepartamento(e.target.value)}
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
                    <label htmlFor="nombre">Nombre de la Junta:</label>
                    <input type="text" id="nombre" required />
                </div>
                <div className="form-group">
                    <label htmlFor="direccion">Dirección:</label>
                    <input type="text" id="direccion" required />
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default Registro;
