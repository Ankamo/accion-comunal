'use client';

import React, { useEffect, useState } from 'react';
import { sheet_Id, api_Key, sheetNameTipos_Oac, sheetName_Departamentos } from "../../../secret";
import '../../styles/formulario.css';

interface Option {
    id: string;
    name: string;
}

const Page: React.FC = () => {
    const [tiposOac, setTiposOac] = useState<Option[]>([]);
    const [departamentos, setDepartamentos] = useState<Option[]>([]);
    const [selectedTipoOac, setSelectedTipoOac] = useState('');
    const [selectedDepartamento, setSelectedDepartamento] = useState('');
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
    };

    const fetchTiposOac = async () => {
        setLoading(true);
        const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_Id}/values/${sheetNameTipos_Oac}!A5?key=${api_Key}`;
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

    useEffect(() => {
        fetchTiposOac();
        fetchDepartamentos();
    }, []);

    const handleTipoOacChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        setSelectedTipoOac(selected);
        setNombreOac(selected ? `${selected} de ${selectedDepartamento}` : '');
    };

    const handleDepartamentoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        setSelectedDepartamento(selected);
        setNombreOac(selectedTipoOac ? `${selectedTipoOac} de ${selected}` : '');
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        setLoading(true);
        setMessage("");
    
        const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000/' : 'https://accion-comunal.vercel.app/';
        const generatedUrl = `${baseUrl}${selectedTipoOac.replace(/\s+/g, '-').toLowerCase()}-de-${selectedDepartamento.replace(/\s+/g, '-').toLowerCase()}`;
        setUrlOac(generatedUrl);
    
        const formData = new FormData();
        formData.append(fields.tipoOac, selectedTipoOac);
        formData.append(fields.departamento, selectedDepartamento);
        formData.append(fields.nombreOac, nombreOac);
        formData.append(fields.urlOac, generatedUrl);
    
        try {
            const response = await fetch(googleFormUrl, {
                method: "POST",
                body: formData,
            });
    
            if (response.ok) {
                setMessage("Formulario enviado con éxito.");
                setSelectedTipoOac('');
                setSelectedDepartamento('');
                setNombreOac('');
                setUrlOac('');
            } else {
                setMessage("Error al enviar el formulario. Intenta nuevamente.");
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            setMessage("Formulario enviado con éxito.");
        } finally {
            setLoading(false);
        }
    };
 
    return (
        <div>
            <h2>¿Qué tipo de Organización Comunal deseas registrar?</h2>
            <form onSubmit={handleSubmit} className="formulario">
                <label htmlFor="tipoOac">Selecciona un tipo de organización:</label>
                <select id="tipoOac" value={selectedTipoOac} onChange={handleTipoOacChange} required>
                    <option value="">Selecciona un tipo de organización</option>
                    {tiposOac.map((tipo) => (
                        <option key={tipo.id} value={tipo.name}>{tipo.name}</option>
                    ))}
                </select>

                <label htmlFor="departamento">Selecciona un departamento:</label>
                <select id="departamento" value={selectedDepartamento} onChange={handleDepartamentoChange} required>
                    <option value="">Selecciona un departamento</option>
                    {departamentos.map((departamento) => (
                        <option key={departamento.id} value={departamento.name}>{departamento.name}</option>
                    ))}
                </select>

                {selectedTipoOac && selectedDepartamento && (
                    <div className="nombre-oac">
                        <label htmlFor="nombreOac">Nombre de la Organización</label>
                        <input
                            type="text"
                            id="nombreOac"
                            value={nombreOac}
                            readOnly
                        />
                    </div>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? "Esperando..." : "Enviar"}
                </button>

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
