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

export const obtenerVentas = async () => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const url = `${URL}api/ventas/obtener-ventas`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    }
  })

  return  await response.json()
}
