const useRenderActions = (actions) => {
  const renderActions = (row) => {
    return actions.map((action, index) => {
      const { icon, onClick } = action
      return (
        <button
          key={index}
          className='p-2 cursor-pointer'
          onClick={() => onClick(row)}
        >
          {icon}
        </button>
      )
    })
  }
  return renderActions
}

export default useRenderActions
