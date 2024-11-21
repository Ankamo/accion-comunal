// app/page.tsx

'use client'
import { useState } from "react";
import Cuenta from "../components/registro/cuenta/page"; 
import Contacto from "../components/registro/contacto/page"; 
import Ubicacion from "../components/registro/ubicacion/page"; 
import '../styles/registro.css';

function Page() {
    const [activeSection, setActiveSection] = useState<string>("cuenta");

    // Cambiar a la siguiente sección
    const handleNext = () => {
        if (activeSection === "cuenta") {
            setActiveSection("ubicacion");
        } else if (activeSection === "ubicacion") {
            setActiveSection("contacto");
        }
    };

    // Enviar el formulario
    const handleSubmit = () => {
        alert("Formulario enviado!");
        // Aquí puedes hacer la lógica de envío
    };

    return (
        <div className="page-container">
            <h1 className="page-title">Formulario de Registro</h1>

            {/* Navegación entre secciones */}
            <nav className="navigation">
                <ul>
                    <li>
                        <button 
                            onClick={() => setActiveSection("cuenta")} 
                            className={activeSection === "cuenta" ? "active" : "disabled"}
                            disabled={activeSection !== "cuenta"}
                        >
                            Cuenta
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => setActiveSection("ubicacion")} 
                            className={activeSection === "ubicacion" ? "active" : "disabled"}
                            disabled={activeSection !== "ubicacion"}
                        >
                            Ubicación
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => setActiveSection("contacto")} 
                            className={activeSection === "contacto" ? "active" : "disabled"}
                            disabled={activeSection !== "contacto"}
                        >
                            Contacto
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Mostrar solo la sección activa */}
            {activeSection === "cuenta" && <Cuenta />}
            {activeSection === "ubicacion" && <Ubicacion />}
            {activeSection === "contacto" && <Contacto />}

            {/* Botones para avanzar o enviar el formulario */}
            <div className="button-container">
                {activeSection !== "contacto" ? (
                    <button
                        onClick={handleNext}
                        className="next-button"
                    >
                        Siguiente
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className="submit-button"
                    >
                        Enviar
                    </button>
                )}
            </div>
        </div>
    );
}

export default Page;
