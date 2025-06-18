import { Search } from 'lucide-react'
import { useState } from 'react'

// Accede a propiedades anidadas como 'articulo.descripcion'
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
};

export const SearchBar = ({ onClickOpcion, data, atributo, placeholder }) => {
  const [busqueda, setBusqueda] = useState('');
  const [sugerencias, setSugerencias] = useState([]);

  const handleBusquedaChange = (e) => {
    const value = e.target.value;
    setBusqueda(value);

    if (value.trim() === '') {
      setSugerencias([]);
    } else {
      const resultados = data.filter((item) => {
        const valor = getNestedValue(item, atributo);
        return typeof valor === 'string' && valor.toLowerCase().includes(value.toLowerCase());
      });
      setSugerencias(resultados.slice(0, 5));
    }
  };

  const handleClickOpcion = (item) => {
    setBusqueda('');
    setSugerencias([]);
    onClickOpcion(item);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={busqueda}
        onChange={handleBusquedaChange}
        className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>

      {sugerencias.length > 0 && (
        <ul className="absolute bg-gray-500 text-black z-10 shadow-lg border border-gray-900 rounded w-full max-h-60 overflow-y-auto mt-1">
          {sugerencias.map((item, index) => (
            <li
              key={index}
              onClick={() => handleClickOpcion(item)}
              className="p-2 hover:bg-gray-400 cursor-pointer"
            >
              {getNestedValue(item, atributo)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
