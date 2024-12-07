// src/app/layout.tsx

import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="es">
            <body>
                <main>{children}</main>
            </body>
        </html>
    );
};

export default Layout;
