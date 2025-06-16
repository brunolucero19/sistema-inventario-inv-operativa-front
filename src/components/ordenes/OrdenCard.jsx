export const OrdenCard = ({ orden, onClick}) => {

    return (
        <div
            key={orden.id_orden_compra}
            onClick={() => onClick?.(orden)}
            className="bg-white rounded-xl cursor-pointer shadow-md border border-gray-200 p-6 transition-transform hover:scale-105 hover:shadow-lg"
        >
            <h3 className="text-xl font-bold text-gray-800 mb-2">Orden #{orden.id_orden_compra}</h3>
            <p className="text-gray-700"><strong>Proveedor:</strong> {orden.proveedorArticulo.proveedor.apellido} {orden.proveedorArticulo.proveedor.nombre}</p>

            <p className="text-gray-700"><strong>Artículo:</strong> {orden.proveedorArticulo.articulo.descripcion}</p>

            <p className="text-gray-700"><strong>Fecha estimada:</strong> {new Date(orden.fecha_estimada_recepcion).toLocaleDateString()}</p>

            <p className="text-gray-700"><strong>Cantidad:</strong> {orden.cantidad}</p>

            <p className="text-gray-700"><strong>Estado:</strong> {orden.estadoOrdenCompra.nombre_eoc.toUpperCase()}</p>
        </div>
    )
}
