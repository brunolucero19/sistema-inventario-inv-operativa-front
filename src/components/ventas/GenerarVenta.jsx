import { toast } from 'react-toastify'
import { crearVenta } from '../../services/ventas'
import ButtonLayout from '../ui/ButtonLayout'
import Modal from '../ui/Modal'
import TrashIcon from '../../../public/icons/TrashIcon'
import { obtenerArticulos } from '../../services/articulos'
import ListadoVentas from './ListadoVentas'
import { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { useUpdateKeyStore } from '../../hooks/useStore'

const GenerarVenta = () => {
  const [articulosDisponibles, setArticulosDisponibles] = useState([])
  const [detalleArticulos, setDetalleArticulos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [sugerencias, setSugerencias] = useState([])
  const modalRef = useRef()
  const { updateKey, incrementUpdateKey } = useUpdateKeyStore()


  useEffect(() => {
    obtenerArticulos().then(setArticulosDisponibles)
  }, [])

  const handleAddArticulo = (articuloSeleccionado = null) => {
    setDetalleArticulos((prev) => {
      const articuloId = articuloSeleccionado == null ? 0 : articuloSeleccionado.id_articulo;

      const existe = prev.find((a) => a.articuloId === articuloId);

      if (existe) {
        return prev.map((a) => {
          if (a.articuloId === articuloId) {
            const articuloData = articulosDisponibles.find(x => x.id_articulo === articuloId);
            const max = articuloData?.stock ?? Infinity;

            const nuevaCantidad = Math.min(a.cantidad + 1, max);

            return {
              ...a,
              cantidad: nuevaCantidad,
            };
          }
          return a;
        });
      }

      return [
        ...prev,
        {
          articuloId,
          cantidad: 1,
          id: Date.now(),
        },
      ];
    });

    if (articuloSeleccionado) {
      setBusqueda('');
      setSugerencias([]);
    }
  };

  const handleRemoveArticulo = (id) => {
    setDetalleArticulos((prev) => prev.filter((a) => a.id !== id))
  }

  const handleChangeArticulo = (id, field, value) => {
    setDetalleArticulos((prev) =>
      prev.map((articulo) =>
        articulo.id === id ? { ...articulo, [field]: value } : articulo
      )
    )
  }

  const handleAddVenta = async (e) => {
    e.preventDefault()

    if (detalleArticulos.length === 0) {
      toast.error('Debes agregar al menos un artículo.')
      return
    }

    for (const { articuloId, cantidad } of detalleArticulos) {
      const art = articulosDisponibles.find(a => a.id_articulo === articuloId);
      if (!articuloId || articuloId === 0 || !cantidad || cantidad <= 0 || cantidad > art?.stock) {
        toast.error('Completa todos los campos correctamente y respeta el stock');
        return;
      }
    }

    const venta = {
      items: detalleArticulos.map(({ articuloId, cantidad }) => ({
        articuloId,
        cantidad,
      })),
    }

    try {
      const response = await crearVenta(venta)
      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error del servidor:', errorData)
        toast.error('Venta no creada correctamente')
        return
      }

      toast.success('Venta creada correctamente')
      setDetalleArticulos([])
      incrementUpdateKey()
      modalRef.current?.close()
    } catch (error) {
      console.error('Error al crear venta:', error)
      toast.error('Venta no creada correctamente')
    }
  }

  const handleCancel = () => {
    setDetalleArticulos([])
    modalRef.current?.close()
  }

  const handleBusquedaChange = (e) => {
    const value = e.target.value;
    setBusqueda(value);

    if (value.trim() === '') {
      setSugerencias([]);
    } else {
      const resultados = articulosDisponibles.filter((art) =>
        art.descripcion.toLowerCase().includes(value.toLowerCase())
      );
      setSugerencias(resultados.slice(0, 5));
    }
  };

  const handleSeleccionarArticulo = (articulo) => {
    handleAddArticulo(articulo);
    setBusqueda('');
    setSugerencias([]);
  };

  const todosSeleccionados = articulosDisponibles.every((art) =>
    detalleArticulos.some((a) => a.articuloId === art.id_articulo))

  return (
    <div className='w-full'>
      <div className='flex justify-end w-full'>
        <ButtonLayout onClick={() => modalRef.current?.show()}>
          Crear venta
        </ButtonLayout>
        <Modal modalRef={modalRef}>
          <h1 className='text-center font-bold uppercase'>Crear venta</h1>
          <form
            className='flex flex-col gap-4 my-4'
            id='form-crear-venta'
            onSubmit={handleAddVenta}
          >
            <label>Artículos</label>

            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar artículo..."
                value={busqueda}
                onChange={handleBusquedaChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>

              {sugerencias.length > 0 && (
                <ul className="absolute bg-gray-500 text-black z-10 shadow-lg border border-gray-900 rounded w-full max-h-60 overflow-y-auto mt-1">
                  {sugerencias.map((articulo) => (
                    <li
                      key={articulo.id}
                      onClick={() => handleSeleccionarArticulo(articulo)}
                      className="p-2 hover:bg-gray-400 cursor-pointer"
                    >
                      {articulo.descripcion}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <ButtonLayout
              className='border border-gray-300 rounded-lg p-2 disabled:opacity-50 disabled:cursor-not-allowed'
              onClick={handleAddArticulo}
              type='button'
              disabled={todosSeleccionados}
              title={todosSeleccionados ? 'Ya se agregaron todos los artículos disponibles' : ''}
            >
              Agregar artículo
            </ButtonLayout>

            <div className='flex flex-col gap-4 max-h-64 overflow-y-auto'>
              {detalleArticulos.map((articulo) => {
                const articuloData = articulosDisponibles.find(a => a.id_articulo === articulo.articuloId);
                const maxCantidad = articuloData?.stock ?? Infinity;
                const esInvalido = articulo.cantidad > maxCantidad;
                return (
                  <div
                    key={articulo.id}
                    className='border border-gray-300 flex flex-col gap-4 p-3 rounded-md bg-gray-800'
                  >
                    <div className='flex justify-between items-center'>
                      <label>Nombre artículo</label>
                      <button
                        type='button'
                        className='text-red-500 hover:text-red-700'
                        title='Eliminar artículo del detalle'
                        onClick={() => handleRemoveArticulo(articulo.id)}
                      >
                        <TrashIcon className='w-5 h-5 cursor-pointer' />
                      </button>
                    </div>

                    <select
                      value={articulo.articuloId}
                      onChange={(e) =>
                        handleChangeArticulo(
                          articulo.id,
                          'articuloId',
                          parseInt(e.target.value)
                        )
                      }
                      className='border border-gray-300 rounded-md p-2 text-white'
                    >
                      <option value='0' className='bg-gray-400 text-black'>
                        Seleccionar artículo...
                      </option>
                      {articulosDisponibles
                        .filter((art) => {
                          const yaSeleccionado = detalleArticulos.some(
                            (a) => a.articuloId === art.id_articulo && a.id !== articulo.id
                          );
                          return !yaSeleccionado;
                        })
                        .map((art) => (
                          <option key={art.id_articulo} value={art.id_articulo} className='text-black'>
                            {art.descripcion}
                          </option>
                        ))}
                    </select>

                    <label>Cantidad</label>
                    <input
                      type='number'
                      className={`border rounded-md p-2 ${esInvalido ? 'border-red-500' : 'border-gray-300'}`}
                      value={articulo.cantidad}
                      onChange={(e) =>
                        handleChangeArticulo(
                          articulo.id,
                          'cantidad',
                          parseInt(e.target.value)
                        )
                      }
                    />
                    {esInvalido && (
                      <p className='text-red-500 text-sm'>
                        Máximo disponible: {maxCantidad}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>

            <div className='flex justify-around mt-4'>
              <ButtonLayout
                onClick={handleCancel}
                className='bg-red-500 hover:bg-red-600'
                type='button'
              >
                Cancelar
              </ButtonLayout>
              <ButtonLayout type='submit'>Guardar cambios</ButtonLayout>
            </div>
          </form>
        </Modal>
      </div>
      <ListadoVentas updateKey={updateKey}/>
    </div>
  )
}
export default GenerarVenta
