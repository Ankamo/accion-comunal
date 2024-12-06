// components/Button.tsx

import React from "react";
import "../../../../../styles/main.css"; // Importa estilos globales si es necesario

const Button: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
            }}
        >
            <button className="cta-button">Ingresar Ahora</button>
        </div>
    );
};

export default Button;
