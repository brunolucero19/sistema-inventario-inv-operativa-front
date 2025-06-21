import { useEffect, useState } from "react";
import { obtenerArticulos } from "../../services/articulos";
import { obtenerCGIPorArticulo } from "../../services/proveedorArticulos";
import CGIBarChart from "./CGI/CGIBarChart";
import Tabla from "../ui/Tabla";

const CalcularCGI = () => {
  const [articulos, setArticulos] = useState([]);
  const [idArticulo, setIdArticulo] = useState("");
  const [cgiData, setCgiData] = useState([]);
  useEffect(() => {
    const fetchArticulos = async () => {
      try {
        const data = await obtenerArticulos();
        setArticulos(data);
      } catch (error) {
        console.error("Error al obtener artículos:", error);
      }
    };

    fetchArticulos();
  }, []);

  const handleChange = async (e) => {
    const selectedId = e.target.value;
    setIdArticulo(selectedId);

    if (selectedId) {
      try {
        const res = await obtenerCGIPorArticulo(selectedId);
        console.log("res Fetch", res);
        setCgiData(res);
      } catch (error) {
        console.error("Error al obtener proveedores:", error);
        setCgiData([]);
      }
    } else {
      setCgiData([]);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">CGI por Articulo</h2>
      <div>
        <label htmlFor="articulo" className="mr-2 font-semibold">
          Seleccionar artículo:
        </label>
        <select
          id="articulo"
          value={idArticulo}
          onChange={handleChange}
          className="border px-2 py-1 rounded"
        >
          <option className="text-gray-800" value="">
            Elegir un artículo
          </option>
          {articulos.map((art) => (
            <option
              className="text-black"
              key={art.id_articulo}
              value={art.id_articulo}
            >
              {art.descripcion}
            </option>
          ))}
        </select>
      </div>

      <CGIBarChart data={cgiData} />
      <Tabla
        columns={[
          "proveedor",
          "costo_compra",
          "costo_pedido",
          "costo_almacenamiento",
          "cgi",
        ]}
        data={cgiData}
        filaPorPagina={5}
      ></Tabla>
    </div>
  );
};

export default CalcularCGI;
