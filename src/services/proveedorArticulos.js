export const obtenerProveedoresPorArticulo = async (idArticulo) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const url = `${URL}api/proveedorArticulo/obtener-proveedor-articulos/${idArticulo}`

  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await res.json()
  return data
}

export const obtenerArticulosPorProveedor = async (idProveedor) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const url = `${URL}api/proveedorArticulo/obtener-articulos-proveedor?id_proveedor=${idProveedor}`

  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await res.json()
  return data
}

export const actualizarArticuloProveedor = async (data) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const url = `${URL}api/proveedorArticulo/actualizar-proveedor-articulo`

  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  return res
}

export const eliminarArticuloProveedor = async (idArticulo, idProveedor) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const url = `${URL}api/proveedorArticulo/eliminar-proveedor-articulo?id_articulo=${idArticulo}&id_proveedor=${idProveedor}`

  const res = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })

  return res
}

export const crearArticuloProveedor = async (data) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const url = `${URL}api/proveedorArticulo/crear-proveedor-articulo`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  return res
}

export const obtenerCGIPorArticulo = async (idArticulo) => {
  const URL = import.meta.env.VITE_BACKEND_URL
  const url = `${URL}api/proveedorArticulo/obtener-cgi-articulo/${idArticulo}`

  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  const data = await res.json()
  return data
}