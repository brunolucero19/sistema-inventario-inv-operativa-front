import { Link } from 'react-router'
import LogOut from '../../public/icons/LogOut'

const Footer = () => {
  return (
    <footer className='relative flex items-center h-10 bg-gray-800 p-4 justify-center'>
      <Link to='/'>
        <div className='flex items-center gap-2 border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition cursor-pointer'>
          <LogOut />
          Salir
        </div>
      </Link>
      <h3 className="text-center w-full">Copyright ©️ 2025. Todos los derechos reservados</h3>
    </footer>
  )
}
export default Footer
