import { Link } from 'react-router'
import LogOut from '../../public/icons/LogOut'

const Footer = () => {
  return (
    <footer className='relative flex items-center h-16 bg-gray-800 p-4 justify-center'>
        <div className='flex items-center gap-2 absolute left-4 border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition cursor-pointer'>
        <LogOut />
        <Link to='/'>
          Salir
        </Link>
      </div>
  <h3 className="text-center w-full">Copyright ©️ 2025. Todos los derechos reservados</h3>
</footer>
  )
}
export default Footer
