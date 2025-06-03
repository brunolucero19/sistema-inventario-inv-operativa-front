const useRenderActions = (actions) => {
  const renderActions = (row) => {
    return actions.map((action, index) => {
      const { icon, onClick } = action
      return (
        <button
          key={index}
          className='cursor-pointer m-2'
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
