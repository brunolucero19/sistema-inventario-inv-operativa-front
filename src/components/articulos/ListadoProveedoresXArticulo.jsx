import { useState, useEffect } from 'react';
import Tabla from '../ui/Tabla';
import { obtenerProveedoresPorArticulo } from '../../services/proveedorArticulos';
import { obtenerArticulos } from '../../services/articulos';

const ListadoProveedoresXArticulo = () => {
  const [articulos, setArticulos] = useState([]);
  const [idArticulo, setIdArticulo] = useState('');
  const [proveedoresArt, setProveedoresArt] = useState([]);

  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const data = await obtenerArticulos();
        setArticulos(data);
      } catch (error) {
        console.error('Error al obtener artículos:', error);
      }
    };

    fetchArticulos();
  }, []);

  const handleChange = async (e) => {
    const selectedId = e.target.value;
    setIdArticulo(selectedId);

    if (selectedId) {
      try {
        const data = await obtenerProveedoresPorArticulo(selectedId);
        const proveedoresFormateados = data.map((item) => ({
          id_proveedor: item.proveedor.id_proveedor,
          precio_unitario: item.precio_unitario,
          costo_pedido: item.costo_pedido,
          nombre: item.proveedor.nombre,
          apellido: item.proveedor.apellido,
          email: item.proveedor.email,
          telefono: item.proveedor.telefono,
        }));
        setProveedoresArt(proveedoresFormateados);
      } catch (error) {
        console.error('Error al obtener proveedores:', error);
        setProveedoresArt([]);
      }
    } else {
      setProveedoresArt([]);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <label htmlFor="articulo" className="mr-2 font-semibold">Seleccionar artículo:</label>
        <select
          id="articulo"
          value={idArticulo}
          onChange={handleChange}
          className="border px-2 py-1 rounded"
        >
          <option className='text-gray-800' value="">Elegir un artículo</option>
          {articulos.map((art) => (
            <option className='text-black' key={art.id_articulo} value={art.id_articulo}>
              {art.descripcion}
            </option>
          ))}
        </select>
      </div>

      <Tabla
        columns={['id_proveedor', "precio_unitario", "costo_pedido", 'nombre', 'apellido', 'email', 'telefono']}
        data={proveedoresArt}
        filaPorPagina={5}
      />
    </div>
  );
};

export default ListadoProveedoresXArticulo;
