import { Route, Routes } from 'react-router'
import Inicio from './components/Inicio'
import Layout from './layout/Layout'
import { ToastContainer } from 'react-toastify'
import NotFound from './components/ui/NotFound'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path="*" element={<NotFound />} />
        <Route path='/sistema/*' element={<Layout />} />
      </Routes>
      <ToastContainer
        position='top-center'
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </>
  )
}

export default App
