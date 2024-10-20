// src/app/page.tsx

import Link from 'next/link';

const Home = () => {
    return (
        <div>
            <h1>Bienvenido al Registro de Juntas de Acción Comunal</h1>
            <Link href="/registro">Ir al formulario de registro</Link>
        </div>
    );
};

export default Home;
