'use client';

import React, { useEffect, useState } from 'react';
import { sheet_Id, api_Key, sheetNameTipos_Oac } from "../../secret";
import '../../styles/formulario.css';
import Federacion from '../components/formulario/Federacion';

import Federacion from '../components/formulario/Federacion';
import Asociacion from '../components/formulario//Asociacion';
import Jac from '../components/formulario//Jac';

interface Option {
    id: string;
    name: string;
}

const Formulario: React.FC = () => {
    const [tiposOac, setTiposOac] = useState<Option[]>([]);
    const [selectedTipoOac, setSelectedTipoOac] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const fetchTiposOac = async () => {
        setLoading(true);
        const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_Id}/values/${sheetNameTipos_Oac}!A2:A6?key=${api_Key}`;
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

    useEffect(() => {
        fetchTiposOac();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTipoOac(event.target.value);
    };

    // Función para renderizar el componente correspondiente según el tipoOac seleccionado
    const renderComponent = () => {
        switch (selectedTipoOac) {
            case 'Confederación Nacional de Acción Comunal':
                return <Confederacion />;
            case 'Federación':
                return <Federacion />;
            case 'Asociación':
                return <Asociacion />;
            case 'JAC':
                return <Jac />;
            default:
                return null;
        }
    };

    return (
        <div>
            <h2>¿Qué tipo de Organización Comunal deseas registrar?</h2>
            <label htmlFor="tipoOac">Selecciona un tipo de organización:</label>
            <select id="tipoOac" value={selectedTipoOac} onChange={handleChange} required>
                <option value="">Selecciona un tipo de organización</option>
                {tiposOac.map((tipo) => (
                    <option key={tipo.id} value={tipo.name}>{tipo.name}</option>
                ))}
            </select>
            {renderComponent()} {/* Renderiza el componente basado en la selección */}
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Formulario;
