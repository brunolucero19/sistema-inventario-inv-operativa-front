import { Link } from 'react-router'

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
      <div className='flex flex-col items-center justify-center gap-4 h-screen text-white bg-gradient-to-b from-gray-800 via-blue-600 to-blue-300'>
        <h1 className='font-bold text-3xl uppercase'>Stockify</h1>
        <Link
          to='/sistema'
          className='cursor-pointer underline bg-cyan-500 rounded-2xl p-2 hover:bg-gray-600 transition-colors duration-300'
        >
          Entrar al sistema
        </Link>
      </div>
    </>
  )
}

export default Inicio
