import { toast } from 'react-toastify'
import { crearArticulo } from '../../services/crearArticulo'
import ButtonLayout from '../ui/ButtonLayout'
import Modal from '../ui/Modal'

const ListadoArticulos = () => {
  
  const idModal = 'modal-crear-articulo'

  const handleCancel = () => {
    const form = document.getElementById('form-crear-articulo')
    if (form) form.reset()
    const modal = document.getElementById(idModal)
    if (modal) modal.close()
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
    cgi: Number(data.cgi),
    stock_seguridad: Number(data.stock_seguridad),
    inventario_maximo: Number(data.inventario_maximo)
  }

    const response = await crearArticulo(data)

    if (response.ok) {
      form.reset()
      const modal = document.getElementById(idModal)
      if (modal) modal.close()
      toast.success('Artículo creado correctamente')
    } else {
      const error = await response.json()
      toast.error(`Error: ${error.error}`)
    }
  }

  return (
    <div className='w-full'>
      <div className='flex justify-end w-full'>
        <ButtonLayout onClick={() => document.getElementById(idModal).showModal()}>
          Crear artículo
        </ButtonLayout>
        <Modal id={idModal}>
          <h1 className='text-center font-bold uppercase'>Crear artículo</h1>
          <form
            className='flex flex-col gap-2 my-4'
            id='form-crear-articulo'
            onSubmit={handleAddArticulo}
          >
            <label htmlFor='nombre'>Nombre</label>
            <input type='text' id='nombre' name='nombre' className='border border-gray-300 rounded-lg p-2' required />

            <label htmlFor='descripcion'>Descripción</label>
            <textarea id='descripcion' name='descripcion' className='border border-gray-300 rounded-lg p-2' required />

            <label htmlFor='demanda_articulo'>Demanda mensual</label>
            <input type='number' id='demanda_articulo' name='demanda_articulo' className='border border-gray-300 rounded-lg p-2' required />

            <label htmlFor='costo_almacenamiento'>Costo de almacenamiento</label>
            <input type='number' step='0.01' id='costo_almacenamiento' name='costo_almacenamiento' className='border border-gray-300 rounded-lg p-2' required />

            <label htmlFor='stock'>Stock inicial</label>
            <input type='number' id='stock' name='stock' className='border border-gray-300 rounded-lg p-2' required />

            <label htmlFor='precioVenta'>Precio de venta</label>
            <input type='number' step='0.01' id='precioVenta' name='precioVenta' className='border border-gray-300 rounded-lg p-2' required />

            <label htmlFor='cgi'>CGI</label>
            <input type='number' step='0.01' id='cgi' name='cgi' className='border border-gray-300 rounded-lg p-2' required />

            <label htmlFor='stock_seguridad'>Stock de seguridad</label>
            <input type='number' id='stock_seguridad' name='stock_seguridad' className='border border-gray-300 rounded-lg p-2' required />

            <label htmlFor='inventario_maximo'>Inventario máximo</label>
            <input type='number' id='inventario_maximo' name='inventario_maximo' className='border border-gray-300 rounded-lg p-2' required />

            <div className='flex justify-around mt-4'>
              <ButtonLayout onClick={handleCancel} className='bg-red-500 hover:bg-red-600' type='button'>
                Cancelar
              </ButtonLayout>
              <ButtonLayout type='submit'>Crear artículo</ButtonLayout>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default ListadoArticulos
