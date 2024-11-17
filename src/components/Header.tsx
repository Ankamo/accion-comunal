import React from 'react';
import '../styles/header.css';
import { datosOac } from '../components/Datos/infoOac';

const Header = () => {
    return (
        <header>
            <div className="logo-left">
                <img
                    src="/oac.png"
                    id="header-logoOac"
                    alt="Logo Izquierdo"
                    className="img-fluid"
                />
            </div>

            <div>
                <h1>{`${datosOac.TipoOac} ${datosOac.TipoUbicacion} ${datosOac.Nombre}`}</h1>
                <p>NIT: {datosOac.Nit}</p>
                <p>RUC: {datosOac.RUC}</p>
                <p>PJ: {datosOac.PJ}</p>
                <p>Expedido por: {datosOac.ExpedidoPor}</p>
                <p>Ubicación: {datosOac.Ubicacion}</p>
            </div>

            <div className="logo-right">
                <img
                    src="/accioncomunal.png"
                    id="header-logoComunal"
                    alt="Logo Derecho"
                    className="img-fluid"
                />
            </div>
        </header>
    );
}

export default Header;
