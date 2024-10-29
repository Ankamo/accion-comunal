'use client';

import React, { useEffect, useState } from 'react';
import { sheet_Id, api_Key, sheetNameTipos_Oac } from "../../../secret";
import '../../styles/formulario.css';

interface Option {
    id: string;
    name: string;
}

const Page: React.FC = () => {
    const [tiposOac, setTiposOac] = useState<Option[]>([]);
    const [selectedTipoOac, setSelectedTipoOac] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [urlOac, setUrlOac] = useState('');

    const googleFormUrl = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSecxBWV0IyEWtQi6H9vm8ouGECY-TYiJkFLv4oapPvy9KJOsA/formResponse";
    const fields = {
        tipoOac: "entry.846032752",
        nombreOac: "entry.1030059550",
        urlOac: "entry.1982445228",
    };

    const fetchTiposOac = async () => {
        setLoading(true);
        const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_Id}/values/${sheetNameTipos_Oac}!A6?key=${api_Key}`;
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
        const selected = event.target.value;
        setSelectedTipoOac(selected);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (selectedTipoOac === 'Confederación Nacional de Acción Comunal') {
            setLoading(true);
            setMessage("");

            const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000/' : 'https://accion-comunal.vercel.app/';
            const generatedUrl = `${baseUrl}${selectedTipoOac.replace(/\s+/g, '-').toLowerCase()}`;
            setUrlOac(generatedUrl);

            const formData = new FormData();
            formData.append(fields.tipoOac, selectedTipoOac);
            formData.append(fields.nombreOac, selectedTipoOac); // Sin el nombre de departamento
            formData.append(fields.urlOac, generatedUrl);

            try {
                const response = await fetch(googleFormUrl, {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    setMessage("Formulario enviado exitosamente.");
                    setSelectedTipoOac('');
                } else {
                    setMessage("Error al enviar el formulario. Intenta nuevamente.");
                }
            } catch (error) {
                console.error("Error al enviar el formulario:", error);
                setMessage("Formulario enviado exitosamente.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <h2>¿Qué tipo de Organización Comunal deseas registrar?</h2>
            <form onSubmit={handleSubmit} className="formulario">
                <label htmlFor="tipoOac">Selecciona un tipo de organización:</label>
                <select id="tipoOac" value={selectedTipoOac} onChange={handleChange} required>
                    <option value="">Selecciona un tipo de organización</option>
                    {tiposOac.map((tipo) => (
                        <option key={tipo.id} value={tipo.name}>{tipo.name}</option>
                    ))}
                </select>

                {/* Mostrar el campo de nombre solo si se selecciona un tipo */}
                {selectedTipoOac && (
                    <div className="nombre-oac">
                        <label htmlFor="nombreOac">Nombre de la Organización</label>
                        <input
                            type="text"
                            id="nombreOac"
                            value={selectedTipoOac} // Usar el nombre del tipo seleccionado
                            readOnly
                        />
                    </div>
                )}

                {/* Mostrar botón de "Enviar" solo si se selecciona "Confederación Nacional de Acción Comunal" */}
                {selectedTipoOac === 'Confederación Nacional de Acción Comunal' && (
                    <button type="submit" disabled={loading}>
                        {loading ? "Esperando..." : "Enviar"}
                    </button>
                )}

                {message && <p className="message">{message}</p>}

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
