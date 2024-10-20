'use client';

import { useEffect, useState, ChangeEvent } from 'react';

interface Municipio {
    id: string;
    nombre: string;
    departamentoId: string; // Referencia al ID del departamento al que pertenece
}

interface Props {
    departamentoId: string; // El ID del departamento seleccionado
    onMunicipalityChange: (municipalityId: string) => void; // Prop para manejar el cambio de municipio
}

const Municipios: React.FC<Props> = ({ departamentoId, onMunicipalityChange }) => {
    const [municipios, setMunicipios] = useState<Municipio[]>([]);
    const [filteredMunicipios, setFilteredMunicipios] = useState<Municipio[]>([]);
    const [selectedMunicipio, setSelectedMunicipio] = useState('');

    const apiKey = process.env.GOOGLE_DRIVE_API_KEY; // Reemplaza con tu API Key
    const sheetId = process.env.SHEET_ID; // Reemplaza con el ID de tu hoja de Google Sheets

    // Obtener los municipios
    useEffect(() => {
        const fetchMunicipios = async () => {
            const sheetName = 'Municipios';

            try {
                const response = await fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A:C?key=${apiKey}`
                );

                if (response.ok) {
                    const data = await response.json();
                    const fetchedMunicipios = data.values.slice(1).map((row: string[]) => ({
                        id: row[0],
                        nombre: row[1],
                        departamentoId: row[2], // ID del departamento al que pertenece el municipio
                    }));
                    setMunicipios(fetchedMunicipios);
                } else {
                    throw new Error('Error al obtener los municipios');
                }
            } catch (error) {
                console.error('Error al obtener los datos de Google Sheets:', error);
            }
        };

        fetchMunicipios();
    }, [apiKey, sheetId]);

    // Filtrar municipios por departamento seleccionado
    useEffect(() => {
        if (departamentoId) {
            const filtered = municipios.filter(
                (municipio) => municipio.departamentoId === departamentoId
            );
            setFilteredMunicipios(filtered);
        } else {
            setFilteredMunicipios([]);
        }
    }, [departamentoId, municipios]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        setSelectedMunicipio(selectedId);
        onMunicipalityChange(selectedId); // Llama a la función pasada como prop
    };

    return (
        <div>
            <label htmlFor="municipality" className="block text-gray-300">
                Municipio:
            </label>
            <select
                id="municipality"
                name="municipality"
                value={selectedMunicipio}
                onChange={handleChange}
                className="w-full border border-gray-600 bg-gray-800 text-gray-300 p-2 rounded-lg"
                disabled={!departamentoId}
            >
                <option value="">Selecciona un municipio</option>
                {filteredMunicipios.map((m) => (
                    <option key={m.id} value={m.id}>
                        {m.nombre}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Municipios;
