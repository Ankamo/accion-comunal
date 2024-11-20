// src/components/Header.tsx

'use client';

import React from 'react';

const Header: React.FC = () => {
    return (
        <header>
            <div className="header-container">
                <div className="hamburger">
                    &#9776; {/* Icono de hamburguesa */}
                </div>
                <h1>Acción Comunal</h1>
            </div>
        </header>
    );
};

export default Header;
