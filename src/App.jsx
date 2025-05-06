import { Route, Routes } from 'react-router'
import Inicio from './components/Inicio'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/sistema' element={<h1>Bienvenido al sistema!</h1>} />
      </Routes>
    </>
  )
}

export default App
