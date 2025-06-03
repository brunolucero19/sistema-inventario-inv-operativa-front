import { useState } from 'react'
import useRenderActions from '../../hooks/useRenderActions'

const Tabla = ({ columns, data, actions, filaPorPagina = 5 }) => {
  const renderActions = useRenderActions(actions)

  const [pagina, setPagina] = useState(1)

  // Calcular índices de slice para data paginada
  const indexOfLastRow = pagina * filaPorPagina
  const indexOfFirstRow = indexOfLastRow - filaPorPagina
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow)

  // Calcular total de páginas
  const totalPages = Math.ceil(data.length / filaPorPagina)

  // Funciones para cambiar página
  const goToPage = (page) => {
    if (page < 1) page = 1
    else if (page > totalPages) page = totalPages
    setPagina(page)
  }

  return (
    <>
      <table className='border border-gray-300 w-full'>
        <thead>
          <tr>
            {columns.map((header) => (
              <th
                key={header}
                className='border px-4 py-2 bg-gray-700 text-left uppercase'
              >
                {header}
              </th>
            ))}
            {actions && (
              <th className='border px-4 py-2 bg-gray-700 text-left uppercase'>
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {currentRows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className='text-center py-4'
              >
                No hay datos
              </td>
            </tr>
          ) : (
            currentRows.map((row, i) => (
              <tr key={indexOfFirstRow + i} className='hover:bg-gray-500'>
                {columns.map((header) => (
                  <td key={header} className='border px-4 py-2'>
                    {row[header]}
                  </td>
                ))}
                {actions && (
                  <td className='px-4 py-2 border'>{renderActions(row)}</td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className='flex justify-center items-center gap-3 mt-4'>
        <button
          className='px-3 py-1 border rounded disabled:opacity-50'
          disabled={pagina === 1}
          onClick={() => goToPage(pagina - 1)}
        >
          Anterior
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1
          return (
            <button
              key={page}
              className={`px-3 py-1 border rounded ${
                page === pagina ? 'bg-gray-700 text-white' : ''
              }`}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          )
        })}

        <button
          className='px-3 py-1 border rounded disabled:opacity-50'
          disabled={pagina === totalPages}
          onClick={() => goToPage(pagina + 1)}
        >
          Siguiente
        </button>
      </div>
    </>
  )
}

export default Tabla
