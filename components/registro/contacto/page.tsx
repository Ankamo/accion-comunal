// components/registro/contacto/page.tsx

'use client'
import '../../../styles/registro/contacto.css'
import React, { useState } from "react";

const ContactoPage: React.FC = () => {
    // Estado para los datos del formulario
    const [formData, setFormData] = useState({
        telefono: "",
        correoElectronico: "",
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
            <p className="form-description">Información de contacto</p>
            <div className="form-grid">
                <div>
                    <label className="form-label" htmlFor="telefono">
                        Teléfono
                    </label>
                    <input
                        type="text"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                    />
                </div>
                <div>
                    <label className="form-label" htmlFor="correoElectronico">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="correoElectronico"
                        name="correoElectronico"
                        value={formData.correoElectronico}
                        onChange={handleInputChange}
                        className="form-input"
                        required
                    />
                </div>
            </div>
        </section>
    );
};

export default ContactoPage;
