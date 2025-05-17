import { Link } from 'react-router'
import LogOut from './icons/LogOut'

const Footer = () => {
  return (
    <footer className='flex justify-between items-center h-16 bg-gray-800 p-4'>
      <div className='flex items-center gap-2'>
        <LogOut />
        <Link to='/' className='hover:underline'>
          Salir
        </Link>
      </div>
      <h3>Copyright ©️ 2025. Todos los derechos reservados</h3>
    </footer>
  )
}
export default Footer
