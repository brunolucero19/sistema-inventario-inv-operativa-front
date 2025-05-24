export const crearArticulo = async (articulo) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const url = `${URL}api/articulos/crear-articulo`
  console.log(url)

  const data = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(articulo)
  })

  return data
  
}