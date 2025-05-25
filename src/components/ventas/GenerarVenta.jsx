import { toast } from 'react-toastify'
import { crearVenta } from '../../services/crearVenta'
import ButtonLayout from '../ui/ButtonLayout'
import Modal from '../ui/Modal'

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
  
      const form = document.getElementById('form-crear-venta')
      const formData = new FormData(form)
      const data = Object.fromEntries(formData.entries())
  
      const response = await crearVenta(data)
  
      if (response.ok) {
        form.reset()
        const modal = document.getElementById(idModal)
        if (modal) {
          modal.close()
        }
        toast.success('Venta creada correctamente')
      } else {
        const error = await response.json()
        toast.error(`Error: ${error.error}`)
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
              <label htmlFor='nombre'>Cliente</label>
              <input
                type='text'
                id='nombre'
                name='nombre'
                className='border border-gray-300 rounded-lg p-2'
                required
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
    </div>
  )
}
export default GenerarVenta
