import {
  Boxes,
  LineChart,
  Package
} from 'lucide-react'

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-b from-indigo-600 to-indigo-900 min-h-full text-white">
      <div className="text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4">
          Bienvenido a <span className="text-yellow-400">Stockify</span>
        </h1>
        <p className="text-lg sm:text-xl text-indigo-100 max-w-xl mx-auto">
          Tu sistema inteligente para gestionar productos, inventario y análisis de stock en tiempo real.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl w-full">
        <div className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-lg text-center hover:scale-105 transition">
          <Boxes className="w-10 h-10 mx-auto text-yellow-300 mb-3" />
          <h3 className="text-xl font-semibold">Gestión de Inventario</h3>
          <p className="text-sm text-indigo-100 mt-2">Controlá tus productos, stock mínimo y movimientos fácilmente.</p>
        </div>
        <div className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-lg text-center hover:scale-105 transition">
          <LineChart className="w-10 h-10 mx-auto text-green-300 mb-3" />
          <h3 className="text-xl font-semibold">Reportes en Tiempo Real</h3>
          <p className="text-sm text-indigo-100 mt-2">Visualizá métricas clave y tomá decisiones rápidas y efectivas.</p>
        </div>
        <div className="bg-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-lg text-center hover:scale-105 transition">
          <Package className="w-10 h-10 mx-auto text-blue-300 mb-3" />
          <h3 className="text-xl font-semibold">Modelos de Inventarios</h3>
          <p className="text-sm text-indigo-100 mt-2">Gestioná diferentes formas de pedir productos y mantené tu inventario actualizado.</p>
        </div>
      </div>
    </div>
  )
}

export default Home
