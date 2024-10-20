'use client';

import React, { useState, useEffect } from 'react';
import Departamentos from '../components/RegistroOac/Departamentos';
import Municipios from '../components/RegistroOac/Municipios';
import TipoOac from '../components/RegistroOac/TipoOac';
import TipoUbicacion from '../components/RegistroOac/TipoUbicacion';

const Page: React.FC = () => {
    // Estados para manejar las selecciones
    const [selectedDepartamento, setSelectedDepartamento] = useState<string | null>(null);
    const [selectedMunicipio, setSelectedMunicipio] = useState<string | null>(null);
    const [selectedTipoOac, setSelectedTipoOac] = useState<string | null>(null);
    const [selectedTipoUbicacion, setSelectedTipoUbicacion] = useState<string | null>(null);

    // Efecto para reiniciar el municipio cuando cambie el departamento
    useEffect(() => {
        if (selectedDepartamento === null) {
            setSelectedMunicipio(null); // Reinicia municipio cuando el departamento se reinicia
        }
    }, [selectedDepartamento]);

    // Funciones para manejar los cambios en los selectores
    const handleDepartamentoChange = (departamento: string) => {
        setSelectedDepartamento(departamento);
    };

    const handleMunicipioChange = (municipio: string) => {
        setSelectedMunicipio(municipio);
    };

    const handleTipoOacChange = (tipoOac: string) => {
        setSelectedTipoOac(tipoOac);
    };

    const handleTipoUbicacionChange = (tipoUbicacion: string) => {
        setSelectedTipoUbicacion(tipoUbicacion);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí puedes añadir la lógica para procesar el envío del formulario
        console.log({
            departamento: selectedDepartamento,
            municipio: selectedMunicipio,
            tipoOac: selectedTipoOac,
            tipoUbicacion: selectedTipoUbicacion,
        });
    };

    return (
        <div className="container">
            <h1>Formulario de Registro de OAC</h1>
            <form onSubmit={handleSubmit}>
                {/* Selector de Departamentos */}
                <div className="form-group">
                    <label htmlFor="departamento">Departamento:</label>
                    <Departamentos
                        selectedDepartamento={selectedDepartamento}
                        onChange={handleDepartamentoChange}
                    />
                </div>

                {/* Selector de Municipios (filtrado por el departamento seleccionado) */}
                {selectedDepartamento && (
                    <div className="form-group">
                        <label htmlFor="municipio">Municipio:</label>
                        <Municipios
                            departamento={selectedDepartamento}
                            selectedMunicipio={selectedMunicipio}
                            onChange={handleMunicipioChange}
                        />
                    </div>
                )}

                {/* Selector de Tipo de OAC */}
                <div className="form-group">
                    <label htmlFor="tipoOac">Tipo de Organización Comunal (OAC):</label>
                    <TipoOac
                        selectedTipoOac={selectedTipoOac}
                        onChange={handleTipoOacChange}
                    />
                </div>

                {/* Selector de Tipo de Ubicación */}
                <div className="form-group">
                    <label htmlFor="tipoUbicacion">Tipo de Ubicación:</label>
                    <TipoUbicacion
                        selectedTipoUbicacion={selectedTipoUbicacion}
                        onChange={handleTipoUbicacionChange}
                    />
                </div>

                {/* Botón de envío */}
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Registrar OAC
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Page;
