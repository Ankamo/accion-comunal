import React from "react";
import Image from "next/image";

const Bandera: React.FC = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                margin: "20px",
            }}
        >
            <h3
                style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "10px",
                }}
            >
                Bandera de la Acción Comunal
            </h3>
            <Image
                src="/simbolos/Bandera_Accion_Comunal.png"
                alt="Bandera Acción Comunal"
                width={200}
                height={150}
            />
        </div>
    );
};

export default Bandera;
