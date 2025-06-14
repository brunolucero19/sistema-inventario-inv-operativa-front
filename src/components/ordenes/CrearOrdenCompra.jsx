import { useEffect, useState } from 'react'
import { SearchBar } from '../ui/SearchBar'
import { useFetchData } from '../../hooks/useFetchData'
import { obtenerProveedores } from '../../services/proveedores'
import { obtenerArticulosPorProveedor } from '../../services/proveedorArticulos'
import ButtonLayout from '../ui/ButtonLayout'
import { toast } from 'react-toastify'
import { crearOc } from '../../services/ordenes'
import { useUpdateKeyStore } from '../../hooks/useStore'

export const CrearOrdenCompra = ({ modalRef }) => {
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null)
    const [articuloSeleccionado, setArticuloSeleccionado] = useState(null)
    const [cantidad, setCantidad] = useState(1)
    const [articulos, setArticulos] = useState([])
    const [proveedorArticulos, setProveedorArticulos] = useState([])
    const { data: proveedores } = useFetchData(obtenerProveedores)

    const { incrementUpdateKey } = useUpdateKeyStore()

    const handleClickOpcion = (proveedor) => {
        setProveedorSeleccionado(proveedor)

    }

    const handleChangeSelectProveedor = (id) => {
        const proveedor = proveedores.find(p => p.id_proveedor === id);
        setProveedorSeleccionado(proveedor);
    }

    const handleChangeSelectArticulo = (id) => {
        const articulo = articulos.find(a => a.id_articulo === id);
        setArticuloSeleccionado(articulo);
    }

    const handleGenerarOrden = async () => {
        if (!proveedorSeleccionado || !articuloSeleccionado || cantidad <= 0) {
            toast.error('Por favor, complete todos los campos correctamente.');
            return;
        }

        const proveedorArticulo = proveedorArticulos.find(pa => pa.articulo.id_articulo === articuloSeleccionado.id_articulo && pa.proveedor.id_proveedor === proveedorSeleccionado.id_proveedor);
        console.log(proveedorArticulo.id_proveedor_articulo)
        const response = await crearOc({ id_proveedor_articulo: proveedorArticulo.id_proveedor_articulo, cantidad })

        if (response.ok) {
            toast.success('Orden de compra generada correctamente');
            modalRef.current?.close();
            setProveedorSeleccionado(null);
            setArticuloSeleccionado(null);
            setCantidad(1);
            setArticulos([]);
            setProveedorArticulos([]);
            incrementUpdateKey();
        }else{
            toast.error('Error al generar la orden de compra');
        }
    }

    useEffect(() => {
        if (proveedorSeleccionado) {
            obtenerArticulosPorProveedor(proveedorSeleccionado.id_proveedor).then(data => {
                setProveedorArticulos(data);
                console.log(data)
                setArticulos(data.map(proveedorArticulo => proveedorArticulo.articulo));
            });
        }
    }, [proveedorSeleccionado]);

    return (
        <div className='h-140 flex flex-col gap-4'>
            <h2 className="text-xl text-center font-bold">Generar Orden de Compra</h2>
            <div className='flex h-full flex-col gap-4 mt-4'>
                <SearchBar data={proveedores} placeholder="Buscar proveedor..." atributo="nombre" onClickOpcion={handleClickOpcion} />

                <span className='font-semibold'>Seleccione un Proveedor</span>
                <select
                    value={proveedorSeleccionado ? proveedorSeleccionado.id_proveedor : '0'}
                    onChange={(e) =>
                        handleChangeSelectProveedor(+e.target.value)
                    }
                    className='border border-gray-300 rounded-md p-2 text-white'
                >
                    <option value='0' className='bg-gray-400 text-black'>
                        Seleccionar Proveedor...
                    </option>
                    {proveedores.map(proveedor => (
                        <option key={proveedor.id_proveedor} value={proveedor.id_proveedor} className='bg-gray-400 text-black'>
                            {proveedor.nombre}
                        </option>
                    ))}
                </select>
  
                {articulos.length > 0 ? (
                    <div className='mt-4 flex flex-col gap-4 border border-gray-300 rounded p-4'>
                        <SearchBar data={articulos} placeholder="Buscar articulo..." atributo="descripcion" onClickOpcion={setArticuloSeleccionado} />

                        <span className='font-semibold'>Seleccione un Articulo</span>

                        <select
                            value={articuloSeleccionado ? articuloSeleccionado.id_articulo : '0'}
                            onChange={(e) =>
                                handleChangeSelectArticulo(+e.target.value)
                            }
                            className='border border-gray-300 rounded-md p-2 text-white'
                        >
                            <option value='0' className='bg-gray-400 text-black'>
                                Seleccionar Articulo...
                            </option>
                            {articulos.map(articulo => (
                                <option key={articulo.id_articulo} value={articulo.id_articulo} className='bg-gray-400 text-black'>
                                    {articulo.descripcion}
                                </option>
                            ))}
                        </select>

                        {articuloSeleccionado && (
                            <>
                                <label>Cantidad</label>
                                <input
                                    type='number'
                                    className={`border rounded-md p-2 'border-gray-300'}`}
                                    value={cantidad}
                                    onChange={(e) => setCantidad(+e.target.value)}
                                    min={1}
                                />

                            </>
                        )}
                    </div>

                ) : (
                    proveedorSeleccionado && (
                        <p className='text-gray-500'>No hay artículos disponibles para este proveedor.</p>
                    )
                )}
            </div>
            <ButtonLayout type='button' className={"mt-auto"} onClick={handleGenerarOrden}>Generar Orden</ButtonLayout>
        </div>
    )
}
