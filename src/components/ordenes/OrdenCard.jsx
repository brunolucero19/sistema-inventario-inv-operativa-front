import { Edit } from "lucide-react"

export const OrdenCard = ({ orden, onClick }) => {

    return (
        <div
            key={orden.id_orden_compra}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-6 transition-transform hover:scale-105 hover:shadow-lg"
        >
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Orden #{orden.id_orden_compra}</h3>
                {onClick && <button onClick={() => onClick(orden)} className="cursor-pointer">
                    <Edit className='w-5 h-5 text-blue-600' />
                </button>}
            </div>

            <p className="text-gray-700"><strong>Proveedor:</strong> {orden.proveedorArticulo.proveedor.apellido} {orden.proveedorArticulo.proveedor.nombre}</p>

            <p className="text-gray-700"><strong>Artículo:</strong> {orden.proveedorArticulo.articulo.descripcion}</p>

            <p className="text-gray-700"><strong>Fecha estimada:</strong> {new Date(orden.fecha_estimada_recepcion).toLocaleDateString()}</p>

            <p className="text-gray-700"><strong>Cantidad:</strong> {orden.cantidad}</p>

            <p className="text-gray-700"><strong>Estado:</strong> {orden.estadoOrdenCompra.nombre_eoc.toUpperCase()}</p>
        </div>
    )
}
