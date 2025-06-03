import { NavLink } from 'react-router'
import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `transition-colors duration-200 text-blue-700 ${
      isActive ? ' bg-gray-800 ' : 'text-gray-300'
    }`

  const [isOpen, setIsOpen] = useState(false)

  const AbrirSidebar = () => {
    setIsOpen(!isOpen)
  }

  const buttonClass = isOpen
    ? 'text-white bg-gray-800 p-2 hover:bg-gray-700'
    : 'p-2 text-white bg-gray-800 hover:bg-gray-700'

  return (
    <>
      <button
        onClick={AbrirSidebar}
        className={`cursor-pointer ${buttonClass}`}
      >
        {isOpen ? (
          <ChevronLeftIcon size={24} />
        ) : (
          <ChevronRightIcon size={24} />
        )}
      </button>
      {isOpen && (
        <aside
          className={`'bg-gray-900 overflow-y-auto ${
            isOpen ? 'min-w-[250px]' : 'w-0'
          }`}
        >
          <ul className='menu flex flex-col gap-2 text-base'>
            <li>
              <details open>
                <summary>Maestro de artículos</summary>
                <ul className=' border-l border-blue-700'>
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
                      <ul className=' border-l border-blue-700'>
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
                    <NavLink
                      to='/sistema/ajuste-inventario'
                      className={linkClass}
                    >
                      Ajuste de inventario
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details open>
                <summary className='bold'>Proveedores</summary>
                <ul className=' border-l border-blue-700'>
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
                <ul className=' border-l border-blue-700'>
                  <li>
                    <NavLink
                      to='/sistema/ordenes-de-compra'
                      className={linkClass}
                    >
                      Administrar órdenes de compra
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details open>
                <summary>Ventas</summary>
                <ul className=' border-l border-blue-700'>
                  <li>
                    <NavLink to='/sistema/generar-venta' className={linkClass}>
                      Administrar ventas
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </aside>
      )}
    </>
  )
}

export default Sidebar
