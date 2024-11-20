// src/app/[oacPath]/cartelera-comunal/page.tsx
'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

// Componente para cada Section
const Section = ({ title, id, items, isActive }: { title: string; id: string; items: string[]; isActive: boolean }) => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null); // Estado para el ítem seleccionado

    if (!isActive) return null; // Si la sección no está activa, no se renderiza

    return (
        <section id={id} style={{ marginBottom: '20px', padding: '10px', borderBottom: '1px solid #ccc' }}>
            <h3>{title}</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {items.map((item, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                        <button 
                            style={{ 
                                cursor: 'pointer', 
                                backgroundColor: selectedItem === item ? '#333' : '#007bff', // Color de fondo del botón
                                color: '#ffffff', // Color de texto
                                border: 'none', 
                                padding: '8px 12px', 
                                borderRadius: '4px' 
                            }}
                            onClick={() => setSelectedItem(item)} // Selecciona el ítem al hacer clic
                        >
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
            {selectedItem && (
                <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #ddd' }}>
                    <h4>{selectedItem}</h4>
                    <p>Detalles del {selectedItem} en {title}.</p>
                    <button 
                        onClick={() => setSelectedItem(null)} 
                        style={{ 
                            marginTop: '10px', 
                            padding: '5px', 
                            backgroundColor: '#007bff', // Color de fondo
                            color: '#ffffff', // Color de texto
                            border: 'none', 
                            borderRadius: '4px', 
                            cursor: 'pointer' 
                        }}
                    >
                        Volver
                    </button>
                </div>
            )}
        </section>
    );
};

const CarteleraComunal = () => {
    const pathname = usePathname(); // Captura la ruta actual
    const segments = pathname.split('/'); // Divide la ruta en segmentos
    const oacName = segments[1]; // Captura el nombre de la OAC desde el primer segmento de la URL
    const [activeSection, setActiveSection] = useState<string | null>(null); // Estado para la sección activa

    // Función para formatear el nombre de la OAC
    const formatOACName = (name: string) => {
        const decodedName = decodeURIComponent(name); // Decodifica la OAC
        const words = decodedName.replace(/-/g, ' ').split(' '); // Reemplaza guiones con espacios y separa palabras

        const formattedWords = words.map((word) => {
            if (['de', 'del', 'y'].includes(word.toLowerCase())) {
                return word.toLowerCase(); // Mantiene preposiciones y conectores en minúscula
            }
            return word.charAt(0).toUpperCase() + word.slice(1); // Convierte inicial en mayúscula
        });

        if (formattedWords.length > 1) {
            const department = formattedWords.pop(); // Remueve el último elemento (departamento)
            return `${formattedWords.join(' ')} - ${department}`; // Une con el guion antes del departamento
        }

        return formattedWords.join(' '); // Devuelve el nombre formateado
    };

    const oacFormattedName = formatOACName(oacName); // Formatea el nombre

    // Datos de ejemplo para cada sección
    const eventos = ["Evento 1", "Actividad 2", "Festival Comunal"];
    const reuniones = ["Reunión Anual", "Asamblea de Vecinos", "Reunión de Junta"];
    const proyectos = ["Proyecto de Infraestructura", "Campaña de Limpieza", "Taller Educativo"];
    const servicios = ["Servicio de Salud", "Limpieza de Parque", "Taller de Seguridad"];

    return (
        <div>
            <h1>Cartelera Comunal</h1>
            <h2>{oacFormattedName}</h2>
            <p>Aquí se mostrará la información de la cartelera comunal.</p>

            {/* Navegación entre secciones */}
            <nav style={{ marginBottom: '20px' }}>
                <ul style={{ display: 'flex', gap: '10px', listStyleType: 'none', padding: 0 }}>
                    <li>
                        <button 
                            onClick={() => setActiveSection("eventos")} 
                            style={{ 
                                backgroundColor: activeSection === "eventos" ? '#121313' : '#007bff', 
                                color: '#ffffff', 
                                border: 'none', 
                                padding: '8px 12px', 
                                borderRadius: '4px' 
                            }}
                        >
                            Eventos y Actividades
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => setActiveSection("reuniones")} 
                            style={{ 
                                backgroundColor: activeSection === "reuniones" ? '#121313' : '#007bff', 
                                color: '#ffffff', 
                                border: 'none', 
                                padding: '8px 12px', 
                                borderRadius: '4px' 
                            }}
                        >
                            Reuniones
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => setActiveSection("proyectos")} 
                            style={{ 
                                backgroundColor: activeSection === "proyectos" ? '#121313' : '#007bff', 
                                color: '#ffffff', 
                                border: 'none', 
                                padding: '8px 12px', 
                                borderRadius: '4px' 
                            }}
                        >
                            Proyectos Comunales
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => setActiveSection("servicios")} 
                            style={{ 
                                backgroundColor: activeSection === "servicios" ? '#121313' : '#007bff', 
                                color: '#ffffff', 
                                border: 'none', 
                                padding: '8px 12px', 
                                borderRadius: '4px' 
                            }}
                        >
                            Servicios Comunales
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Secciones */}
            <Section title="Eventos y Actividades" id="eventos" items={eventos} isActive={activeSection === "eventos"} />
            <Section title="Reuniones" id="reuniones" items={reuniones} isActive={activeSection === "reuniones"} />
            <Section title="Proyectos Comunales" id="proyectos" items={proyectos} isActive={activeSection === "proyectos"} />
            <Section title="Servicios Comunales" id="servicios" items={servicios} isActive={activeSection === "servicios"} />
        </div>
    );
};

export default CarteleraComunal;
