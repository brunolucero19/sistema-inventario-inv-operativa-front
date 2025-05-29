import { useState, useEffect } from "react"
import { obtenerOrdenesCompra } from "../../services/ordenes"

const ListadoOrdenesCompra = () => {
  const [ordenes, setOrdenes] = useState([])

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const data = await obtenerOrdenesCompra()
        console.log("Órdenes recibidas:", data)  //sacar después
        setOrdenes(data)
      } catch (error) {
        console.error("Error al obtener las órdenes de compra:", error)
      }
    }

    fetchOrdenes()
  }, [])

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {
        ordenes.map((orden) => (
          <div
            key={orden.id_orden_compra}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-6 transition-transform hover:scale-105 hover:shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">Orden #{orden.id_orden_compra}</h3>
            <p className="text-gray-700"><strong>Proveedor:</strong> {orden.proveedor || "Valentino Isgró"}</p> 
            {/* Cambiar lo del proveedor */}
            <p className="text-gray-700"><strong>Fecha estimada:</strong> {orden.fecha_estimada_recepcion ? new Date(orden.fecha_estimada_recepcion).toLocaleDateString() : "No disponible"}</p>
          </div>
        ))
      }
    </div>
  )
}

export default ListadoOrdenesCompra
