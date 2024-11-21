// src/app/[oacPath]/ingresar/page.tsx
'use client'

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

const IngresarPage = () => {
    const pathname = usePathname(); // Captura la ruta actual
    const segments = pathname.split('/'); // Divide la ruta en segmentos
    const oacName = segments[1]; // Captura el nombre de la OAC desde el primer segmento de la URL

    // Función para formatear el nombre de la OAC con iniciales en mayúscula y guion antes del departamento
    const formatOACName = (name: string) => {
        const decodedName = decodeURIComponent(name); // Decodifica la OAC
        const words = decodedName.replace(/-/g, ' ').split(' '); // Reemplaza guiones con espacios y separa palabras

        // Convierte a mayúscula las palabras principales y deja minúsculas en las palabras de enlace
        const formattedWords = words.map((word) => {
            if (['de', 'del', 'y'].includes(word.toLowerCase())) {
                return word.toLowerCase(); // Mantiene preposiciones y conectores en minúscula
            }
            return word.charAt(0).toUpperCase() + word.slice(1); // Convierte inicial en mayúscula
        });

        // Añade el guion antes del último elemento (departamento)
        if (formattedWords.length > 1) {
            const department = formattedWords.pop(); // Remueve el último elemento (departamento)
            return `${formattedWords.join(' ')} - ${department}`; // Une con el guion antes del departamento
        }

        return formattedWords.join(' '); // Devuelve el nombre formateado sin guion si solo hay una palabra
    };

    const oacFormattedName = formatOACName(oacName); // Formatea el nombre

    // Estado para manejar el inicio de sesión
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica de inicio de sesión
        console.log('Username:', username);
        console.log('Password:', password);
        // Aquí puedes agregar la lógica para autenticar al usuario
    };

    return (
        <div>
            <h1>Ingresar</h1>
            <h2>{oacFormattedName}</h2> {/* Muestra el nombre de la OAC formateado */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Nombre de usuario:</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Ingresar</button>
            </form>
            <p>Aquí puedes iniciar sesión para acceder a tu cuenta.</p>
        </div>
    );
};

export default IngresarPage;
