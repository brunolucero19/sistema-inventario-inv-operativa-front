export const crearProveedor = async (proveedor) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const url = `${URL}api/proveedores/crear-proveedor`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(proveedor),
  })

  return response
}

export const obtenerProveedores = async () => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const url = `${URL}api/proveedores/obtener-proveedores`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()

  return data
}
