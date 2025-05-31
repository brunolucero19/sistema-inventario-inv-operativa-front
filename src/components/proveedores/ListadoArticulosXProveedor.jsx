import { useEffect, useState } from "react"
import { obtenerProveedores } from "../../services/proveedores"

const ListadoArticulosXProveedor = () => {
const [proveedores, setProveedores] = useState([])

  useEffect(() => {
    const fetchProveedores = async ()=> {
      try{
        const data = await obtenerProveedores()
        setProveedores(data);
      }catch (error) {
        console.error('Error al obtener proveedores:', error)
      }
    }
    fetchProveedores()
  }  , [])

  return (
    <div>
      {proveedores.map((proveedor) => (
        <h2 key={proveedor.id}>{proveedor.nombre}</h2>
      ))}
    </div>
  )
}
export default ListadoArticulosXProveedor
