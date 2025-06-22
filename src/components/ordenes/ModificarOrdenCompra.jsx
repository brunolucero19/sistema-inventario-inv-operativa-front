import { useState, useEffect } from 'react'
import ButtonLayout from '../ui/ButtonLayout'

export const ModificarOrdenCompra = ({ orden, onSubmit, onCancel }) => {
  const [localOrden, setLocalOrden] = useState(null)

  useEffect(() => {
    if (orden) {
      setLocalOrden(orden)
    }
  }, [orden])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!localOrden) return null

    onSubmit(localOrden)
  }
  const handleCancel = () => {
    onCancel()
    setLocalOrden(null)
  }

  const Options = ({ estadoId }) => {
    switch (estadoId) {
      case 1:
        return (
          <>
            <option value='1' className='bg-gray-400 text-black'>
              Pendiente
            </option>
            <option value='2' className='bg-gray-400 text-black'>
              Cancelada
            </option>
            <option value='3' className='bg-gray-400 text-black'>
              Enviada
            </option>
          </>
        )
      case 2:
        return (
          <>
            <option value='2' className='bg-gray-400 text-black'>
              Cancelada
            </option>
          </>
        )
      case 3:
        return (
          <>
            <option value='3' className='bg-gray-400 text-black'>
              Enviada
            </option>
            <option value='4' className='bg-gray-400 text-black'>
              Finalizada
            </option>
          </>
        )
      case 4:
        return (
          <>
            <option value='4' className='bg-gray-400 text-black'>
              Finalizada
            </option>
          </>
        )
      default:
        return null
    }
  }

  if (!localOrden) return null
  return (
    <>
      <h1 className='text-center font-bold uppercase'>Modificar Orden</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-2 my-4'>
        <p>
          <strong>ID:</strong> {localOrden.id_orden_compra}
        </p>
        <p>
          <strong>Proveedor:</strong>{' '}
          {localOrden.proveedorArticulo.proveedor.apellido}{' '}
          {localOrden.proveedorArticulo.proveedor.nombre}
        </p>
        <p>
          <strong>Artículo:</strong>{' '}
          {localOrden.proveedorArticulo.articulo.descripcion}
        </p>
        <p>
          <strong>Fecha estimada de recepción:</strong>{' '}
          {new Date(localOrden.fecha_estimada_recepcion).toLocaleDateString()}
        </p>

        <div className='flex items-center justify-between gap-2'></div>

        <div className='grid grid-cols-[auto_2fr] items-center gap-3'>
          <label htmlFor='cantidad'>Cantidad:</label>
          <input
            type='number'
            id='cantidad'
            disabled={orden?.id_estado_orden_compra !== 1}
            className='border border-gray-300 rounded-lg p-2 w-30 disabled:opacity-50'
            value={+localOrden.cantidad}
            onChange={(e) =>
              setLocalOrden({ ...localOrden, cantidad: +e.target.value })
            }
            min={1}
          />

          <label htmlFor='estado'>Estado: </label>
          <select
            id='estado'
            className='border border-gray-300 bg-gray-800 rounded-md p-2 text-white w-30 disabled:opacity-50'
            disabled={
              orden?.id_estado_orden_compra === 2 ||
              orden?.id_estado_orden_compra === 4
            }
            value={localOrden.id_estado_orden_compra}
            onChange={(e) =>
              setLocalOrden({
                ...localOrden,
                id_estado_orden_compra: +e.target.value,
              })
            }
          >
            <Options estadoId={+orden?.id_estado_orden_compra} />
          </select>
        </div>

        <div className='flex justify-around mt-4'>
          <ButtonLayout
            onClick={handleCancel}
            className='bg-red-500 hover:bg-red-600'
            type='button'
          >
            Cancelar
          </ButtonLayout>
          <ButtonLayout
            className={'disabled:opacity-50'}
            type='submit'
            disabled={orden === localOrden}
          >
            Guardar cambios
          </ButtonLayout>
        </div>
      </form>
    </>
  )
}
