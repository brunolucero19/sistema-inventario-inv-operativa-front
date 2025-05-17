import { Link } from 'react-router'
import Button from './ui/Button'

const Inicio = () => {
  const url = import.meta.env.VITE_BACKEND_URL

  const conectarAPI = async () => {
    const response = await fetch(url)
    const { message } = await response.json()
    console.log(message)
  }
  conectarAPI()

  return (
    <>
      <div className='flex flex-col items-center justify-center gap-4 h-screen text-white '>
        <h1 className='font-bold text-3xl uppercase mb-3.5'>Stockify</h1>
        <Link
          to='/sistema'
        >
          <Button>Empezar</Button>
        </Link>
      </div>
    </>
  )
}

export default Inicio
