import { useFetchData } from '../../hooks/useFetchData'
import { useEffect, useRef, useState } from 'react'
import { useUpdateKeyStore } from '../../hooks/useStore'
import { obtenerProveedores } from '../../services/proveedores'
import {
  actualizarArticuloProveedor,
  crearArticuloProveedor,
  eliminarArticuloProveedor,
  obtenerArticulosPorProveedor,
} from '../../services/proveedorArticulos'
import ButtonLayout from '../ui/ButtonLayout'
import Tabla from '../ui/Tabla'
import Modal from '../ui/Modal'
import { Edit, Trash, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { obtenerArticulos } from '../../services/articulos'

const ListadoArticulosXProveedor = () => {
  const { updateKey, incrementUpdateKey } = useUpdateKeyStore()

  const { data: proveedores } = useFetchData(obtenerProveedores)
  const { data: articulos } = useFetchData(obtenerArticulos)

  const [proveedorSeleccionado, setProveedorSeleccionado] = useState('')

  const { data: articulosPorProveedor } = useFetchData(
    proveedorSeleccionado ? obtenerArticulosPorProveedor : null,
    [proveedorSeleccionado, updateKey]
  )

  const [mappedArticulos, setMappedArticulos] = useState([])

  useEffect(() => {
    if (articulosPorProveedor.length === 0) {
      setMappedArticulos([])
      return
    }
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
          nivel_servicio: item.nivel_servicio,
          modelo_seleccionado:
            item.modelo_seleccionado === 'lote_fijo'
              ? 'Lote Fijo'
              : 'Intervalo Fijo',
          periodo_revision: item.modeloInventario?.periodo_revision || null,
        }))
      )
    }
  }, [articulosPorProveedor])

  const modalActualizarArticuloRef = useRef()
  const modalEliminarArticuloRef = useRef()
  const modalAgregarArticuloRef = useRef()

  const [articuloSeleccionado, setArticuloSeleccionado] = useState(null)
  const [articulosAgregables, setArticulosAgregables] = useState([])
  const [modeloSeleccionado, setModeloSeleccionado] = useState('')

  useEffect(() => {
    if (articuloSeleccionado) {
      setModeloSeleccionado(articuloSeleccionado.modelo_seleccionado)
    } else {
      setModeloSeleccionado('')
    }
  }, [articuloSeleccionado])

  const abrirModalEditarArticulo = (articulo) => {
    setArticuloSeleccionado(articulo)
    modalActualizarArticuloRef.current?.show()
  }

  const cerrarModalEditarArticulo = () => {
    // Cerrar el modal
    modalActualizarArticuloRef.current?.close()
    // Limpiar los artículos seleccionados
    setArticuloSeleccionado(null)
  }

  const actualizarArticuloSeleccionado = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const esPredeterminadoRaw = formData.get('es_predeterminado')
    const modeloSeleccionadoRaw = formData.get('modelo_seleccionado')

    const articuloModificado = {
      id_articulo: articuloSeleccionado.id_articulo,
      es_predeterminado: esPredeterminadoRaw === 'Sí',
      modelo_seleccionado:
        modeloSeleccionadoRaw === 'Lote Fijo' ? 'lote_fijo' : 'intervalo_fijo',
      precio_unitario: parseFloat(formData.get('precio_unitario')),
      demora_entrega: parseInt(formData.get('demora_entrega')),
      nivel_servicio: parseInt(formData.get('nivel_servicio')),
      costo_pedido: parseFloat(formData.get('costo_pedido')),
      id_proveedor: proveedorSeleccionado,
    }

    if (modeloSeleccionadoRaw === 'Intervalo Fijo') {
      const periodoRevision = formData.get('periodo_revision')
      articuloModificado.periodo_revision = periodoRevision
        ? parseInt(periodoRevision)
        : null
    }

    const response = await actualizarArticuloProveedor(articuloModificado)
    if (response.ok) {
      toast.success('Artículo actualizado correctamente')
      incrementUpdateKey()
      cerrarModalEditarArticulo()
    } else {
      const data = await response.json()
      toast.error(data.error || 'Error al actualizar el artículo')
    }
  }

  const abrirModalEliminarArticulo = (articulo) => {
    setArticuloSeleccionado(articulo)
    modalEliminarArticuloRef.current?.show()
  }

  const cerrarModalEliminarArticulo = () => {
    modalEliminarArticuloRef.current?.close()
    setArticuloSeleccionado(null)
  }

  const eliminarArticuloSeleccionado = async () => {
    if (!articuloSeleccionado) return
    const response = await eliminarArticuloProveedor(
      articuloSeleccionado.id_articulo,
      proveedorSeleccionado
    )
    if (response.ok) {
      toast.success('Relación eliminada correctamente')
      incrementUpdateKey()
      cerrarModalEliminarArticulo()
    } else {
      const data = await response.json()
      toast.error(data.error || 'Error al eliminar la relación')
    }
  }

  const abrirModalAgregarArticulo = () => {
    modalAgregarArticuloRef.current?.show()
    // Obtener los artículos que no están asociados al proveedor seleccionado
    const articulosAsociados = articulosPorProveedor.map(
      (item) => item.id_articulo
    )
    const articulosDisponibles = articulos.filter(
      (articulo) => !articulosAsociados.includes(articulo.id_articulo)
    )
    setArticulosAgregables(articulosDisponibles)
  }

  const cerrarModalAgregarArticulo = () => {
    // Resetear el formulario
    document.getElementById('form-agregar-articulo').reset()
    setArticulosAgregables([])
    modalAgregarArticuloRef.current?.close()
  }

  const agregarArticuloProveedor = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const articuloSeleccionado = formData.get('articulo_a_agregar')
    const modeloInventario = formData.get('modelo_seleccionado')
    const opcionEsPredeterminado = formData.get('es_predeterminado')

    if (!proveedorSeleccionado) {
      toast.error('Debe seleccionar un proveedor')
      return
    }

    if (!articuloSeleccionado) {
      toast.error('Debe seleccionar un artículo para agregar')
      return
    }

    if (!modeloInventario) {
      toast.error('Debe seleccionar un modelo de inventario')
      return
    }

    if (opcionEsPredeterminado === '') {
      toast.error('Debe seleccionar si el proveedor es predeterminado')
      return
    }

    const nuevoArticulo = {
      id_articulo: parseInt(articuloSeleccionado),
      id_proveedor: proveedorSeleccionado,
      es_predeterminado: formData.get('es_predeterminado') === 'true',
      modelo_seleccionado:
        modeloInventario === 'Lote Fijo' ? 'lote_fijo' : 'intervalo_fijo',
      precio_unitario: parseFloat(formData.get('precio_unitario')),
      demora_entrega: parseInt(formData.get('demora_entrega')),
      nivel_servicio: parseInt(formData.get('nivel_servicio')),
      costo_pedido: parseFloat(formData.get('costo_pedido')),
    }

    if (modeloInventario === 'Intervalo Fijo') {
      const periodoRevision = formData.get('periodo_revision')
      nuevoArticulo.periodo_revision = periodoRevision
        ? parseInt(periodoRevision)
        : null
    }
    const response = await crearArticuloProveedor(nuevoArticulo)
    if (response.ok) {
      const { predeterminado_por_defecto } = await response.json()
      toast.success('Relación agregada correctamente')
      incrementUpdateKey()
      cerrarModalAgregarArticulo()
      if (predeterminado_por_defecto) {
        toast.info(
          'El proveedor ha sido marcado como predeterminado debido a que es el primer proveedor registrado para éste artículo.'
        )
      }
    } else {
      const data = await response.json()
      toast.error(data.error || 'Error al agregar la relación')
    }
  }

  const acciones = [
    {
      icon: <Edit className='text-blue-400 size-5' />,
      onClick: (row) => abrirModalEditarArticulo(row),
    },
    {
      icon: <Trash2 className='text-red-400 size-5' />,
      onClick: (row) => abrirModalEliminarArticulo(row),
    },
  ]

  return (
    <>
      <div>
        <h1 className='text-center uppercase text-xl font-bold mb-4'>
          Listado de artículos por proveedor
        </h1>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-2'>
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
          {proveedorSeleccionado && (
            <ButtonLayout
              onClick={abrirModalAgregarArticulo}
              className='bg-green-600 hover:bg-green-700 uppercase font-bold'
              disabled={!proveedorSeleccionado}
            >
              Agregar artículo
            </ButtonLayout>
          )}
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
            'nivel_servicio',
            'modelo_seleccionado',
          ]}
          actions={acciones}
        />
      </div>
      <Modal
        modalRef={modalActualizarArticuloRef}
        onClose={cerrarModalEditarArticulo}
      >
        {articuloSeleccionado && (
          <div className='max-h-[90vh] overflow-y-auto'>
            <h2 className='text-center uppercase font-bold mb-4'>
              Actualizar relación proveedor- artículo
            </h2>
            <p>
              <span className='underline'>Artículo seleccionado:</span>{' '}
              {articuloSeleccionado.descripcion}
            </p>
            <form
              className='flex flex-col gap-2 my-4'
              id='form-editar-articulo-proveedor'
              onSubmit={actualizarArticuloSeleccionado}
            >
              <label htmlFor='es_predeterminado'>
                ¿Es el proveedor predeterminado?
              </label>
              <select
                id='es_predeterminado'
                name='es_predeterminado'
                defaultValue={articuloSeleccionado.es_predeterminado}
                className='border border-gray-300 bg-gray-800 rounded-lg p-2'
                required
              >
                <option value='Sí'>Sí</option>
                <option value='No'>No</option>
              </select>

              <label htmlFor='nivel_servicio'>Nivel de Servicio</label>
              <select
                id='nivel_servicio'
                name='nivel_servicio'
                defaultValue={articuloSeleccionado.nivel_servicio}
                className='border border-gray-300 bg-gray-800 rounded-lg p-2'
                required
              >
                <option value='85'>85%</option>
                <option value='90'>90%</option>
                <option value='95'>95%</option>
              </select>

              <label htmlFor='modelo_seleccionado'>Modelo de inventario</label>
              <select
                id='modelo_seleccionado'
                name='modelo_seleccionado'
                defaultValue={articuloSeleccionado.modelo_seleccionado}
                className='border border-gray-300 bg-gray-800 rounded-lg p-2'
                required
                onChange={(e) => setModeloSeleccionado(e.target.value)}
              >
                <option value='Lote Fijo'>Lote Fijo</option>
                <option value='Intervalo Fijo'>Intervalo Fijo</option>
              </select>
              {modeloSeleccionado === 'Intervalo Fijo' && (
                <>
                  <label htmlFor='periodo_revision'>
                    Período de revisión (en días)
                  </label>
                  <input
                    type='number'
                    id='periodo_revision'
                    name='periodo_revision'
                    defaultValue={articuloSeleccionado.periodo_revision}
                    className='border border-gray-300 rounded-lg p-2'
                    required
                    min={1}
                  />
                </>
              )}
              <label htmlFor='precio_unitario'>Precio unitario</label>
              <input
                type='number'
                id='precio_unitario'
                name='precio_unitario'
                defaultValue={articuloSeleccionado.precio_unitario}
                className='border border-gray-300 rounded-lg p-2'
                required
                min={0}
              />
              <label htmlFor='demora_entrega'>
                Demora de entrega (en días)
              </label>
              <input
                type='number'
                id='demora_entrega'
                name='demora_entrega'
                defaultValue={articuloSeleccionado.demora_entrega}
                className='border border-gray-300 rounded-lg p-2'
                required
                min={0}
              />
              <label htmlFor='costo_pedido'>Costo de pedido</label>
              <input
                type='number'
                id='costo_pedido'
                name='costo_pedido'
                defaultValue={articuloSeleccionado.costo_pedido}
                className='border border-gray-300 rounded-lg p-2'
                required
                min={1}
              />

              <div className='flex justify-around mt-4'>
                <ButtonLayout
                  onClick={cerrarModalEditarArticulo}
                  className='bg-red-500 hover:bg-red-600'
                  type={'button'}
                >
                  Cancelar
                </ButtonLayout>
                <ButtonLayout type={'submit'}>Guardar cambios</ButtonLayout>
              </div>
            </form>
          </div>
        )}
      </Modal>
      <Modal modalRef={modalEliminarArticuloRef}>
        {articuloSeleccionado && (
          <div className='max-h-[90vh] overflow-y-auto'>
            <h2 className='text-center uppercase font-bold mb-4'>
              Eliminar relación proveedor - artículo
            </h2>
            <p>
              ¿Está seguro que desea eliminar la relación del artículo{' '}
              <span className='underline'>
                {articuloSeleccionado.descripcion}
              </span>{' '}
              con el proveedor{' '}
              <span className='underline'>
                {
                  proveedores.find(
                    (p) => p.id_proveedor === proveedorSeleccionado
                  )?.nombre
                }{' '}
                {
                  proveedores.find(
                    (p) => p.id_proveedor === proveedorSeleccionado
                  )?.apellido
                }
              </span>
              ?
            </p>
            <div className='flex justify-around mt-4'>
              <ButtonLayout
                onClick={cerrarModalEliminarArticulo}
                className='bg-red-500 hover:bg-red-600'
                type={'button'}
              >
                Cancelar
              </ButtonLayout>
              <ButtonLayout onClick={eliminarArticuloSeleccionado}>
                Confirmar eliminación
              </ButtonLayout>
            </div>
          </div>
        )}
      </Modal>
      <Modal modalRef={modalAgregarArticuloRef}>
        <div className='max-h-[90vh] overflow-y-auto'>
          <h2 className='text-center uppercase font-bold mb-4'>
            Agregar artículo al proveedor
          </h2>
          <form
            id='form-agregar-articulo'
            className='flex flex-col gap-2 my-4'
            onSubmit={agregarArticuloProveedor}
          >
            <label htmlFor='articulo_a_agregar'>Artículo</label>
            <select
              id='articulo_a_agregar'
              name='articulo_a_agregar'
              className='border border-gray-300 bg-gray-800 rounded-lg p-2 w-full'
              required
            >
              <option value=''>Seleccione un artículo</option>
              {articulosAgregables && articulosAgregables.length > 0 ? (
                articulosAgregables.map((articulo) => (
                  <option
                    key={articulo.id_articulo}
                    value={articulo.id_articulo}
                  >
                    {articulo.descripcion}
                  </option>
                ))
              ) : (
                <option value=''>No hay artículos disponibles</option>
              )}
            </select>
            <label htmlFor='es_predeterminado'>
              ¿Es el proveedor predeterminado?
            </label>
            <select
              id='es_predeterminado'
              name='es_predeterminado'
              className='border border-gray-300 bg-gray-800 rounded-lg p-2'
              required
            >
              <option value=''>Seleccione una opción</option>
              <option value='true'>Sí</option>
              <option value='false'>No</option>
            </select>

            <label htmlFor='nivel_servicio'>Nivel de Servicio</label>
            <select
              id='nivel_servicio'
              name='nivel_servicio'
              className='border border-gray-300 bg-gray-800 rounded-lg p-2'
              required
            >
              <option value=''>Seleccione una opción</option>
              <option value='85'>85%</option>
              <option value='90'>90%</option>
              <option value='95'>95%</option>
            </select>

            <label htmlFor='modelo_seleccionado'>Modelo de inventario</label>
            <select
              id='modelo_seleccionado'
              name='modelo_seleccionado'
              className='border border-gray-300 bg-gray-800 rounded-lg p-2'
              required
              onChange={(e) => setModeloSeleccionado(e.target.value)}
            >
              <option value=''>Seleccione un modelo</option>
              <option value='Lote Fijo'>Lote Fijo</option>
              <option value='Intervalo Fijo'>Intervalo Fijo</option>
            </select>
            {modeloSeleccionado === 'Intervalo Fijo' && (
              <>
                <label htmlFor='periodo_revision'>
                  Período de revisión (en días)
                </label>
                <input
                  type='number'
                  id='periodo_revision'
                  name='periodo_revision'
                  className='border border-gray-300 rounded-lg p-2'
                  required
                  min={1}
                />
              </>
            )}
            <label htmlFor='precio_unitario'>Precio unitario</label>
            <input
              type='number'
              id='precio_unitario'
              name='precio_unitario'
              className='border border-gray-300 rounded-lg p-2'
              required
              min={0}
            />
            <label htmlFor='demora_entrega'>Demora de entrega (en días)</label>
            <input
              type='number'
              id='demora_entrega'
              name='demora_entrega'
              className='border border-gray-300 rounded-lg p-2'
              required
              min={0}
            />
            <label htmlFor='costo_pedido'>Costo de pedido</label>
            <input
              type='number'
              id='costo_pedido'
              name='costo_pedido'
              className='border border-gray-300 rounded-lg p-2'
              required
              min={1}
            />

            <div className='flex justify-around mt-4'>
              <ButtonLayout
                onClick={cerrarModalAgregarArticulo}
                className='bg-red-500 hover:bg-red-600'
                type={'button'}
              >
                Cancelar
              </ButtonLayout>
              <ButtonLayout type={'submit'}>Agregar artículo</ButtonLayout>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}
export default ListadoArticulosXProveedor
