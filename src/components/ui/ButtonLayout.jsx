const ButtonLayout = ({ children, onClick, className, type, disabled, title }) => {
  return (
    <button
      className={`bg-gray-700 px-4 py-2 rounded-lg border border-white cursor-pointer hover:bg-gray-600 ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
      type={type}
    >
      {children}
    </button>
  )
}

export default ButtonLayout
