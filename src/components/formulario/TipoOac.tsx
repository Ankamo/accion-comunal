// TipoOac.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { sheet_Id, api_Key, sheetNameTipos_Oac } from "../../../secret";
import '../../styles/formulario.css';

interface Option {
    id: string;
    name: string;
}

export const useTipoOac = () => {
    const [tiposOac, setTiposOac] = useState<Option[]>([]);
    const [selectedTipoOac, setSelectedTipoOac] = useState('');
    const [nombreOac, setNombreOac] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [urlOac, setUrlOac] = useState(''); // Estado para la URL de la OAC

    const googleFormUrl = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSecxBWV0IyEWtQi6H9vm8ouGECY-TYiJkFLv4oapPvy9KJOsA/formResponse";
    const fields = {
        tipoOac: "entry.846032752",
        nombreOac: "entry.1030059550", // campo en Google Forms para nombre OAC
        urlOac: "entry.1982445228", // campo para la URL de la OAC
    };

    const fetchTiposOac = async () => {
        setLoading(true);
        const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_Id}/values/${sheetNameTipos_Oac}!A2:A6?key=${api_Key}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.values) {
                const options = data.values.map((name: [string], index: number) => ({ id: `${index + 1}`, name: name[0] }));
                console.log("Tipos de OAC obtenidos:", options);
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

        // Mostrar nombre automático si se selecciona "Confederación Nacional de Acción Comunal"
        if (selected === "Confederación Nacional de Acción Comunal") {
            setNombreOac("Confederación Nacional de Acción Comunal");
        } else {
            setNombreOac(''); // Limpia el campo si se selecciona otro tipo de OAC
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedTipoOac) {
            setMessage("Por favor, selecciona un tipo de organización comunal.");
            return;
        }

        setLoading(true);
        setMessage("");

        // Generar la URL de la OAC registrada
        const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000/' : 'https://accion-comunal.vercel.app/';
        const generatedUrl = `${baseUrl}${nombreOac.replace(/\s+/g, '-').toLowerCase()}`;
        setUrlOac(generatedUrl); // Guardar la URL generada en el estado

        // Enviar datos del tipo de OAC seleccionado y el nombre si está prellenado
        const formData = new FormData();
        formData.append(fields.tipoOac, selectedTipoOac);
        if (nombreOac) formData.append(fields.nombreOac, nombreOac);
        formData.append(fields.urlOac, generatedUrl); // Agregar la URL al FormData

        try {
            const response = await fetch(googleFormUrl, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setMessage("Formulario enviado exitosamente.");
                setSelectedTipoOac('');
                setNombreOac(''); // Limpiar el campo después de enviar
            } else {
                setMessage("Error al enviar el formulario. Intenta nuevamente.");
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            setMessage("Formulario enviado exitosamente.");
        } finally {
            setLoading(false);
        }
    };

    return {
        tiposOac,
        selectedTipoOac,
        nombreOac,
        loading,
        message,
        urlOac, // Añadir la URL generada
        handleChange,
        handleSubmit,
    };
};
