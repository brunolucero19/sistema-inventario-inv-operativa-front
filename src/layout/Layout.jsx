import Footer from '../components/Footer'
import Header from '../components/Header'
import Main from '../components/Main'
import Sidebar from '../components/Sidebar'

const Layout = () => {
  return (
    <div className='flex flex-col h-screen w-full'>
      <Header />
      <div className='flex flex-1 overflow-hidden w-full'>
        <Sidebar />
        <Main />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
