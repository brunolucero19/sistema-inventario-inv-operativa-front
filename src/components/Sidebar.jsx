import { NavLink } from 'react-router'

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
                <NavLink to='/sistema/articulos' className={linkClass}>
                  Administrar artículos
                </NavLink>
              </li>
              <li>
                <NavLink to='/sistema/calcular-cgi' className={linkClass}>
                  Calcular CGI
                </NavLink>
              </li>
              <li>
                <details open>
                  <summary>Listados</summary>
                  <ul>
                    <li>
                      <NavLink
                        to='/sistema/articulos-a-reponer'
                        className={linkClass}
                      >
                        Artículos a reponer
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/sistema/articulos-faltantes'
                        className={linkClass}
                      >
                        Artículos faltantes
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/sistema/proveedores-por-articulo'
                        className={linkClass}
                      >
                        Proveedores por artículo
                      </NavLink>
                    </li>
                  </ul>
                </details>
              </li>
              <li>
                <NavLink to='/sistema/ajuste-inventario' className={linkClass}>
                  Ajuste de inventario
                </NavLink>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary>Proveedores</summary>
            <ul>
              <li>
                <NavLink to='/sistema/proveedores' className={linkClass}>
                  Administrar proveedores
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/sistema/articulos-por-proveedor'
                  className={linkClass}
                >
                  Listado de artículos por proveedor
                </NavLink>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary>Órdenes de Compra</summary>
            <ul>
              <li>
                <NavLink to='/sistema/ordenes-de-compra' className={linkClass}>
                  Administrar órdenes de compra
                </NavLink>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary>Ventas</summary>
            <ul>
              <li>
                <NavLink to='/sistema/generar-venta' className={linkClass}>
                  Generar venta
                </NavLink>
              </li>
              <li>
                <NavLink to='/sistema/listado-ventas' className={linkClass}>
                  Listado de ventas
                </NavLink>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar
