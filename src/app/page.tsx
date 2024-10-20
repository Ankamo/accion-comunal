// src/app/page.tsx
import Registro from './registro/page'; // Importa el componente Registro sin .tsx

const Home = () => {
    return (
        <div className="container">
            <div className="main-area">
                <main className="main-content">
                    <Registro /> {/* Renderiza el componente Registro aquí */}
                </main>    
            </div>
        </div>
    );
};

export default Home;
