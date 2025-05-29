import useRenderActions from '../../hooks/useRenderActions'

const Tabla = ({ columns, data, actions }) => {
  const renderActions = useRenderActions(actions)

  return (
    <table className='min-w-full border border-gray-300'>
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
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className='text-center py-4'>
              No hay datos
            </td>
          </tr>
        ) : (
          data.map((row, i) => (
            <tr key={i} className='hover:bg-gray-500'>
              {columns.map((header) => (
                <td key={header} className='border px-4 py-2'>
                  {row[header]}
                </td>
              ))}
              {actions && (
                <td className='px-4 py-2 border flex items-center gap-2'>
                  {renderActions(row)}
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}

export default Tabla
