import { toast } from 'react-toastify'
import { modificarProveedor } from '../../services/proveedores'
import ButtonLayout from '../ui/ButtonLayout'

const ModificarProveedor = ({
  proveedor,
  setProveedor,
  handleUpdate,
  handleCancel,
}) => {
  if (!proveedor) return null

  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = {
      nombre: proveedor.nombre,
      apellido: proveedor.apellido,
      email: proveedor.email,
      telefono: proveedor.telefono || '',
    }
    const idProveedor = proveedor.id_proveedor
    const response = await modificarProveedor(idProveedor, body)
    if (response.ok) {
      toast.success('Proveedor modificado correctamente')
      handleCancel()
      handleUpdate()
    } else {
      toast.error('Error al modificar proveedor')
      return
    }
  }

  return (
    <>
      <h1 className='text-center font-bold uppercase'>Modificar proveedor</h1>
      <form
        className='flex flex-col gap-2 my-4'
        id='form-modificar-proveedor'
        onSubmit={handleSubmit}
      >
        <label htmlFor='nombre'>Nombre</label>
        <input
          type='text'
          id='nombre'
          name='nombre'
          value={proveedor.nombre}
          onChange={(e) =>
            setProveedor({ ...proveedor, nombre: e.target.value })
          }
          className='border border-gray-300 rounded-lg p-2'
          required
        />

        <label htmlFor='apellido'>Apellido</label>
        <input
          type='text'
          id='apellido'
          name='apellido'
          value={proveedor.apellido}
          onChange={(e) =>
            setProveedor({ ...proveedor, apellido: e.target.value })
          }
          className='border border-gray-300 rounded-lg p-2'
          required
        />

        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          value={proveedor.email}
          onChange={(e) =>
            setProveedor({ ...proveedor, email: e.target.value })
          }
          className='border border-gray-300 rounded-lg p-2'
          required
        />

        <label htmlFor='telefono'>Teléfono</label>
        <input
          type='text'
          id='telefono'
          name='telefono'
          value={proveedor.telefono || ''}
          onChange={(e) =>
            setProveedor({ ...proveedor, telefono: e.target.value })
          }
          className='border border-gray-300 rounded-lg p-2'
          placeholder='+54 261 1234567'
        />

        <div className='flex justify-around mt-4'>
          <ButtonLayout
            onClick={handleCancel}
            className='bg-red-500 hover:bg-red-600'
            type='button'
          >
            Cancelar
          </ButtonLayout>
          <ButtonLayout type='submit'>Modificar proveedor</ButtonLayout>
        </div>
      </form>
    </>
  )
}

export default ModificarProveedor
