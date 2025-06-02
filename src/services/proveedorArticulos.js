export const obtenerProveedoresPorArticulo = async (idArticulo) => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const url = `${URL}api/proveedorArticulo/obtener-proveedor-articulos/${idArticulo}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  return data;
};
