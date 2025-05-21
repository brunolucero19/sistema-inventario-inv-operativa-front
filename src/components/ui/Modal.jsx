const Modal = ({ children, id }) => {
  return (
    <dialog id={id} className='modal'>
      <div className='modal-box'>
        <form method='dialog'>
          {/* if there is a button in form, it will close the modal */}
          <button className='btn btn-md btn-circle btn-ghost absolute right-2 top-2'>
            ✕
          </button>
        </form>
        <div className='p-2'>{children}</div>
      </div>
    </dialog>
  )
}

export default Modal
