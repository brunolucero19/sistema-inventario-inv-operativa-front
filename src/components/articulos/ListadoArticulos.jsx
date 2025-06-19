import { toast } from 'react-toastify'
import {
  crearArticulo,
  eliminarArticulo,
  modificarArticulo,
  obtenerArticulos,
} from '../../services/articulos'
import ButtonLayout from '../ui/ButtonLayout'
import Modal from '../ui/Modal'
import { Search, Edit, Trash2, Trash2Icon } from 'lucide-react'
import { useFetchData } from '../../hooks/useFetchData.js'
import { useSearchFilter } from '../../hooks/useSearchFilter.js'
import { useRef, useState } from 'react'
import { useUpdateKeyStore } from '../../hooks/useStore.js'
import { ModificarArticulo } from './ModificarArticulo.jsx'
import Tabla from '../ui/Tabla.jsx'

const ListadoArticulos = () => {
  const modalRef = useRef()
  const editModalRef = useRef()
  const deleteModalRef = useRef()
  const [articuloToEdit, setArticuloToEdit] = useState(null)
  const { updateKey, incrementUpdateKey } = useUpdateKeyStore()

  const handleCancel = () => {
    const form = document.getElementById('form-crear-articulo')
    if (form) form.reset()
    const modal = modalRef.current
    if (modal) modal.close()
  }

  const handleCancelDelete = () => {
    const modal = deleteModalRef.current
    if (modal) modal.close()
  }

  const onClickEdit = (articulo) => {
    setArticuloToEdit(articulo)
    editModalRef.current?.show()
  }

  const onClickDelete = (articulo) => {
    setArticuloToEdit(articulo)
    deleteModalRef.current?.show()
  }

  const handleDeleteArticulo = async () => {
    try {
      const response = await eliminarArticulo(articuloToEdit.id_articulo)
      const data = await response.json()
      if (response.ok) {
        toast.success('Artículo eliminado correctamente')
        deleteModalRef.current?.close()
        incrementUpdateKey()
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      console.log(error)
      toast.error('Error al eliminar el articulo')
    }
  }

  const handleUpdateArticulo = async () => {
    try {
      const response = await modificarArticulo(
        articuloToEdit.id_articulo,
        articuloToEdit
      )

      if (response.ok) {
        toast.success('Articulo modificado correctamente')
        editModalRef.current?.close()
        incrementUpdateKey()
      } else {
        toast.error('Error al modificar el articuo')
      }
    } catch (error) {
      console.log(error)
      toast.error('Error al modificar el articuo')
    }
  }

  const handleCancelEdit = () => {
    editModalRef.current?.close()
    setArticuloToEdit(null)
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
      desviacion_est_dem: Number(data.desviacion_est_dem),
      inventario_maximo: Number(data.inventario_maximo),
    }

    const response = await crearArticulo(data)

    if (response.ok) {
      form.reset()
      const modal = modalRef.current
      if (modal) modal.close()
      toast.success('Artículo creado correctamente')
      incrementUpdateKey()
    } else {
      const error = await response.json()
      toast.error(`Error: ${error.error}`)
    }
  }

  //LEER TODOS
  const {
    data: articulos,
    loading,
    error,
  } = useFetchData(obtenerArticulos, [updateKey])

  // FILTRO DE BUSQUEDA
  const { query, setQuery, filteredItems } = useSearchFilter(
    articulos || [],
    'descripcion'
  )

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error.message}</p>

  // Acciones de la tabla de artículos
  const actions = [
    {
      icon: <Edit className='w-5 h-5 text-blue-600' />,
      onClick: (row) => {
        onClickEdit(row)
      },
    },
    {
      icon: <Trash2Icon className='w-5 h-5 text-red-600' />,
      onClick: (row) => {
        onClickDelete(row)
      },
    },
  ]

  return (
    <div className='w-full'>
      <div className='relative w-64'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500'
          placeholder='Buscar...'
        />
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <Search className='h-5 w-5 text-gray-400' />
        </div>
      </div>

      <div className='flex justify-end w-full'>
        <ButtonLayout onClick={() => modalRef.current?.show()}>
          Crear artículo
        </ButtonLayout>
        <Modal modalRef={modalRef}>
          <h1 className='text-center font-bold uppercase'>Crear artículo</h1>
          <form
            className='flex flex-col gap-2 my-4 h-[80vh] p-1 overflow-y-auto'
            id='form-crear-articulo'
            onSubmit={handleAddArticulo}
          >
            <label htmlFor='descripcion'>Descripción</label>
            <textarea
              id='descripcion'
              name='descripcion'
              className='border border-gray-300 rounded-lg p-2 min-h-10'
              required
            />

            <label htmlFor='demanda_articulo'>Demanda Anual</label>
            <input
              type='number'
              id='demanda_articulo'
              name='demanda_articulo'
              className='border border-gray-300 rounded-lg p-2'
              required
              min={0}
            />

            <label htmlFor='costo_almacenamiento'>
              Costo de almacenamiento
            </label>
            <input
              type='number'
              step='0.01'
              id='costo_almacenamiento'
              name='costo_almacenamiento'
              className='border border-gray-300 rounded-lg p-2'
              required
              min={0}
            />

            <label htmlFor='stock'>Stock inicial</label>
            <input
              type='number'
              id='stock'
              name='stock'
              className='border border-gray-300 rounded-lg p-2'
              required
              min={0}
            />

            <label htmlFor='precioVenta'>Precio de venta</label>
            <input
              type='number'
              step='0.01'
              id='precioVenta'
              name='precioVenta'
              className='border border-gray-300 rounded-lg p-2'
              required
              min={0}
            />

            <label htmlFor='desviacion_est_dem'>Desviación Estandar de la Demanda</label>
            <input
              type='float'
              step="any"
              id='desviacion_est_dem'
              name='desviacion_est_dem'
              className='border border-gray-300 rounded-lg p-2'
              required
              min={0}
            />

            <div className='flex justify-around mt-4'>
              <ButtonLayout
                onClick={handleCancel}
                className='bg-red-500 hover:bg-red-600'
                type='button'
              >
                Cancelar
              </ButtonLayout>
              <ButtonLayout type='submit'>Crear artículo</ButtonLayout>
            </div>
          </form>
        </Modal>

        <Modal modalRef={editModalRef}>
          <ModificarArticulo
            articulo={articuloToEdit}
            setArticulo={setArticuloToEdit}
            handleUpdate={handleUpdateArticulo}
            handleCancel={handleCancelEdit}
          />
        </Modal>

        <Modal modalRef={deleteModalRef}>
          <h1>Eliminar articulo</h1>
          <p>¿Estas seguro de que quieres eliminar el articulo?</p>
          <div className='flex justify-around mt-4'>
            <ButtonLayout
              onClick={handleCancelDelete}
              className='bg-red-500 hover:bg-red-600'
              type='button'
            >
              Cancelar
            </ButtonLayout>
            <ButtonLayout onClick={handleDeleteArticulo}>Eliminar</ButtonLayout>
          </div>
        </Modal>
      </div>
      <div className='overflow-x-auto mt-6'>
        <Tabla
          data={filteredItems}
          columns={[
            'id_articulo',
            'descripcion',
            'stock',
            'precioVenta',
            'demanda_articulo',
            'costo_almacenamiento',
            'desviacion_est_dem'
          ]}
          actions={actions}
        />
      </div>
    </div>
  )
}

export default ListadoArticulos
