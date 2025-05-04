const ComponenteEjemplo = () => {
  const url = import.meta.env.VITE_BACKEND_URL

  const conectarAPI = async () => {
    const response = await fetch(url)
    const { message } = await response.json()
    console.log(message)
  }

  conectarAPI()

  return (
    <>
      <h2>Este es un componente de ejemplo</h2>
    </>
  )
}

export default ComponenteEjemplo
