import { obtenerProveedores } from '../../services/proveedores'
import { useFetchData } from '../../hooks/useFetchData'
import { useEffect, useState } from 'react'
import { obtenerArticulosPorProveedor } from '../../services/proveedorArticulos'
import Tabla from '../ui/Tabla'

const ListadoArticulosXProveedor = () => {
  const { data: proveedores } = useFetchData(obtenerProveedores)

  const [proveedorSeleccionado, setProveedorSeleccionado] = useState('')

  const { data: articulosPorProveedor } = useFetchData(
    proveedorSeleccionado ? obtenerArticulosPorProveedor : null,
    [proveedorSeleccionado]
  )

  const [mappedArticulos, setMappedArticulos] = useState([])

  useEffect(() => {
    if (articulosPorProveedor && articulosPorProveedor.length > 0) {
      setMappedArticulos(
        articulosPorProveedor.map((item) => ({
          id_articulo: item.id_articulo,
          descripcion: item.articulo.descripcion,
          precio_unitario: item.precio_unitario,
          demora_entrega: item.demora_entrega,
          costo_pedido: item.costo_pedido,
          costo_compra: item.costo_compra,
          es_predeterminado: item.es_predeterminado ? 'Sí' : 'No',
          modelo_seleccionado:
            item.modelo_seleccionado === 'lote_fijo'
              ? 'Lote Fijo'
              : 'Intervalo Fijo',
        }))
      )
    }
  }, [articulosPorProveedor])

  return (
    <div>
      <h1 className='text-center uppercase text-xl font-bold mb-4'>
        Listado de artículos por proveedor
      </h1>
      <div className='flex items-center gap-2 mb-4'>
        <label htmlFor='proveedorSeleccionado'>Proveedor: </label>
        <select
          id='proveedorSeleccionado'
          value={proveedorSeleccionado}
          onChange={(e) => setProveedorSeleccionado(Number(e.target.value))}
          className='border p-2 rounded bg-gray-800'
        >
          <option value=''>Seleccione un proveedor</option>
          {proveedores && proveedores.length > 0 ? (
            proveedores.map((proveedor) => (
              <option
                key={proveedor.id_proveedor}
                value={proveedor.id_proveedor}
              >
                {`${proveedor.nombre} ${proveedor.apellido}`}
              </option>
            ))
          ) : (
            <option value=''>No hay proveedores disponibles</option>
          )}
        </select>
      </div>
      <Tabla
        data={mappedArticulos}
        filaPorPagina={8}
        columns={[
          'id_articulo',
          'descripcion',
          'precio_unitario',
          'demora_entrega',
          'costo_pedido',
          'costo_compra',
          'es_predeterminado',
          'modelo_seleccionado',
        ]}
      />
    </div>
  )
}
export default ListadoArticulosXProveedor
