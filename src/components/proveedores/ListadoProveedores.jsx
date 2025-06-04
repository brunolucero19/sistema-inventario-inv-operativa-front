import { obtenerProveedores } from '../../services/proveedores'
import ButtonLayout from '../ui/ButtonLayout'
import Modal from '../ui/Modal'
import { useFetchData } from '../../hooks/useFetchData'
import { TrashIcon } from 'lucide-react'
import Tabla from '../ui/Tabla'
import { useUpdateKeyStore } from '../../hooks/useStore'
import { useRef } from 'react'
import CrearProveedor from './CrearProveedor'
import { obtenerArticulos } from '../../services/articulos'

const ListadoProveedores = () => {
  const modalRef = useRef()

  const { updateKey } = useUpdateKeyStore()
  const { data: proveedores } = useFetchData(obtenerProveedores, [updateKey])
  const { data: articulos } = useFetchData(obtenerArticulos)

  // Acciones de la tabla de proveedores
  const actions = [
    {
      icon: <TrashIcon className='w-5 h-5 text-red-600' />,
      onClick: (row) => {
        console.log('Eliminar proveedor:', row)
      },
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
    </div>
  )
}
export default ListadoProveedores
