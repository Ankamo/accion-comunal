// components/registro/ubicacion/page.tsx

'use client'
import '../../../styles/registro/ubicacion.css'
import React, { useState } from "react";

const UbicacionPage: React.FC = () => {
    // Estado para los datos del formulario
    const [formData, setFormData] = useState({
        departamento: "",
        municipio: "",
        direccion: "",
        zona: "",
    });

    // Manejar cambios en los campos del formulario
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <section className="form-section">
            <h2 className="form-title">Información de la Junta</h2>
            <p className="form-description">Ubicación de la Junta</p>
            <div className="form-grid">
                <div>
                    <label className="form-label" htmlFor="departamento">
                        Departamento
                    </label>
                    <select
                        id="departamento"
                        name="departamento"
                        value={formData.departamento}
                        onChange={handleInputChange}
                        className="form-input"
                    >
                        <option value="">-- Seleccione --</option>
                        {/* Agregar departamentos */}
                        <option value="departamento1">Departamento 1</option>
                        <option value="departamento2">Departamento 2</option>
                    </select>
                </div>
                <div>
                    <label className="form-label" htmlFor="municipio">
                        Municipio
                    </label>
                    <select
                        id="municipio"
                        name="municipio"
                        value={formData.municipio}
                        onChange={handleInputChange}
                        className="form-input"
                    >
                        <option value="">-- Seleccione --</option>
                        {/* Agregar municipios */}
                        <option value="municipio1">Municipio 1</option>
                        <option value="municipio2">Municipio 2</option>
                    </select>
                </div>
                <div>
                    <label className="form-label" htmlFor="direccion">
                        Dirección
                    </label>
                    <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                    />
                </div>
                <div>
                    <label className="form-label" htmlFor="zona">
                        Zona
                    </label>
                    <select
                        id="zona"
                        name="zona"
                        value={formData.zona}
                        onChange={handleInputChange}
                        className="form-input"
                    >
                        <option value="">Seleccione Zona</option>
                        <option value="zona1">Zona 1</option>
                        <option value="zona2">Zona 2</option>
                    </select>
                </div>
            </div>
        </section>
    );
};

export default UbicacionPage;
