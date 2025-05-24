const Tabla = ({ headers, data }) => (
  <table className="min-w-full border border-gray-300">
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header} className="border px-4 py-2 bg-gray-100 text-left">
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.length === 0 ? (
        <tr>
          <td colSpan={headers.length} className="text-center py-4">
            No hay datos
          </td>
        </tr>
      ) : (
        data.map((row, i) => (
          <tr key={i} className="hover:bg-gray-50">
            {headers.map((header) => (
              <td key={header} className="border px-4 py-2">
                {row[header]}
              </td>
            ))}
          </tr>
        ))
      )}
    </tbody>
  </table>
);

export default Tabla;
