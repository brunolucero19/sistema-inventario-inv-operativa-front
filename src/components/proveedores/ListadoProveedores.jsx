import { toast } from 'react-toastify'
import { crearProveedor } from '../../services/crearProveedor'
import ButtonLayout from '../ui/ButtonLayout'
import Modal from '../ui/Modal'

const ListadoProveedores = () => {
  const idModal = 'modal-crear-proveedor'

  const handleCancel = () => {
    // Resetear el formulario
    const form = document.getElementById('form-crear-proveedor')
    if (form) {
      form.reset()
    }
    // Cerrar el modal
    const modal = document.getElementById(idModal)
    if (modal) {
      modal.close()
    }
  }

  const handleAddProveedor = async (e) => {
    e.preventDefault()

    // Obtener los valores del formulario
    const form = document.getElementById('form-crear-proveedor')
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    // Crear el proveedor
    const response = await crearProveedor(data)

    if (response.ok) {
      form.reset()
      const modal = document.getElementById(idModal)
      if (modal) {
        modal.close()
      }
      toast.success('Proveedor creado correctamente')
    } else {
      const error = await response.json()
      toast.error(`Error: ${error.error}`)
    }
  }

  return (
    <div className='w-full'>
      <div className='flex justify-end w-full'>
        <ButtonLayout
          onClick={() => document.getElementById(idModal).showModal()}
        >
          Crear proveedor
        </ButtonLayout>
        <Modal id={idModal}>
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
    </div>
  )
}
export default ListadoProveedores
