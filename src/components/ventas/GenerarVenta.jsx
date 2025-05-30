import { toast } from 'react-toastify'
import { crearVenta } from '../../services/ventas'
import ButtonLayout from '../ui/ButtonLayout'
import Modal from '../ui/Modal'
import TrashIcon from '../../../public/icons/TrashIcon'
import { obtenerArticulos } from '../../services/articulos'
import ListadoVentas from './ListadoVentas'
import { useEffect, useRef, useState } from 'react'

const GenerarVenta = () => {
  const [articulosDisponibles, setArticulosDisponibles] = useState([])
  const [detalleArticulos, setDetalleArticulos] = useState([])
  const modalRef = useRef()

   useEffect(() => {
    obtenerArticulos().then(setArticulosDisponibles)
  }, [])

  const handleAddArticulo = () => {
    setDetalleArticulos((prev) => [
      ...prev,
      { articuloId: 0, cantidad: 1, id: Date.now() },
    ])
  }

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
      if (!articuloId || articuloId === 0 || !cantidad || cantidad <= 0) {
        toast.error('Completa todos los campos correctamente.')
        return
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

  return (
    <div className='w-full'>
      <div className='flex justify-end w-full'>
        <ButtonLayout onClick={() => modalRef.current?.showModal()}>
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

            <ButtonLayout
              className='border border-gray-300 rounded-lg p-2'
              onClick={handleAddArticulo}
              type='button'
            >
              Agregar artículo
            </ButtonLayout>

            <div className='flex flex-col gap-4 max-h-64 overflow-y-auto'>
              {detalleArticulos.map((articulo) => (
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
                    {articulosDisponibles.map((art) => (
                      <option
                        key={art.id_articulo}
                        value={art.id_articulo}
                        className='text-black'
                      >
                        {art.descripcion}
                      </option>
                    ))}
                  </select>

                  <label>Cantidad</label>
                  <input
                    type='number'
                    className='border border-gray-300 rounded-md p-2'
                    value={articulo.cantidad}
                    onChange={(e) =>
                      handleChangeArticulo(
                        articulo.id,
                        'cantidad',
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              ))}
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

      <ListadoVentas />
    </div>
  )
}
export default GenerarVenta
