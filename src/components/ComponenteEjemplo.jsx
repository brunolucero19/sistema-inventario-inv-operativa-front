const ComponenteEjemplo = () => {
  const url = import.meta.env.VITE_BACKEND_URL

  const conectarAPI = async () => {
    const response = await fetch(url)
    const { message } = await response.json()
    console.log(message)
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center gap-4 h-screen text-white bg-gradient-to-b from-gray-800 via-blue-600 to-blue-300'>
        <h1 className='font-bold text-2xl'>Stockify</h1>
        <button
          onClick={conectarAPI}
          className='cursor-pointer underline bg-gray-500 rounded-2xl p-2'
        >
          Conectar a la API del back
        </button>
        <p>URL de la API: {url}</p>
      </div>
    </>
  )
}

export default ComponenteEjemplo
