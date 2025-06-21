export const crearArticulo = async (articulo) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const url = `${URL}api/articulos/crear-articulo`
  console.log(url)

  const data = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(articulo)
  })

  return data

}

export const obtenerArticulo = async (id) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const url = `${URL}api/articulos/leer-articulo/${id}`

  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await response.json()

  return data
}

export const obtenerArticulos = async () => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const url = `${URL}api/articulos/leer-articulos`

  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await response.json()

  return data
}

export const modificarArticulo = async (idArticulo, articuloModificado) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const url = `${URL}api/articulos/modificar-articulo/${idArticulo}`

  const response = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(articuloModificado)
  })

  return response
}

export const eliminarArticulo = async (idArticulo) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const url = `${URL}api/articulos/eliminar-articulo/${idArticulo}`

  const response = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })

  return response
}

export const obtenerArticulosAreponer = async () => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const url = `${URL}api/articulos/obtener-proveedores-articulos-a-reponer`

  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await response.json()

  return data
}