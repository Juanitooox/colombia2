import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter, Route, Routes, Link, useParams } from 'react-router-dom';

const AppContext = createContext();

const initialAppState = {
  favoritos: ['Lugar A', 'Lugar B'],
  darkMode: false,
};

const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState(initialAppState);

  const toggleFavorito = (item) => {
    setAppState(prevState => ({
      ...prevState,
      favoritos: prevState.favoritos.includes(item)
        ? prevState.favoritos.filter(f => f !== item)
        : [...prevState.favoritos, item]
    }));
  };

  return (
    <AppContext.Provider value={{ appState, toggleFavorito }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

const Home = () => {
  const destinos = [
    { id: 1, name: 'Medellín, Antioquia', link: '/detalle/Antioquia/Medellin' },
    { id: 2, name: 'Cali, Valle del Cauca', link: '/detalle/ValleDelCauca/Cali' },
    { id: 3, name: 'Cartagena, Bolívar', link: '/detalle/Bolivar/Cartagena' },
  ];

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Página Principal (Home)</h1>
      <p className="mb-8">
        Bienvenido a la aplicación. Explora los destinos y usa la sección "Favoritos" para guardar tus lugares preferidos.
      </p>
      
      <div className="max-w-md mx-auto space-y-4">
        {destinos.map(destino => (
          <Link key={destino.id} to={destino.link} className="block">
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200 text-left">
              <span className="text-lg font-medium text-gray-700">{destino.name}</span>
            </div>
          </Link>
        ))}
      </div>
      
      <Link to={destinos[0].link} className='block'>
        <button className="bg-indigo-600 hover:bg-indigo-700">
          Ver Detalle de Ejemplo
        </button>
      </Link>
    </div>
  );
};

const Informativa = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const infoItems = [
    {
      title: "Antioquia y Medellín",
      text: "Antioquia es uno de los departamentos más importantes por su fuerte desarrollo económico e industrial. Su capital, Medellín, es conocida como la 'Ciudad de la Eterna Primavera' y se ha transformado en un centro de innovación, moda y desarrollo tecnológico. Es vital para el país por su aporte en manufactura, servicios y por ser el corazón de la cultura Paisa, una de las más influyentes de Colombia. "
    },
    {
      title: "Valle del Cauca y Cali",
      text: "Ubicado estratégicamente en el occidente, el Valle del Cauca es el centro de la producción azucarera y agrícola. Su capital, Cali, conocida como la 'Capital Mundial de la Salsa', es un importante eje cultural y deportivo. Su puerto, Buenaventura (aunque en el Pacífico, está estrechamente ligada al departamento), es la principal puerta de entrada y salida de comercio exterior en el Pacífico colombiano, lo que subraya su importancia logística y económica. "
    },
    {
      title: "Bolívar y Cartagena de Indias",
      text: "Bolívar es históricamente crucial. Su capital, Cartagena, la 'Heroica', es Patrimonio de la Humanidad y el principal destino turístico del Caribe colombiano, famosa por su impresionante ciudad amurallada. Además de su atractivo turístico, Cartagena es un puerto marítimo fundamental y un centro petroquímico clave para la economía nacional, fusionando historia, cultura y desarrollo industrial. "
    }
  ];

  const toggleInfo = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800 border-b pb-4">
        Destinos Destacados de Colombia
      </h1>
      
      <div className="space-y-6">
        {infoItems.map((item, index) => (
          <div key={index} className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
            <button
              onClick={() => toggleInfo(index)}
              className="w-full text-left flex justify-between items-center p-5 font-bold transition-colors duration-200"
              style={{ margin: 0, boxShadow: 'none', background: openIndex === index ? '#eff6ff' : '#f9fafb', color: '#1f2937' }}
            >
              <span className="text-lg">{item.title}</span>
              <span className="text-2xl transform transition-transform duration-300">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            
            <div 
              className={`bg-white text-gray-800 transition-max-height duration-500 ease-in-out ${
                openIndex === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
              }`}
              style={{ 
                borderTop: openIndex === index ? '1px solid #e5e7eb' : 'none',
                padding: openIndex === index ? '1.25rem' : '0 1.25rem',
                overflow: 'hidden'
              }}
            >
              <p className="mb-4 text-base leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="mb-4 text-gray-700">Explora el mapa para ver más información y añade tus favoritos.</p>
        <Link to="/mapa" className='block'>
          <button className="bg-blue-600 hover:bg-blue-700" style={{boxShadow: '0 4px 0 #1e40af'}}>
            Ir al Mapa de Destinos
          </button>
        </Link>
      </div>
    </div>
  );
};

const Mapa = () => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Mapa Interactivo</h1>
      <p className="mb-4">Aquí se mostraría la visualización de un mapa.</p>
      <button className="bg-red-600 hover:bg-red-700">Centrar Mapa</button>
    </div>
  );
};

const Favoritos = () => {
  const { appState } = useAppContext();
  
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Mis Favoritos</h1>
      <ul className="space-y-3">
        {appState.favoritos.map((item, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm">
            <span>{item}</span>
            <button 
              onClick={() => {}}
              className="bg-purple-600 hover:bg-purple-700 text-sm py-2 px-4 !m-0"
              style={{ fontSize: '1rem', padding: '5px 10px', margin: '0', boxShadow: '0 4px 0 #4c1d95' }}
            >
              Quitar
            </button>
          </li>
        ))}
      </ul>
      <div className="text-center mt-8">
        <button className="bg-purple-600 hover:bg-purple-700">Agregar Nuevo</button>
      </div>
    </div>
  );
};

const Detalle = () => {
  const { depto, municipio } = useParams();

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Detalle Específico</h1>
      <div className="bg-yellow-100 p-6 rounded-lg shadow-md inline-block">
        <p className="text-xl font-semibold">Departamento: <span className="text-indigo-600">{depto}</span></p>
        <p className="text-xl font-semibold">Municipio: <span className="text-indigo-600">{municipio}</span></p>
      </div>
      <div className="mt-8">
        <button className="bg-indigo-600 hover:bg-indigo-700">Volver al Mapa</button>
      </div>
    </div>
  );
};

export default function App() {

  const globalStyles = `
    button {
      font-size: 1.2rem;
      color: #FFFFFF;
      text-transform: uppercase;
      padding: 10px 20px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      margin: 20px auto;
      display: block;
      transition: all 0.2s ease;
      font-weight: 600;
      letter-spacing: 0.5px;
      position: relative;
      box-shadow: 0 4px 0 rgba(79, 70, 229, 1);
    }

    button:hover {
      opacity: 0.9;
    }

    button:active {
      transform: translateY(4px);
      box-shadow: 0 0 0 rgba(79, 70, 229, 1);
    }
    
    .c-menu {
      display: flex;
      justify-content: center;
      gap: 2rem;
      padding: 1rem 1rem;
      background-color: #1f2937;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }

    .c-menu a {
      color: #d1d5db;
      text-decoration: none;
      font-weight: 700;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      transition: all 0.2s ease;
    }

    .c-menu a:hover {
      color: #ffffff;
      background-color: #3b82f6;
      box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
    }
  `;

  return (
    <>
      <style>{globalStyles}</style>
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="min-h-screen bg-gray-50 font-sans">
        <AppProvider>
          <HashRouter>

            <nav className="c-menu">
              <Link to="/">Home</Link>
              <Link to="/informativa">Informativa</Link>
              <Link to="/mapa">Mapa</Link>
              <Link to="/favoritos">Favoritos</Link>
            </nav>

            <main className="container mx-auto p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/informativa" element={<Informativa />} />
                <Route path="/mapa" element={<Mapa />} />
                <Route path="/favoritos" element={<Favoritos />} />
                <Route path="/detalle/:depto/:municipio" element={<Detalle />} />
              </Routes>
            </main>
          </HashRouter>
        </AppProvider>
      </div>
    </>
  );
}
