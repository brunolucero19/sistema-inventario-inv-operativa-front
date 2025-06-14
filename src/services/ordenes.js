export const crearOc = async (ordencompra) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const url = `${URL}api/ordenCompra/crear-orden-compra`

  const data = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ordencompra),
  })

  return data
}

export const obtenerOrdenesCompra = async () => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const url = `${URL}api/ordenCompra/obtener-ordenes-compra`

  const data = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  const result = await data.json()

  return result
}

