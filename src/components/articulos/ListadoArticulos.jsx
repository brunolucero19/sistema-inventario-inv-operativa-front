import { toast } from 'react-toastify'
import { crearArticulo, obtenerArticulos } from '../../services/articulos'
import ButtonLayout from '../ui/ButtonLayout'
import Modal from '../ui/Modal'
import { Search, Edit, Trash2 } from 'lucide-react';
import { useFetchData } from '../../hooks/useFetchData.js'
import { useSearchFilter } from '../../hooks/useSearchFilter.js'

const ListadoArticulos = () => {
  
  const idModal = 'modal-crear-articulo'

  const handleCancel = () => {
    const form = document.getElementById('form-crear-articulo')
    if (form) form.reset()
    const modal = document.getElementById(idModal)
    if (modal) modal.close()
  }

  const handleAddArticulo = async (e) => {
    e.preventDefault()
    const form = document.getElementById('form-crear-articulo')
    const formData = new FormData(form)
    let data = Object.fromEntries(formData.entries())

    data = {
    ...data,
    demanda_articulo: Number(data.demanda_articulo),
    costo_almacenamiento: Number(data.costo_almacenamiento),
    stock: Number(data.stock),
    precioVenta: Number(data.precioVenta),
    cgi: Number(data.cgi),
    stock_seguridad: Number(data.stock_seguridad),
    inventario_maximo: Number(data.inventario_maximo)
  }

    const response = await crearArticulo(data)

    if (response.ok) {
      form.reset()
      const modal = document.getElementById(idModal)
      if (modal) modal.close()
      toast.success('Artículo creado correctamente')
    } else {
      const error = await response.json()
      toast.error(`Error: ${error.error}`)
    }
  }


  //LEER TODOS
  const { data: articulos, loading, error } = useFetchData(obtenerArticulos)

  // FILTRO DE BUSQUEDA
  const { query, setQuery, filteredItems } = useSearchFilter(articulos || [], 'nombre')

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className='w-full'>
      <div className="relative w-64">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          placeholder="Buscar..."
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className='flex justify-end w-full'>
        <ButtonLayout onClick={() => document.getElementById(idModal).showModal()}>
          Crear artículo
        </ButtonLayout>
        <Modal id={idModal}>
          <h1 className='text-center font-bold uppercase'>Crear artículo</h1>
          <form
            className='flex flex-col gap-2 my-4'
            id='form-crear-articulo'
            onSubmit={handleAddArticulo}
          >
            <label htmlFor='nombre'>Nombre</label>
            <input type='text' id='nombre' name='nombre' className='border border-gray-300 rounded-lg p-2' required />

            <label htmlFor='descripcion'>Descripción</label>
            <textarea id='descripcion' name='descripcion' className='border border-gray-300 rounded-lg p-2' required />

            <label htmlFor='demanda_articulo'>Demanda mensual</label>
            <input type='number' id='demanda_articulo' name='demanda_articulo' className='border border-gray-300 rounded-lg p-2' required />

            <label htmlFor='costo_almacenamiento'>Costo de almacenamiento</label>
            <input type='number' step='0.01' id='costo_almacenamiento' name='costo_almacenamiento' className='border border-gray-300 rounded-lg p-2' required />

            <label htmlFor='stock'>Stock inicial</label>
            <input type='number' id='stock' name='stock' className='border border-gray-300 rounded-lg p-2' required />

            <label htmlFor='precioVenta'>Precio de venta</label>
            <input type='number' step='0.01' id='precioVenta' name='precioVenta' className='border border-gray-300 rounded-lg p-2' required />

            <label htmlFor='cgi'>CGI</label>
            <input type='number' step='0.01' id='cgi' name='cgi' className='border border-gray-300 rounded-lg p-2' required />

            <label htmlFor='stock_seguridad'>Stock de seguridad</label>
            <input type='number' id='stock_seguridad' name='stock_seguridad' className='border border-gray-300 rounded-lg p-2' required />

            <label htmlFor='inventario_maximo'>Inventario máximo</label>
            <input type='number' id='inventario_maximo' name='inventario_maximo' className='border border-gray-300 rounded-lg p-2' required />

            <div className='flex justify-around mt-4'>
              <ButtonLayout onClick={handleCancel} className='bg-red-500 hover:bg-red-600' type='button'>
                Cancelar
              </ButtonLayout>
              <ButtonLayout type='submit'>Crear artículo</ButtonLayout>
            </div>
          </form>
        </Modal>
      </div>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="border border-gray-700 px-4 py-2 text-gray-300 text-center">Nombre</th>
              <th className="border border-gray-700 px-4 py-2 text-gray-300 text-center">Descripción</th>
              <th className="border border-gray-700 px-4 py-2 text-gray-300 text-center">Stock</th>
              <th className="border border-gray-700 px-4 py-2 text-gray-300 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((articulo) => (
              <tr key={articulo.id_articulo} className="hover:bg-gray-700">
                <td className="border border-gray-700 px-4 py-2 text-gray-300">{articulo.nombre}</td>
                <td className="border border-gray-700 px-4 py-2 text-gray-300">{articulo.descripcion}</td>
                <td className="border border-gray-700 px-4 py-2 text-gray-300 text-center">{articulo.stock}</td>
                <td className="border border-gray-700 px-4 py-2 text-gray-300 text-center">
                  <button className="mr-2">
                    <Edit className="h-5 w-5 text-blue-500" />
                  </button>
                  <button>
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListadoArticulos
