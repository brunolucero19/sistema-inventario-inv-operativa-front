import { Search } from "lucide-react"
import { useFetchData } from "../../hooks/useFetchData"
import { useSearchFilter } from "../../hooks/useSearchFilter"
import { obtenerArticulosAreponer } from "../../services/articulos"
import Tabla from "../ui/Tabla"

const ListadoArticulosAReponer = () => {

  const { data: articulos } = useFetchData(obtenerArticulosAreponer)

  const { query, setQuery, filteredItems } = useSearchFilter(
    articulos || [],
    'descripcion'
  )
  return (
    <div>
      <div className='relative w-64'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500'
          placeholder='Buscar...'
        />
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <Search className='h-5 w-5 text-gray-400' />
        </div>
      </div>
      <div className="mt-6">
        <Tabla data={filteredItems} columns={["id_articulo", "proveedor_predeterminado", "descripcion", "stock", "punto_pedido"]} />
      </div>
    </div>
  )
}
export default ListadoArticulosAReponer
