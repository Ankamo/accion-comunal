// page.tsx
'use client';

import React from 'react';
import { useTipoOac } from '../../components/formulario/TipoOac';

const Page: React.FC = () => {
    const {
        tiposOac,
        selectedTipoOac,
        nombreOac,
        loading,
        message,
        urlOac, // Obtener la URL generada
        handleChange,
        handleSubmit,
    } = useTipoOac();

    return (
        <div>
            <form onSubmit={handleSubmit} className="formulario">
                <label htmlFor="tipoOac">¿Qué tipo de Organización Comunal deseas registrar?</label>
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
                        <input type="text" id="nombreOac" value={nombreOac} readOnly />
                    </div>
                )}

                <button type="submit" disabled={loading}>{loading ? "Esperando..." : "Siguiente"}</button>
                {message && <p className="message">{message}</p>}

                {/* Mostrar el botón solo si la URL ha sido generada */}
                {urlOac && (
                    <div className="url-oac">
                        <label htmlFor="urlOac">URL de la OAC Registrada</label>
                        <button
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
