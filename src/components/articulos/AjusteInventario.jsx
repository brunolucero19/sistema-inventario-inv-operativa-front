import { Edit, Search } from "lucide-react"
import { useFetchData } from "../../hooks/useFetchData"
import { useSearchFilter } from "../../hooks/useSearchFilter"
import { modificarArticulo, obtenerArticulos } from "../../services/articulos"
import Tabla from "../ui/Tabla"
import { useUpdateKeyStore } from "../../hooks/useStore"
import { useRef, useState } from "react"
import Modal from "../ui/Modal"
import { ModificarStockArticulo } from "./ModificarStockArticulo"
import { toast } from "react-toastify"

const AjusteInventario = () => {
  const modalRef = useRef()
  const [articuloToEdit, setArticuloToEdit] = useState(null)
  const { updateKey, incrementUpdateKey } = useUpdateKeyStore()

  const {
    data: articulos,
    loading,
    error,
  } = useFetchData(obtenerArticulos, [updateKey])

  const { query, setQuery, filteredItems } = useSearchFilter(
    articulos || [],
    'descripcion'
  )

  const onClickEdit = (articulo) => {
    setArticuloToEdit(articulo)
    modalRef.current?.show()
  }

  const actions = [
    {
      icon: <Edit className='w-5 h-5 text-blue-600' />,
      onClick: (row) => {
        onClickEdit(row)
      },
    }
  ]

  const handleUpdateArticulo = async () => {
    try {
      const response = await modificarArticulo(
        articuloToEdit.id_articulo,
        articuloToEdit
      )

      if (response.ok) {
        toast.success('Articulo modificado correctamente')
        modalRef.current?.close()
        incrementUpdateKey()
      } else {
        toast.error('Error al modificar el articuo')
      }
    } catch (error) {
      console.log(error)
      toast.error('Error al modificar el articuo')
    }
  }

  const handleCancel = () => {
    modalRef.current?.close()
    setArticuloToEdit(null)
  }

  if (loading) return <p>Cargando...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <div className="w-full">
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
      <Modal modalRef={modalRef}>
        <ModificarStockArticulo articulo={articuloToEdit} setArticulo={setArticuloToEdit} handleUpdate={handleUpdateArticulo} handleCancel={handleCancel}/>
      </Modal>
      <div className="mt-6">
        <Tabla
          data={filteredItems}
          columns={[
            'id_articulo',
            'descripcion',
            'stock'
          ]}
          actions={actions}
        />
      </div>

    </div>
  )
}
export default AjusteInventario
