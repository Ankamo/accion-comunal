'use client';

import { useEffect, useState, ChangeEvent } from 'react';

interface TipoOac {
    id: string;
    nombre: string;
}

interface Props {
    onTipoOacChange: (tipoOacId: string) => void; // Prop para manejar el cambio de tipo de OAC
}

const TipoOac: React.FC<Props> = ({ onTipoOacChange }) => {
    const [tiposOac, setTiposOac] = useState<TipoOac[]>([]);
    const [selectedTipoOac, setSelectedTipoOac] = useState('');

    const apiKey = process.env.GOOGLE_DRIVE_API_KEY; // Reemplaza con tu API Key
    const sheetId = process.env.SHEET_ID; // Reemplaza con el ID de tu hoja de Google Sheets

    // Obtener los tipos de OAC
    useEffect(() => {
        const fetchTiposOac = async () => {
            const sheetName = 'TiposOac';

            try {
                const response = await fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A:B?key=${apiKey}`
                );

                if (response.ok) {
                    const data = await response.json();
                    const fetchedTiposOac = data.values.slice(1).map((row: string[]) => ({
                        id: row[0],
                        nombre: row[1],
                    }));
                    setTiposOac(fetchedTiposOac);
                } else {
                    throw new Error('Error al obtener los tipos de OAC');
                }
            } catch (error) {
                console.error('Error al obtener los datos de Google Sheets:', error);
            }
        };

        fetchTiposOac();
    }, [apiKey, sheetId]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setSelectedTipoOac(selectedId);
        onTipoOacChange(selectedId); // Llama a la función pasada como prop
    };

    return (
        <div>
            <label htmlFor="tipoOac" className="block text-gray-300">
                Tipo de OAC:
            </label>
            <select
                id="tipoOac"
                name="tipoOac"
                value={selectedTipoOac}
                onChange={handleChange}
                className="w-full border border-gray-600 bg-gray-800 text-gray-300 p-2 rounded-lg"
            >
                <option value="">Selecciona un tipo de OAC</option>
                {tiposOac.map((t) => (
                    <option key={t.id} value={t.id}>
                        {t.nombre}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TipoOac;
