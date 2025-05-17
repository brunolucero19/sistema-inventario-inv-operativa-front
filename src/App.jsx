import { Route, Routes } from 'react-router'
import Inicio from './components/Inicio'
import Layout from './layout/Layout'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/sistema/*' element={<Layout />} />
      </Routes>
    </>
  )
}

export default App
