import { useEffect, useState } from 'react'
import { SearchBar } from '../ui/SearchBar'
import { useFetchData } from '../../hooks/useFetchData'
import { obtenerProveedoresPorArticulo } from '../../services/proveedorArticulos'
import ButtonLayout from '../ui/ButtonLayout'
import { toast } from 'react-toastify'
import { crearOc, obtenerOcActiva } from '../../services/ordenes'
import { useUpdateKeyStore } from '../../hooks/useStore'
import { obtenerArticulos } from '../../services/articulos'
import { nivelServicioZ } from '../../utils/constants'

export const CrearOrdenCompra = ({ modalRef }) => {
  const [proveedorArticuloSeleccionado, setProveedorArticuloSeleccionado] =
    useState(null)
  const [articuloSeleccionado, setArticuloSeleccionado] = useState(null)
  const [cantidad, setCantidad] = useState(1)
  const [proveedoresArticulo, setProveedoresArticulo] = useState([])
  const { data: articulos } = useFetchData(obtenerArticulos)

  const { incrementUpdateKey } = useUpdateKeyStore()

  const [ordenesActivas, setOrdenesActivas] = useState([])

  const handleChangeSelectArticulo = (id) => {
    const articulo = articulos.find((a) => a.id_articulo === id)
    setProveedorArticuloSeleccionado(null)
    setArticuloSeleccionado(articulo)
    setCantidad(1)
  }

  const handleChangeSelectProveedor = (id) => {
    const proveedorArticulo = proveedoresArticulo.find(
      (pa) => pa.proveedor.id_proveedor === id
    )
    setProveedorArticuloSeleccionado(proveedorArticulo)
  }

  const handleGenerarOrden = async () => {
    if (
      !proveedorArticuloSeleccionado ||
      !articuloSeleccionado ||
      cantidad <= 0
    ) {
      toast.error('Por favor, complete todos los campos correctamente.')
      return
    }

    const response = await crearOc({
      id_proveedor_articulo:
        proveedorArticuloSeleccionado.id_proveedor_articulo,
      cantidad,
    })
    const data = await response.json()

    if (response.ok) {
      if (data.advertencia) {
        toast.warn(data.advertencia)
      }
      toast.success('Orden de compra generada correctamente')
      modalRef.current?.close()
      setProveedorArticuloSeleccionado(null)
      setArticuloSeleccionado(null)
      setCantidad(1)
      setProveedoresArticulo([])
      incrementUpdateKey()
    } else {
      toast.error('Error al generar la orden de compra')
    }
  }

  useEffect(() => {
    if (articuloSeleccionado) {
      obtenerProveedoresPorArticulo(articuloSeleccionado.id_articulo).then(
        (data) => {
          setProveedoresArticulo(data)
        }
      )

      obtenerOcActiva(articuloSeleccionado.id_articulo).then((res) => {
        if (res.ok) {
          res.json().then((ordenes) => {
            if (ordenes.length > 0) {
              toast.info(
                'Ya existe una orden de compra activa para este artículo.'
              )
              setOrdenesActivas(ordenes)
            }
          })
        }
      })
    } else {
      setProveedoresArticulo([])
      setProveedorArticuloSeleccionado(null)
      setOrdenesActivas([])
    }
  }, [articuloSeleccionado])

  useEffect(() => {
    if (proveedoresArticulo.length > 0) {
      setProveedorArticuloSeleccionado(
        proveedoresArticulo.find((pA) => pA.es_predeterminado)
      )
    }
  }, [proveedoresArticulo])

  useEffect(() => {
    if (
      proveedorArticuloSeleccionado &&
      proveedorArticuloSeleccionado.modelo_seleccionado === 'lote_fijo'
    ) {
      setCantidad(
        proveedorArticuloSeleccionado.modeloInventario.lote_optimo || 1
      )
    }
    if (
      proveedorArticuloSeleccionado &&
      proveedorArticuloSeleccionado.modelo_seleccionado === 'intervalo_fijo'
    ) {
      const T = proveedorArticuloSeleccionado.modeloInventario.periodo_revision
      const L = proveedorArticuloSeleccionado.demora_entrega
      const d = articuloSeleccionado.demanda_articulo / 365
      const z = nivelServicioZ[proveedorArticuloSeleccionado.nivel_servicio]
      const desv_rev_entrega = Math.sqrt(
        (T + L) * Math.pow(articuloSeleccionado.desviacion_est_dem, 2)
      )
      const I =
        articuloSeleccionado.stock +
        ordenesActivas.reduce((acc, oc) => acc + oc.cantidad, 0)
      const q = d * (T + L) + z * desv_rev_entrega - I

      setCantidad(Math.round(Math.max(q, 0)))
    }
  }, [proveedorArticuloSeleccionado, articuloSeleccionado, ordenesActivas])

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-xl text-center font-bold'>Generar Orden de Compra</h2>
      <div className='flex h-full flex-col gap-4 mt-4'>
        <SearchBar
          data={articulos}
          placeholder='Buscar articulo...'
          atributo={'descripcion'}
          onClickOpcion={setArticuloSeleccionado}
        />

        <span className='font-semibold'>Seleccione un Articulo</span>
        <select
          value={articuloSeleccionado ? articuloSeleccionado.id_articulo : '0'}
          onChange={(e) => handleChangeSelectArticulo(+e.target.value)}
          className='border border-gray-300 rounded-md p-2 text-white'
        >
          <option value='0' className='bg-gray-400 text-black'>
            Seleccionar Articulo...
          </option>
          {articulos.map((articulo) => (
            <option
              key={articulo.id_articulo}
              value={articulo.id_articulo}
              className='bg-gray-400 text-black'
            >
              {articulo.descripcion}
            </option>
          ))}
        </select>

        {proveedoresArticulo.length > 0 ? (
          <div className='mt-4 flex flex-col gap-4 border border-gray-300 rounded p-4'>
            <span className='font-semibold'>Seleccione un Proveedor</span>

            <select
              value={
                proveedorArticuloSeleccionado
                  ? proveedorArticuloSeleccionado.id_proveedor
                  : '0'
              }
              onChange={(e) => handleChangeSelectProveedor(+e.target.value)}
              className='border border-gray-300 rounded-md p-2 text-white'
            >
              <option value='0' className='bg-gray-400 text-black'>
                Seleccionar Proveedor...
              </option>
              {proveedoresArticulo.map((pA) => (
                <option
                  key={pA.proveedor.id_proveedor}
                  value={pA.proveedor.id_proveedor}
                  className='bg-gray-400 text-black'
                >
                  {pA.proveedor.nombre} {pA.proveedor.apellido}
                </option>
              ))}
            </select>
            <p>
              <span className='font-semibold'>Proveedor Predeterminado:</span>{' '}
              {proveedoresArticulo.find((pA) => pA.es_predeterminado)?.proveedor
                .nombre +
                ' ' +
                proveedoresArticulo.find((pA) => pA.es_predeterminado)
                  ?.proveedor.apellido}
            </p>

            {proveedorArticuloSeleccionado && (
              <>
                <div className='flex flex-col gap-2 mt-4'>
                  <label>Cantidad</label>
                  <input
                    type='number'
                    className={`border rounded-md p-2 'border-gray-300'}`}
                    value={cantidad}
                    onChange={(e) => setCantidad(+e.target.value)}
                    min={1}
                  />
                  {proveedorArticuloSeleccionado.modelo_seleccionado ===
                  'lote_fijo' ? (
                    <p>
                      <span className='font-semibold'>
                        Cantidad recomendada por modelo de lote fijo:
                      </span>{' '}
                      {
                        proveedorArticuloSeleccionado.modeloInventario
                          .lote_optimo
                      }
                    </p>
                  ) : (
                    <p>
                      <span className='font-semibold'>
                        Cantidad recomendada por modelo de intervalo fijo:
                      </span>{' '}
                      {cantidad}
                    </p>
                  )}
                </div>
                <div>
                  <p className='text-white mt-2'>
                    Precio Unitario: $
                    {proveedorArticuloSeleccionado.precio_unitario}
                  </p>

                  <p className='text-white font-bold mt-2'>
                    Total: $
                    {proveedorArticuloSeleccionado.precio_unitario * cantidad}
                  </p>
                </div>
              </>
            )}
          </div>
        ) : (
          articuloSeleccionado && (
            <p className='text-gray-500'>
              No hay proveedores disponibles para este artículo.
            </p>
          )
        )}
      </div>
      <ButtonLayout type='button' onClick={handleGenerarOrden}>
        Generar Orden
      </ButtonLayout>
    </div>
  )
}
