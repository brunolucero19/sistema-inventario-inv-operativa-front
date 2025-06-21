import ButtonLayout from "../ui/ButtonLayout"

export const ModificarStockArticulo = ({ articulo, setArticulo, handleUpdate, handleCancel }) => {

    if (!articulo) return null

    const handleSubmit = (e) => {
        e.preventDefault()
        handleUpdate()
    }

    return (
        <>
            <h1 className='text-center font-bold uppercase'>Modificar stock</h1>
            <form className='flex flex-col gap-2 my-4' onSubmit={handleSubmit}>
                <label htmlFor='stock'>Stock</label>
                <input
                    type='number'
                    id='stock'
                    name='stock'
                    min={0}
                    value={articulo.stock}
                    onChange={e => setArticulo({ ...articulo, stock: +e.target.value })}
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
