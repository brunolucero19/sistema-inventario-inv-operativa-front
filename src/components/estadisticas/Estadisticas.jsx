import { useFetchData } from "../../hooks/useFetchData";
import { obtenerVentas } from "../../services/ventas";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useState, useMemo } from "react";

const MESES = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const Estadisticas = () => {
  const { data: ventasRaw } = useFetchData(obtenerVentas, []);
  const [anioSeleccionado, setAnioSeleccionado] = useState(
    new Date().getFullYear()
  );

  const añosDisponibles = useMemo(() => {
    const años = ventasRaw.map((v) => new Date(v.fechaVenta).getFullYear());
    return Array.from(new Set(años)).sort();
  }, [ventasRaw]);

  const ventasPorMes = useMemo(() => {
    const filtradas = ventasRaw.filter(
      (v) => new Date(v.fechaVenta).getFullYear() === anioSeleccionado
    );

    const conteoPorMes = MESES.map((mesNombre, index) => {
      const cantidad = filtradas.filter(
        (v) => new Date(v.fechaVenta).getMonth() === index
      ).length;
      return { name: mesNombre, cantidad };
    });

    return conteoPorMes;
  }, [ventasRaw, anioSeleccionado]);

  const ventasAcumuladas = useMemo(() => {
    let acumulado = 0;
    return ventasPorMes.map((item) => {
      acumulado += item.cantidad;
      return { name: item.name, acumulado };
    });
  }, [ventasPorMes]);

  const totalVentas = ventasRaw.length;

  const totalVentasAnio = ventasPorMes.reduce(
    (acc, curr) => acc + curr.cantidad,
    0
  );

  return (
    <div className="p-4 text-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg text-black">
            Cantidad de Ventas
          </h3>
          <h6 className="text-red-600">TOTALES</h6>
          <p className="text-2xl font-bold">{totalVentas}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg text-black">
            Cantidad de Ventas Anuales
          </h3>
          <h6 className="text-yellow-600 text-lg">{anioSeleccionado}</h6>
          <p className="text-2xl font-bold">{totalVentasAnio}</p>
        </div>
      </div>

      <div className="flex items-center mb-4 gap-2">
        <label className="text-white font-medium">Seleccionar Año:</label>
        <select
          className="border rounded px-2 py-1 text-white"
          value={anioSeleccionado}
          onChange={(e) => setAnioSeleccionado(parseInt(e.target.value))}
        >
          {añosDisponibles.map((anio) => (
            <option className="text-black" key={anio} value={anio}>
              {anio}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="font-semibold text-lg mb-4 text-black">
          Ventas por Mes ({anioSeleccionado})
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ventasPorMes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold text-lg mb-4 text-black">
          Ventas Acumuladas ({anioSeleccionado})
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ventasAcumuladas}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="acumulado"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;
