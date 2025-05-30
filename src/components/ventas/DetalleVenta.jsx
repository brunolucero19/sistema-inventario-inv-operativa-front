import Tabla from "../ui/Tabla";

export const DetalleVenta = ({ venta }) => {


    if (!venta) return

    const detalles = venta.detalles.map((detalle) => ({
        "#": detalle.id_articulo,
        descripcion: detalle.articulo.descripcion,
        cantidad: detalle.cantidad,
        total: detalle.totalDetalle
    })

    )

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Detalle de Venta #{venta.id_venta}</h2>
            <p><strong>Fecha:</strong> {new Date(venta.fechaVenta).toLocaleString()}</p>
            <p><strong>Monto Total:</strong> ${venta.montoTotal}</p>
            <div className="mt-5">
                <Tabla columns={["#", "descripcion", "cantidad", "total"]} data={detalles} />
            </div>
        </div>
    );

}
