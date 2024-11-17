'use client'

import React, { useState } from 'react';
import '../../styles/ingresar.css';

const Ingresar = () => {
  const [step, setStep] = useState(1); // Estado para controlar las etapas
  const [tipoCedula, setTipoCedula] = useState('');
  const [numeroCedula, setNumeroCedula] = useState('');
  const [tipoOac, setTipoOac] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleTipoCedulaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoCedula(e.target.value);
  };

  const handleNumeroCedulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumeroCedula(e.target.value);
  };

  const handleTipoOacChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoOac(e.target.value);
  };

  const handleContrasenaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContrasena(e.target.value);
  };

  const handleNextStep = () => {
    if (step === 1) {
      // Validar el tipo de cédula y número de cédula
      if (tipoCedula && numeroCedula) {
        setStep(2); // Avanzar al siguiente paso
      } else {
        alert('Por favor, complete todos los campos.');
      }
    }
  };

  return (
    <div className="ingresar-container">
      <h2>Ingreso</h2>
      
      {step === 1 && (
        <div className="ingresar-form">
          <div className="form-group">
            <label htmlFor="tipoCedula">Tipo de Cédula:</label>
            <select
              id="tipoCedula"
              value={tipoCedula}
              onChange={handleTipoCedulaChange}
            >
              <option value="">Seleccione...</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CE">Cédula Extranjera</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="numeroCedula">Número de Cédula:</label>
            <input
              type="text"
              id="numeroCedula"
              value={numeroCedula}
              onChange={handleNumeroCedulaChange}
              placeholder="Ingrese su número de cédula"
            />
          </div>
          
          <button onClick={handleNextStep}>Siguiente</button>
        </div>
      )}

      {step === 2 && (
        <div className="ingresar-form">
          <div className="form-group">
            <label htmlFor="tipoOac">Tipo de OAC:</label>
            <select
              id="tipoOac"
              value={tipoOac}
              onChange={handleTipoOacChange}
            >
              <option value="">Seleccione...</option>
              <option value="OAC">OAC</option>
              <option value="Presidencia">Presidencia</option>
              <option value="Vicepresidencia">Vicepresidencia</option>
              <option value="Tesoreria">Tesorería</option>
              <option value="Secretaria">Secretaría</option>
              <option value="Fiscalia">Fiscalía</option>
              <option value="Delegacion">Delegación</option>
              <option value="Comision Convivencia">Comisión de Convivencia y Conciliación</option>
              <option value="Comisiones de Trabajo">Comisiones de Trabajo</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="contrasena">Contraseña:</label>
            <input
              type="password"
              id="contrasena"
              value={contrasena}
              onChange={handleContrasenaChange}
              placeholder="Ingrese su contraseña"
            />
          </div>

          <button onClick={() => alert('Ingreso exitoso')}>Ingresar</button>
        </div>
      )}
    </div>
  );
};

export default Ingresar;
