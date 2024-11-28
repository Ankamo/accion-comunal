import React from "react";
import Image from "next/image";

const Logo: React.FC = () => {
    return (
        <section className="symbol-item">
            <header>
                <h3 className="text-xl font-bold text-center">
                    Escudo de la Acción Comunal
                </h3>
            </header>
            <figure className="symbol-img-container">
                <Image
                    src="/simbolos/Escudo_Acción_Comunal_Colombia.svg"
                    alt="Logo Acción Comunal"
                    width={200}
                    height={200}
                    className="symbol-img rounded-lg"
                />
                <figcaption className="text-center mt-2 text-gray-500">
                    Escudo de la Acción Comunal de Colombia
                </figcaption>
            </figure>
        </section>
    );
};

export default Logo;
