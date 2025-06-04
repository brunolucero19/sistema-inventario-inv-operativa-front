import { useUpdateKeyStore } from '../../hooks/useStore'
import { toast } from 'react-toastify'
import { crearProveedor } from '../../services/proveedores'
import ButtonLayout from '../ui/ButtonLayout'
import Modal from '../ui/Modal'
import { useFetchData } from '../../hooks/useFetchData'
import { obtenerArticulos } from '../../services/articulos'
import { useState } from 'react'

const CrearProveedor = ({ modalRef }) => {
  const { incrementUpdateKey } = useUpdateKeyStore()

  const { data: articulos } = useFetchData(obtenerArticulos)

  const [articulosSeleccionados, setArticulosSeleccionados] = useState([])

  console.log(articulos)

  const handleCancel = () => {
    // Resetear el formulario
    const form = document.getElementById('form-crear-proveedor')
    if (form) {
      form.reset()
    }
    // Cerrar el modal
    modalRef.current?.close()
    // Limpiar los artículos seleccionados
    setArticulosSeleccionados([])
  }

  const handleAddArticulo = () => {
    setArticulosSeleccionados((prev) => [
      ...prev,
      {
        id_articulo: 0,
        precio_unitario: 0,
        demora_entrega: 0,
        costo_pedido: 0,
        costo_compra: 0,
        modelo_seleccionado: '',
        es_predeterminado: false,
      },
    ])
  }

  console.log(articulosSeleccionados)

  const handleRemoveArticulo = (index) => {
    setArticulosSeleccionados((prev) => prev.filter((_, i) => i !== index))
  }

  const handleArticuloChange = (index, field, value) => {
    console.log(value)
    console.log(field)

    setArticulosSeleccionados((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    )
  }

  const handleAddProveedor = async (e) => {
    e.preventDefault()

    // Obtener los valores del formulario
    const form = document.getElementById('form-crear-proveedor')
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    // Validar que se haya seleccionado al menos un artículo
    if (articulosSeleccionados.length === 0) {
      toast.error('Se debe agregar al menos un artículo.')
      return
    }

    // Validar que no haya artículos vacíos o repetidos
    const ids = articulosSeleccionados.map((a) => a.id_articulo)
    const hasDuplicates = new Set(ids).size !== ids.length
    const hasEmptyFields = articulosSeleccionados.some(
      (a) =>
        !a.id_articulo ||
        !a.precio_unitario ||
        !a.demora_entrega ||
        !a.modelo_seleccionado
    )

    if (hasDuplicates) {
      toast.error('No se pueden repetir artículos.')
      return
    }

    if (hasEmptyFields) {
      toast.error('Se deben completar todos los campos de los artículos.')
      return
    }

    // Convertir a número los campos numéricos
    articulosSeleccionados.forEach((art) => {
      art.precio_unitario = parseFloat(art.precio_unitario) || 0
      art.demora_entrega = parseInt(art.demora_entrega) || 0
      art.costo_pedido = parseFloat(art.costo_pedido) || 0
      art.costo_compra = parseFloat(art.costo_compra) || 0
      art.id_articulo = parseInt(art.id_articulo) || 0
    })

    data.articulos = articulosSeleccionados

    // Crear el proveedor
    const response = await crearProveedor(data)

    if (response.ok) {
      form.reset()
      setArticulosSeleccionados([]) // Limpiar los artículos seleccionados
      modalRef.current?.close()
      incrementUpdateKey() // Actualizar la clave para forzar la recarga de datos
      toast.success('Proveedor creado correctamente')
    } else {
      const error = await response.json()
      toast.error(`Error: ${error.error}`)
    }
  }

  return (
    <Modal modalRef={modalRef}>
      <h1 className='text-center font-bold uppercase'>Crear proveedor</h1>
      <form
        className='flex flex-col gap-2 my-4'
        id='form-crear-proveedor'
        onSubmit={handleAddProveedor}
      >
        <label htmlFor='nombre'>Nombre</label>
        <input
          type='text'
          id='nombre'
          name='nombre'
          className='border border-gray-300 rounded-lg p-2'
          required
        />
        <label htmlFor='apellido'>Apellido</label>
        <input
          type='text'
          id='apellido'
          name='apellido'
          className='border border-gray-300 rounded-lg p-2'
          required
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          className='border border-gray-300 rounded-lg p-2'
          required
        />
        <label htmlFor='telefono'>Teléfono</label>
        <input
          type='text'
          id='telefono'
          name='telefono'
          className='border border-gray-300 rounded-lg p-2'
        />
        {/* Sección de artículos */}
        <div className='mt-4'>
          <div className='flex justify-between items-center'>
            <h2 className='font-semibold'>Artículos que provee</h2>
            <button
              type='button'
              onClick={handleAddArticulo}
              className='text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 cursor-pointer'
            >
              + Agregar artículo
            </button>
          </div>

          {articulosSeleccionados.map((art, index) => (
            <div
              key={index}
              className='border p-3 mt-2 rounded-md bg-transparent space-y-2'
            >
              <div className='flex gap-2 items-center'>
                <label className='w-28'>Artículo</label>
                <select
                  className='flex-1 border rounded p-1 bg-gray-800 text-white'
                  value={art.id_articulo}
                  onChange={(e) =>
                    handleArticuloChange(index, 'id_articulo', e.target.value)
                  }
                >
                  <option value=''>Seleccionar</option>
                  {articulos?.map((a) => (
                    <option
                      key={a.id_articulo}
                      value={a.id_articulo}
                      disabled={articulosSeleccionados.some(
                        (sel, i) =>
                          sel.id_articulo === String(a.id_articulo) &&
                          i !== index
                      )}
                    >
                      {a.descripcion}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex gap-2 items-center'>
                <label className='w-28'>Precio unit.</label>
                <input
                  type='number'
                  className='flex-1 border rounded p-1'
                  value={art.precio_unitario}
                  onChange={(e) =>
                    handleArticuloChange(
                      index,
                      'precio_unitario',
                      e.target.value
                    )
                  }
                  min={0}
                />
              </div>
              <div className='flex gap-2 items-center'>
                <label className='w-28'>Tiempo entrega</label>
                <input
                  type='number'
                  className='flex-1 border rounded p-1'
                  value={art.demora_entrega}
                  onChange={(e) =>
                    handleArticuloChange(
                      index,
                      'demora_entrega',
                      e.target.value
                    )
                  }
                  min={0}
                />
              </div>
              <div className='flex gap-2 items-center'>
                <label className='w-28'>Costo pedido</label>
                <input
                  type='number'
                  className='flex-1 border rounded p-1'
                  value={art.costo_pedido}
                  onChange={(e) =>
                    handleArticuloChange(index, 'costo_pedido', e.target.value)
                  }
                  min={0}
                />
              </div>
              <div className='flex gap-2 items-center'>
                <label className='w-28'>Costo compra</label>
                <input
                  type='number'
                  className='flex-1 border rounded p-1'
                  value={art.costo_compra}
                  onChange={(e) =>
                    handleArticuloChange(index, 'costo_compra', e.target.value)
                  }
                  min={0}
                />
              </div>
              <div className='flex gap-4 items-center'>
                <label className=''>¿Es el proveedor predeterminado?</label>
                <input
                  type='checkbox'
                  checked={art.es_predeterminado}
                  value={art.es_predeterminado}
                  onChange={(e) =>
                    handleArticuloChange(
                      index,
                      'es_predeterminado',
                      e.target.checked
                    )
                  }
                />
              </div>
              <div className='flex gap-2 items-center'>
                <label className='w-28'>Modelo de inventario</label>
                <select
                  className='flex-1 border rounded p-1 bg-gray-800 text-white'
                  value={art.modelo_seleccionado}
                  onChange={(e) =>
                    handleArticuloChange(
                      index,
                      'modelo_seleccionado',
                      e.target.value
                    )
                  }
                >
                  <option value=''>Seleccionar</option>
                  <option value='lote_fijo'>Lote Fijo</option>
                  <option value='intervalo_fijo'>Intervalo Fijo</option>
                </select>
              </div>
              <div className='flex justify-end'>
                <button
                  type='button'
                  onClick={() => handleRemoveArticulo(index)}
                  className='text-white p-2 rounded-lg cursor-pointer bg-red-400 text-sm hover:underline'
                >
                  Eliminar artículo
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className='flex justify-around mt-4'>
          <ButtonLayout
            onClick={handleCancel}
            className='bg-red-500 hover:bg-red-600'
            type={'button'}
          >
            Cancelar
          </ButtonLayout>
          <ButtonLayout type={'submit'}>Guardar cambios</ButtonLayout>
        </div>
      </form>
    </Modal>
  )
}

export default CrearProveedor
