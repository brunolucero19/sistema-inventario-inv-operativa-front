import { Link } from 'react-router'

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive ? ' bg-gray-700 font-bold' : 'text-gray-300'
    }`

  return (
    <aside className='bg-gray-900 overflow-y-auto'>
      <ul className='menu w-80 flex flex-col gap-2 text-base'>
        <li>
          <details open>
            <summary>Maestro de artículos</summary>
            <ul>
              <li>
                <Link to='/sistema/articulos' className={linkClass}>
                  Administrar artículos
                </Link>
              </li>
              <li>
                <Link to='/sistema/calcular-cgi' className={linkClass}>
                  Calcular CGI
                </Link>
              </li>
              <li>
                <details open>
                  <summary>Listados</summary>
                  <ul>
                    <li>
                      <Link
                        to='/sistema/articulos-a-reponer'
                        className={linkClass}
                      >
                        Artículos a reponer
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/sistema/articulos-faltantes'
                        className={linkClass}
                      >
                        Artículos faltantes
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/sistema/proveedores-por-articulo'
                        className={linkClass}
                      >
                        Proveedores por artículo
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <Link to='/sistema/ajuste-inventario' className={linkClass}>
                  Ajuste de inventario
                </Link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary>Proveedores</summary>
            <ul>
              <li>
                <Link to='/sistema/proveedores' className={linkClass}>
                  Administrar proveedores
                </Link>
              </li>
              <li>
                <Link
                  to='/sistema/articulos-por-proveedor'
                  className={linkClass}
                >
                  Listado de artículos por proveedor
                </Link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary>Órdenes de Compra</summary>
            <ul>
              <li>
                <Link to='/sistema/ordenes-de-compra' className={linkClass}>
                  Administrar órdenes de compra
                </Link>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary>Ventas</summary>
            <ul>
              <li>
                <Link to='/sistema/generar-venta' className={linkClass}>
                  Generar venta
                </Link>
              </li>
              <li>
                <Link to='/sistema/listado-ventas' className={linkClass}>
                  Listado de ventas
                </Link>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar
