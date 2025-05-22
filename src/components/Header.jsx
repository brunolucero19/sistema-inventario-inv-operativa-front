import Theme from './ui/theme'

const Header = () => {
  return (
    <header className="w-full bg-gray-800 flex items-center p-4 h-16 font-bold text-2xl">
        <div className="w-1/4">
           <img src="/img/Stockify-logo-dt.png" alt="logo" className="w-10 h-10" />
        </div>

        <div className="flex-grow flex justify-center">
            <h1>SISTEMA - Stockify</h1>
        </div>

        <div className="w-1/4 flex justify-end">
            <Theme />
        </div>
</header>
  )
}
export default Header
