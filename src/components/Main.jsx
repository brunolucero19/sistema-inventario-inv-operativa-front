import { Route, Routes } from 'react-router'
import ListadoArticulos from './articulos/ListadoArticulos'
import CalcularCGI from './articulos/CalcularCGI'
import ListadoArticulosAReponer from './articulos/ListadoArticulosAReponer'
import ListadoArticulosFaltantes from './articulos/ListadoArticulosFaltantes'
import ListadoProveedoresXArticulo from './articulos/ListadoProveedoresXArticulo'
import AjusteInventario from './articulos/AjusteInventario'
import ListadoProveedores from './proveedores/ListadoProveedores'
import ListadoArticulosXProveedor from './proveedores/ListadoArticulosXProveedor'
import ListadoOrdenesCompra from './ordenes/ListadoOrdenesCompra'
import GenerarVenta from './ventas/GenerarVenta'
import ListadoVentas from './ventas/ListadoVentas'

const Main = () => {
  return (
    <main className='p-4 w-full'>
      <Routes>
        <Route path='/articulos' element={<ListadoArticulos />} />
        <Route path='/calcular-cgi' element={<CalcularCGI />} />
        <Route
          path='/articulos-a-reponer'
          element={<ListadoArticulosAReponer />}
        />
        <Route
          path='/articulos-faltantes'
          element={<ListadoArticulosFaltantes />}
        />
        <Route
          path='/proveedores-por-articulo'
          element={<ListadoProveedoresXArticulo />}
        />
        <Route path='/ajuste-inventario' element={<AjusteInventario />} />
        <Route path='/proveedores' element={<ListadoProveedores />} />
        <Route
          path='/articulos-por-proveedor'
          element={<ListadoArticulosXProveedor />}
        />
        <Route path='/ordenes-de-compra' element={<ListadoOrdenesCompra />} />
        <Route path='/generar-venta' element={<GenerarVenta />} />
        <Route path='/listado-ventas' element={<ListadoVentas />} />
      </Routes>
    </main>
  )
}

export default Main
