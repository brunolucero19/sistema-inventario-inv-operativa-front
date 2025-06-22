import ButtonLayout from '../ui/ButtonLayout'

export const ModificarArticulo = ({
  articulo,
  setArticulo,
  handleUpdate,
  handleCancel,
}) => {
  if (!articulo) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    handleUpdate()
  }

  return (
    <>
      <h1 className='text-center font-bold uppercase'>Modificar artículo</h1>
      <form
        className='flex flex-col gap-2 my-4'
        id='form-crear-articulo'
        onSubmit={handleSubmit}
      >
        <label htmlFor='descripcion'>Descripción</label>
        <textarea
          id='descripcion'
          name='descripcion'
          value={articulo.descripcion}
          onChange={(e) =>
            setArticulo({ ...articulo, descripcion: e.target.value })
          }
          className='border border-gray-300 rounded-lg p-2'
          required
        />

        <label htmlFor='demanda_articulo'>Demanda Anual</label>
        <input
          type='number'
          id='demanda_articulo'
          name='demanda_articulo'
          value={articulo.demanda_articulo}
          min={1}
          onChange={(e) =>
            setArticulo({ ...articulo, demanda_articulo: e.target.value })
          }
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
          min={1}
          onChange={(e) =>
            setArticulo({ ...articulo, costo_almacenamiento: e.target.value })
          }
          className='border border-gray-300 rounded-lg p-2'
          required
        />

        <label htmlFor='stock'>Stock</label>
        <input
          type='number'
          id='stock'
          name='stock'
          value={articulo.stock}
          min={0}
          onChange={(e) => setArticulo({ ...articulo, stock: e.target.value })}
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
          min={0}
          onChange={(e) =>
            setArticulo({ ...articulo, precioVenta: e.target.value })
          }
          className='border border-gray-300 rounded-lg p-2'
          required
        />

        <label htmlFor='desviacion_est_dem'>
          Desviación Estandar de la Demanda
        </label>
        <input
          type='number'
          id='desviacion_est_dem'
          name='desviacion_est_dem'
          value={articulo.desviacion_est_dem}
          min={0}
          step='any'
          onChange={(e) =>
            setArticulo({ ...articulo, desviacion_est_dem: e.target.value })
          }
          className='border border-gray-300 rounded-lg p-2'
          required
        />

        <div className='flex justify-around mt-4'>
          <ButtonLayout
            onClick={handleCancel}
            className='bg-red-500 hover:bg-red-600'
            type='button'
          >
            Cancelar
          </ButtonLayout>
          <ButtonLayout type='submit'>Modificar artículo</ButtonLayout>
        </div>
      </form>
    </>
  )
}
