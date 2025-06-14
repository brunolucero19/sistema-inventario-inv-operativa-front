import { useState, useEffect, useRef } from "react"
import { obtenerOrdenesCompra } from "../../services/ordenes"
import Modal from "../ui/Modal"
import { SearchBar } from "../ui/SearchBar"
import { CrearOrdenCompra } from "./CrearOrdenCompra"
import ButtonLayout from "../ui/ButtonLayout"
import { useFetchData } from "../../hooks/useFetchData"
import { useUpdateKeyStore } from "../../hooks/useStore"

const ListadoOrdenesCompra = () => {
  const createModalRef = useRef()

  const { updateKey } = useUpdateKeyStore()

  const { data: ordenes } = useFetchData(obtenerOrdenesCompra, [updateKey])

  return (
    <>
      <div className="flex justify-end">
        <ButtonLayout className={"ml-auto"} onClick={() => createModalRef.current?.show()}>
          Crear Orden de Compra
        </ButtonLayout>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {
          ordenes.map((orden) => (
            <div
              key={orden.id_orden_compra}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 transition-transform hover:scale-105 hover:shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">Orden #{orden.id_orden_compra}</h3>
              <p className="text-gray-700"><strong>Proveedor:</strong> {orden.proveedorArticulo.proveedor.nombre}</p>

              <p className="text-gray-700"><strong>Artículo:</strong> {orden.proveedorArticulo.articulo.descripcion}</p>

              <p className="text-gray-700"><strong>Fecha estimada:</strong> {new Date(orden.fecha_estimada_recepcion).toLocaleDateString()}</p>

              <p className="text-gray-700"><strong>Estado:</strong> {orden.estadoOrdenCompra.nombre_eoc.toUpperCase()}</p>
            </div>
          ))
        }
      </div>
      <Modal modalRef={createModalRef}>
        <CrearOrdenCompra modalRef={createModalRef} />
      </Modal >
    </>
  )
}

export default ListadoOrdenesCompra
