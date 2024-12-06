import React from "react";
import Image from "next/image";

const Logo: React.FC = () => {
    return (
        <section
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                margin: "20px",
            }}
            className="symbol-item"
        >
            <header className="mb-4">
                <h3 className="text-xl font-bold">
                    Escudo de la Acción Comunal
                </h3>
            </header>
            <figure className="flex flex-col items-center">
                <Image
                    src="/simbolos/Escudo_Acción_Comunal_Colombia.svg"
                    alt="Logo Acción Comunal"
                    width={200}
                    height={200}
                    className="rounded-lg symbol-img"
                />
                <figcaption className="mt-2 text-gray-500">
                    Escudo de la Acción Comunal de Colombia
                </figcaption>
            </figure>
        </section>
    );
};

export default Logo;
