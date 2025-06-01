import ButtonLayout from "../ui/ButtonLayout"

export const ModificarArticulo = ({ articulo, setArticulo, handleUpdate }) => {
  if (!articulo) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    handleUpdate()
  }

  return (
    <>
      <h1 className='text-center font-bold uppercase'>Modificar artículo</h1>
      <form className='flex flex-col gap-2 my-4' id='form-crear-articulo' onSubmit={handleSubmit}>

        <label htmlFor='descripcion'>Descripción</label>
        <textarea
          id='descripcion'
          name='descripcion'
          value={articulo.descripcion}
          onChange={e => setArticulo({ ...articulo, descripcion: e.target.value })}
          className='border border-gray-300 rounded-lg p-2'
          required
        />

        <label htmlFor='demanda_articulo'>Demanda mensual</label>
        <input
          type='number'
          id='demanda_articulo'
          name='demanda_articulo'
          value={articulo.demanda_articulo}
          onChange={e => setArticulo({ ...articulo, demanda_articulo: +e.target.value })}
          className='border border-gray-300 rounded-lg p-2'
          required
        />

        <label htmlFor='costo_almacenamiento'>Costo de almacenamiento</label>
        <input
          type='number'
          step='0.01'
          id='costo_almacenamiento'
          name='costo_almacenamiento'
          value={articulo.costo_almacenamiento}
          onChange={e => setArticulo({ ...articulo, costo_almacenamiento: +e.target.value })}
          className='border border-gray-300 rounded-lg p-2'
          required
        />

        <label htmlFor='stock'>Stock inicial</label>
        <input
          type='number'
          id='stock'
          name='stock'
          value={articulo.stock}
          onChange={e => setArticulo({ ...articulo, stock: +e.target.value })}
          className='border border-gray-300 rounded-lg p-2'
          required
        />

        <label htmlFor='precioVenta'>Precio de venta</label>
        <input
          type='number'
          step='0.01'
          id='precioVenta'
          name='precioVenta'
          value={articulo.precioVenta}
          onChange={e => setArticulo({ ...articulo, precioVenta: +e.target.value })}
          className='border border-gray-300 rounded-lg p-2'
          required
        />

        <label htmlFor='stock_seguridad'>Stock de seguridad</label>
        <input
          type='number'
          id='stock_seguridad'
          name='stock_seguridad'
          value={articulo.stock_seguridad}
          onChange={e => setArticulo({ ...articulo, stock_seguridad: +e.target.value })}
          className='border border-gray-300 rounded-lg p-2'
          required
        />

        <label htmlFor='inventario_maximo'>Inventario máximo</label>
        <input
          type='number'
          id='inventario_maximo'
          name='inventario_maximo'
          value={articulo.inventario_maximo}
          onChange={e => setArticulo({ ...articulo, inventario_maximo: +e.target.value })}
          className='border border-gray-300 rounded-lg p-2'
          required
        />

        <div className='flex justify-around mt-4'>
          <ButtonLayout type='submit'>Modificar artículo</ButtonLayout>
        </div>
      </form>
    </>
  )
}
