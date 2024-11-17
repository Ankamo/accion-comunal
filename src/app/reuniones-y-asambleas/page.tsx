// src/pages/ReunionesYAsambleas.tsx
'use client'
import React, { useState } from "react";
import "../../styles/reuniones-y-asambleas.css";

interface AsambleaProps {
    convocatoria: string;
    tipo: string; // Ejemplo: Asamblea General, Reunión Mesa Directiva
    modalidad: string; // Ordinaria o Extraordinaria
    categoria: string; // #asambleageneral, #reunionmesadirectiva, etc.
    fecha: string;
    hora: string;
    lugar?: string;
    linkIngreso?: string;
    documentoUrl: string;
}

const asambleasData: AsambleaProps[] = [
    {
        convocatoria: "AGA-017",
        tipo: "Asamblea General",
        modalidad: "Ordinaria",
        categoria: "#asambleageneral",
        fecha: "24 de noviembre del 2024",
        hora: "4:30 PM",
        linkIngreso: "https://meet.google.com/hst-hrnd-bcc",
        documentoUrl: "https://drive.google.com/file/d/1BTrY0ixHb8Rd_QOpco1piFXSaPOR_vIH/view?usp=drive_link",
    },
    {
        convocatoria: "RDE-018",
        tipo: "Reunión de Mesa Directiva y Dignatarios",
        modalidad: "Ordinaria",
        categoria: "#reuniondeequipo",
        fecha: "17 de noviembre del 2024",
        hora: "5:00 pm",
        linkIngreso: "https://meet.google.com/nsa-itpu-xob",
        documentoUrl: "Por Definir",
    },
    {
        convocatoria: "RCC-004",
        tipo: "Reunión de Comision de Convivencia y Conciliacion",
        modalidad: "Ordinaria",
        categoria: "#reuniondecomisiondeconvivencia",
        fecha: "23 de noviembre del 2024",
        hora: "5:00 pm",
        linkIngreso: "https://meet.google.com/whp-mgvc-qek",
        documentoUrl: "Por Definir",
    },
    // Agrega más reuniones según sea necesario
];

const ReunionesYAsambleas: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const filteredAsambleas = selectedCategory
        ? asambleasData.filter((asamblea) => asamblea.categoria === selectedCategory)
        : asambleasData;

    return (
        <div className="asambleas-container">
            <h1>Convocatorias a Reuniones y Asambleas</h1>
            <p>Consulta los detalles de las próximas reuniones y asambleas por categoría.</p>

            {/* Navegación por categorías */}
            <nav className="asambleas-nav">
                <button onClick={() => handleCategoryChange("")}>Todas</button>
                <button onClick={() => handleCategoryChange("#asambleageneral")}>Asamblea General</button>
                <button onClick={() => handleCategoryChange("#reuniondirectivos")}>Mesa Directiva</button>
                <button onClick={() => handleCategoryChange("#reuniondeequipo")}>Reunion de Equipo</button>
                <button onClick={() => handleCategoryChange("#reuniondecomisiondeconvivencia")}>
                    Comisión de Convivencia
                </button>
            </nav>

            <div className="asambleas-list">
                {filteredAsambleas.map((asamblea, index) => (
                    <div key={index} className="asamblea-card">
                        <h2>{asamblea.tipo}: {asamblea.convocatoria}</h2>
                        <p><strong>Modalidad:</strong> {asamblea.modalidad}</p>
                        <p><strong>Categoría:</strong> {asamblea.categoria}</p>
                        <p><strong>Fecha:</strong> {asamblea.fecha}</p>
                        <p><strong>Hora:</strong> {asamblea.hora}</p>
                        {asamblea.lugar && <p><strong>Lugar:</strong> {asamblea.lugar}</p>}
                        {asamblea.linkIngreso && (
                            <p>
                                <strong>Link de Ingreso:</strong>{" "}
                                <a href={asamblea.linkIngreso} target="_blank" rel="noopener noreferrer">
                                    {asamblea.linkIngreso}
                                </a>
                            </p>
                        )}
                        <p>
                            <strong>Ver documento:</strong>{" "}
                            <a href={asamblea.documentoUrl} target="_blank" rel="noopener noreferrer">
                                Descargar
                            </a>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReunionesYAsambleas;
