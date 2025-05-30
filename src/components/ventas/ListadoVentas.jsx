import { Eye } from "lucide-react"
import { useFetchData } from "../../hooks/useFetchData"
import { obtenerVentas } from "../../services/ventas"
import Modal from "../ui/Modal"
import Tabla from "../ui/Tabla"
import { useRef, useState } from "react"
import { DetalleVenta } from "./DetalleVenta"

const ListadoVentas = () => {
  const { data } = useFetchData(obtenerVentas)
  const [activeVenta , setActiveVenta] = useState(null)
  const modalRef = useRef()

  const ventas = data.map(venta => (
    {
      id: venta.id_venta,
      fecha: new Date(venta.fechaVenta).toLocaleString(),
      monto: venta.montoTotal
    }
  ))

   const actions = [
    {
      icon: <Eye className='w-5 h-5 text-red-600' />,
      onClick: (row) => {
        console.log(row)
        const newActiveVenta = data.find(venta => venta.id_venta === row.id)
        setActiveVenta(newActiveVenta)
        modalRef.current?.showModal()
      },
    }
  ]

  return (
    <div className="mt-10">
      <Tabla columns={["id", "fecha", "monto"]} data={ventas} actions={actions} />
      <Modal modalRef={modalRef}>
        <DetalleVenta venta={activeVenta}/>
      </Modal>
    </div>
  )
}
export default ListadoVentas
