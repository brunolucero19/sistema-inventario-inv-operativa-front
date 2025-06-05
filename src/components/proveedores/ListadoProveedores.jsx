import {
  eliminarProveedor,
  obtenerProveedores,
} from '../../services/proveedores'
import ButtonLayout from '../ui/ButtonLayout'
import Modal from '../ui/Modal'
import { useFetchData } from '../../hooks/useFetchData'
import { TrashIcon } from 'lucide-react'
import Tabla from '../ui/Tabla'
import { useUpdateKeyStore } from '../../hooks/useStore'
import { useRef, useState } from 'react'
import CrearProveedor from './CrearProveedor'
import { obtenerArticulos } from '../../services/articulos'
import { toast } from 'react-toastify'

const ListadoProveedores = () => {
  const modalRef = useRef()
  const modalEliminarProveedorRef = useRef()

  const { updateKey, incrementUpdateKey } = useUpdateKeyStore()
  const { data: proveedores } = useFetchData(obtenerProveedores, [updateKey])
  const { data: articulos } = useFetchData(obtenerArticulos)

  const [proveedorAEliminar, setProveedorAEliminar] = useState(null)

  const abrirModalEliminarProveedor = (row) => {
    setProveedorAEliminar(row)
    modalEliminarProveedorRef.current?.showModal()
  }

  const cerrarModalEliminarProveedor = () => {
    modalEliminarProveedorRef.current?.close()
    setProveedorAEliminar(null)
  }

  const eliminarProveedorSeleccionado = async () => {
    if (!proveedorAEliminar) {
      toast.error('No se ha seleccionado ningún proveedor para eliminar')
      return
    }
    const { id_proveedor } = proveedorAEliminar

    const response = await eliminarProveedor(id_proveedor)
    if (response.ok) {
      cerrarModalEliminarProveedor()
      toast.success('Proveedor eliminado correctamente')
      incrementUpdateKey()
    } else {
      const { error } = await response.json()
      toast.error(`Error al eliminar proveedor: ${error.message}`)
    }
  }

  // Acciones de la tabla de proveedores
  const actions = [
    {
      icon: <TrashIcon className='w-5 h-5 text-red-600' />,
      onClick: (row) => abrirModalEliminarProveedor(row),
    },
  ]

  return (
    <div className='w-full'>
      <div className='flex justify-end w-full mb-4'>
        {articulos && articulos.length > 0 ? (
          <>
            <ButtonLayout onClick={() => modalRef.current?.showModal()}>
              Crear proveedor
            </ButtonLayout>
            <CrearProveedor modalRef={modalRef} />
          </>
        ) : (
          <p>Debe crear al menos un artículo antes de crear un proveedor</p>
        )}
      </div>
      <Tabla
        columns={['id_proveedor', 'nombre', 'apellido', 'email', 'telefono']}
        data={proveedores}
        actions={actions}
        filaPorPagina={8}
      />
      <Modal modalRef={modalEliminarProveedorRef}>
        <h2 className='text-xl font-bold mb-4 text-center'>
          Eliminar Proveedor
        </h2>
        <p>
          ¿Estás seguro de que deseas eliminar al proveedor{' '}
          <span className='font-bold'>
            {`${proveedorAEliminar?.nombre} ${proveedorAEliminar?.apellido}`}
          </span>
          ?
        </p>
        <div className='flex justify-between mt-4'>
          <ButtonLayout onClick={cerrarModalEliminarProveedor}>
            Cancelar
          </ButtonLayout>
          <ButtonLayout
            onClick={eliminarProveedorSeleccionado}
            className='bg-red-600 hover:bg-red-700'
          >
            Eliminar
          </ButtonLayout>
        </div>
      </Modal>
    </div>
  )
}
export default ListadoProveedores
