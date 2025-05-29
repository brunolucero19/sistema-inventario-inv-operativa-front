import { toast } from 'react-toastify'
import { crearVenta } from '../../services/ventas'
import ButtonLayout from '../ui/ButtonLayout'
import Modal from '../ui/Modal'
import TrashIcon from '../../../public/icons/TrashIcon'
import ReactDOM from 'react-dom/client'
import { obtenerArticulos } from '../../services/articulos'
import ListadoVentas from './ListadoVentas'

const GenerarVenta = () => {
  const idModal = 'modal-crear-venta'

  const handleCancel = () => {
    const form = document.getElementById('form-crear-venta')
    if (form) {
      form.reset()
    }

    const modal = document.getElementById(idModal)
    if (modal) {
      modal.close()
    }
  }

  const handleAddVenta = async (e) => {
    e.preventDefault()

    const items = []
    const contenedor = document.getElementById('detalle-articulos')
    if (!contenedor) {
      alert('Debes agregar al menos un artículo.')
      return
    }

    const detalles = contenedor.querySelectorAll('div.border') // cada artículo agregado
    for (const detalle of detalles) {
      const select = detalle.querySelector('select')
      const inputCantidad = detalle.querySelector('input[type="number"]')

      const articuloId = parseInt(select.value)
      const cantidad = parseInt(inputCantidad.value)

      if (!articuloId || articuloId === 0 || !cantidad || cantidad <= 0) {
        alert('Completa todos los campos correctamente.')
        return
      }

      items.push({
        articuloId,
        cantidad,
      })
    }

    const venta = { items }

    try {
      const response = await crearVenta(venta)

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Error en la respuesta del servidor:', errorData)
        toast.error('Venta no creada correctamente.')
        return
      }

      toast.success('Venta creada correctamente.')
      document.getElementById('form-crear-venta').reset()
      const detalleArticulos = document.getElementById('detalle-articulos')
      if (detalleArticulos) detalleArticulos.innerHTML = ''
    } catch (error) {
      console.error('Error al crear venta:', error)
      toast.error('Venta no creada correctamente.')
    }
  }

  const handleAddArticulo = async (e) => {
    e.preventDefault()

    const container = document.getElementById('form-crear-venta')

    const detalleVenta = document.createElement('div')
    detalleVenta.className =
      'border border-gray-300 flex flex-col gap-4 p-3 rounded-md bg-gray-800'

    const filaSuperior = document.createElement('div')
    filaSuperior.className = 'flex justify-between items-center'

    const labelArticulo = document.createElement('label')
    labelArticulo.textContent = 'Nombre articulo'

    const trashButton = document.createElement('button')
    trashButton.type = 'button'
    trashButton.className = 'text-red-500 hover:text-red-700'
    trashButton.title = 'Eliminar artículo del detalle'
    trashButton.onclick = () => detalleVenta.remove()

    const reactContainer = document.createElement('div')
    trashButton.appendChild(reactContainer)
    ReactDOM.createRoot(reactContainer).render(
      <TrashIcon className='cursor-pointer' />
    )

    filaSuperior.appendChild(labelArticulo)
    filaSuperior.appendChild(trashButton)

    const select = document.createElement('select')
    select.name = 'articulos'
    select.className = 'border border-gray-300 rounded-md p-2'

    const articulos = await obtenerArticulos()

    const defaultOption = document.createElement('option')
    defaultOption.value = '0'
    defaultOption.textContent = 'Seleccionar artículo...'
    defaultOption.className = 'text-black bg-gray-400'
    select.appendChild(defaultOption)

    articulos.forEach((articulo) => {
      const option = document.createElement('option')
      option.value = articulo.id_articulo
      option.textContent = articulo.nombre
      option.className = 'text-black bg-gray-400'
      select.appendChild(option)
    })

    const labelCantidad = document.createElement('label')
    labelCantidad.textContent = 'Cantidad'

    const inputCantidad = document.createElement('input')
    inputCantidad.type = 'number'
    inputCantidad.className = 'border border-gray-300 rounded-md p-2'

    detalleVenta.appendChild(filaSuperior)
    detalleVenta.appendChild(select)
    detalleVenta.appendChild(labelCantidad)
    detalleVenta.appendChild(inputCantidad)

    const articulosContainer = document.getElementById('detalle-articulos')
    if (!articulosContainer) {
      const nuevoContenedor = document.createElement('div')
      nuevoContenedor.id = 'detalle-articulos'
      nuevoContenedor.className = 'flex flex-col gap-4 max-h-64 overflow-y-auto'
      nuevoContenedor.appendChild(detalleVenta)
      const botonAgregar = container.querySelector('button[type="button"]')
      container.insertBefore(nuevoContenedor, botonAgregar)
    } else {
      articulosContainer.appendChild(detalleVenta)
    }
  }

  return (
    <div>
      <div className='w-full'>
        <div className='flex justify-end w-full'>
          <ButtonLayout
            onClick={() => document.getElementById(idModal).showModal()}
          >
            Crear venta
          </ButtonLayout>
          <Modal id={idModal}>
            <h1 className='text-center font-bold uppercase'>Crear venta</h1>
            <form
              className='flex flex-col gap-2 my-4'
              id='form-crear-venta'
              onSubmit={handleAddVenta}
            >
              <label htmlFor='' className=''>
                Articulos
              </label>
              <ButtonLayout
                className='border border-gray-300 rounded-lg p-2'
                onClick={(e) => handleAddArticulo(e)}
                type='button'
              >
                Agregar articulo
              </ButtonLayout>

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
        </div>
        <ListadoVentas />
      </div>
    </div>
  )
}
export default GenerarVenta
