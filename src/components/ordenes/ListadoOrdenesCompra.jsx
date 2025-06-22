import { useState, useRef, useMemo } from 'react'
import { modificarOc, obtenerOrdenesCompra } from '../../services/ordenes'
import Modal from '../ui/Modal'
import { SearchBar } from '../ui/SearchBar'
import { CrearOrdenCompra } from './CrearOrdenCompra'
import ButtonLayout from '../ui/ButtonLayout'
import { useFetchData } from '../../hooks/useFetchData'
import { useUpdateKeyStore } from '../../hooks/useStore'
import { OrdenCard } from './OrdenCard'
import { ModificarOrdenCompra } from './ModificarOrdenCompra'
import { toast } from 'react-toastify'

const ListadoOrdenesCompra = () => {
  const createModalRef = useRef()
  const editModalRef = useRef()
  const [filter, setFilter] = useState('')
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null)

  const { updateKey, incrementUpdateKey } = useUpdateKeyStore()

  const { data: ordenes } = useFetchData(obtenerOrdenesCompra, [updateKey])

  const filteredOrdenes = useMemo(
    () =>
      ordenes.filter((orden) => {
        if (filter.length === 0) return true
        return orden.id_estado_orden_compra === +filter
      }),
    [ordenes, filter]
  )

  const handleClickOrden = (orden) => {
    setOrdenSeleccionada({ ...orden })
    editModalRef.current?.show()
  }

  const handleModificarOrden = async (orden) => {
    if (!orden) return null

    const response = await modificarOc({
      ...orden,
      cantidad: +orden.cantidad,
    })

    if (response.ok) {
      toast.success('Orden de compra modificada correctamente')
      editModalRef.current?.close()
      setOrdenSeleccionada(null)
      incrementUpdateKey()
    } else {
      console.log(await response.json())
      toast.error('Error al modificar la orden de compra')
    }
  }

  const handleCancelarOrden = () => {
    setOrdenSeleccionada(null)
    editModalRef.current?.close()
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <label>Filtrar por estado:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='border border-gray-300 bg-gray-700 rounded-md p-2 text-white'
          >
            <option value='' className='bg-gray-400 text-black'>
              Todos
            </option>
            <option value='1' className='bg-gray-400 text-black'>
              Pendiente
            </option>
            <option value='2' className='bg-gray-400 text-black'>
              Cancelada
            </option>
            <option value='3' className='bg-gray-400 text-black'>
              Enviada
            </option>
            <option value='4' className='bg-gray-400 text-black'>
              Finalizada
            </option>
          </select>
        </div>

        <ButtonLayout
          className={'ml-auto'}
          onClick={() => createModalRef.current?.show()}
        >
          Crear Orden de Compra
        </ButtonLayout>
      </div>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
        {filteredOrdenes.map((orden) => (
          <OrdenCard
            key={orden.id_orden_compra}
            orden={orden}
            onClick={handleClickOrden}
          />
        ))}
      </div>
      <Modal modalRef={createModalRef}>
        <CrearOrdenCompra modalRef={createModalRef} />
      </Modal>

      <Modal modalRef={editModalRef}>
        <ModificarOrdenCompra
          orden={ordenSeleccionada}
          onSubmit={handleModificarOrden}
          onCancel={handleCancelarOrden}
        />
      </Modal>
    </>
  )
}

export default ListadoOrdenesCompra
