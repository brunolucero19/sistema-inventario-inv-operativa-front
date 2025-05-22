export const crearOc = async (ordencompra) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const url = `${URL}api/proveedores/crear-ordencompra`

  const data = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(ordencompra)
  })

  return data
  
}