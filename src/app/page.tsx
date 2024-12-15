"use client";

import { useState } from "react";

const images = [
    "/images/plaza1.jpg",
    "/images/plaza2.jpg",
    "/images/plaza3.jpg",
];

export default function HomePage() {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Logo */}
            <div className="mb-8">
                <img
                    src="/images/logo.png"
                    alt="Logo Plaza de Mercado"
                    className="w-40 h-auto"
                />
            </div>

            {/* Carrusel */}
            <div className="relative w-full max-w-4xl overflow-hidden rounded-lg shadow-lg">
                <img
                    src={images[currentImage]}
                    alt={`Imagen ${currentImage + 1}`}
                    className="w-full h-64 object-cover"
                />
                <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-gray-200"
                >
                    ❮
                </button>
                <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-gray-200"
                >
                    ❯
                </button>
            </div>

            {/* Botón de Ingreso */}
            <div className="mt-8">
                <a
                    href="/productos"
                    className="bg-blue-600 text-white text-lg px-6 py-3 rounded-full shadow hover:bg-blue-700 transition"
                >
                    Ingresar a la Tienda Virtual
                </a>
            </div>
        </div>
    );
}
