// components/registro/cuenta/page.tsx

'use client'
import '../../../styles/registro/cuenta.css'
import React, { useState } from "react";

const CuentaPage: React.FC = () => {
    // Estado para los datos del formulario
    const [formData, setFormData] = useState({
        nit: "",
        ruc: "",
        nombreCompletoJunta: "",
        representanteLegal: "",
        cedulaRepresentante: "",
    });

    // Manejar cambios en los campos del formulario
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <section className="form-section">
            <h2 className="form-title">Información de la Junta</h2>
            <p className="form-description">Registra la siguiente información:</p>
            <div className="form-grid">
                <div>
                    <label className="form-label" htmlFor="nit">
                        NIT Junta (Solo números, sin código de verificación)
                    </label>
                    <input
                        type="text"
                        id="nit"
                        name="nit"
                        value={formData.nit}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                    />
                </div>
                <div>
                    <label className="form-label" htmlFor="ruc">
                        RUC Junta (Registro - Mininterior)
                    </label>
                    <input
                        type="text"
                        id="ruc"
                        name="ruc"
                        value={formData.ruc}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                    />
                </div>
                <div>
                    <label className="form-label" htmlFor="nombreCompletoJunta">
                        Nombre Completo Junta de Acción Comunal
                    </label>
                    <input
                        type="text"
                        id="nombreCompletoJunta"
                        name="nombreCompletoJunta"
                        value={formData.nombreCompletoJunta}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                    />
                </div>
                <br />
                <div>
                    <label className="form-label" htmlFor="representanteLegal">
                        Representante Legal (Nombre Completo)
                    </label>
                    <input
                        type="text"
                        id="representanteLegal"
                        name="representanteLegal"
                        value={formData.representanteLegal}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                    />
                </div>
                <div>
                    <label className="form-label" htmlFor="cedulaRepresentante">
                        Cédula de Ciudadanía
                    </label>
                    <input
                        type="text"
                        id="cedulaRepresentante"
                        name="cedulaRepresentante"
                        value={formData.cedulaRepresentante}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                    />
                </div>
            </div>
        </section>
    );
};

export default CuentaPage;
