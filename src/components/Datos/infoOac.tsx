// datos/datos.tsx

export const datosOac = {
    TipoOac: "Junta de Acción Comunal",
    TipoUbicacion: "Del Barrio",
    Nombre: "De Rosa Blanca",
    Nit: "808.002.688-7",
    RUC: "15-1884-3053",
    PJ: "103 del 17 de enero de 1962",
    ExpedidoPor: "Ministerio de Justicia",
    Ubicacion: "Girardot, Cundinamarca",
};

export const datosFooter = {
    direccion: "Diagonal 33 con Carrera 12 A Esquina.",
    barrio: "Rosa Blanca Primer Sector",
    correoComunal: "juntacomunalrosablanca@gmail.com",
    telefono: "304-347-0984",
    periodoComunal: "2022 - 2026",
    propiedad: `${datosOac.TipoOac} ${datosOac.TipoUbicacion} ${datosOac.Nombre}`, // Concatenar los datos aquí
};
