'use client';

import { useEffect, useState, ChangeEvent } from 'react';

interface TipoUbicacion {
    id: string;
    nombre: string;
}

interface Props {
    onTipoUbicacionChange: (tipoUbicacionId: string) => void; // Prop para manejar el cambio de tipo de ubicación
}

const TipoUbicacion: React.FC<Props> = ({ onTipoUbicacionChange }) => {
    const [tiposUbicacion, setTiposUbicacion] = useState<TipoUbicacion[]>([]);
    const [selectedTipoUbicacion, setSelectedTipoUbicacion] = useState('');

    const apiKey = process.env.GOOGLE_DRIVE_API_KEY; // Reemplaza con tu API Key
    const sheetId = process.env.SHEET_ID; // Reemplaza con el ID de tu hoja de Google Sheets

    // Obtener los tipos de ubicación
    useEffect(() => {
        const fetchTiposUbicacion = async () => {
            const sheetName = 'TiposUbicacion'; // Nombre de la hoja de Google Sheets

            try {
                const response = await fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A:B?key=${apiKey}`
                );

                if (response.ok) {
                    const data = await response.json();
                    const fetchedTiposUbicacion = data.values.slice(1).map((row: string[]) => ({
                        id: row[0],
                        nombre: row[1],
                    }));
                    setTiposUbicacion(fetchedTiposUbicacion);
                } else {
                    throw new Error('Error al obtener los tipos de ubicación');
                }
            } catch (error) {
                console.error('Error al obtener los datos de Google Sheets:', error);
            }
        };

        fetchTiposUbicacion();
    }, [apiKey, sheetId]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setSelectedTipoUbicacion(selectedId);
        onTipoUbicacionChange(selectedId); // Llama a la función pasada como prop
    };

    return (
        <div>
            <label htmlFor="tipoUbicacion" className="block text-gray-300">
                Tipo de Ubicación:
            </label>
            <select
                id="tipoUbicacion"
                name="tipoUbicacion"
                value={selectedTipoUbicacion}
                onChange={handleChange}
                className="w-full border border-gray-600 bg-gray-800 text-gray-300 p-2 rounded-lg"
            >
                <option value="">Selecciona un tipo de ubicación</option>
                {tiposUbicacion.map((t) => (
                    <option key={t.id} value={t.id}>
                        {t.nombre}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TipoUbicacion;
