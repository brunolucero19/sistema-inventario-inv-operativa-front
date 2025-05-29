export const crearVenta = async (venta) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const url = `${URL}api/ventas/crear-venta`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(venta),
  })

  return response
}
