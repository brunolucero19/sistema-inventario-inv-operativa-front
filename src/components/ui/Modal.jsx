import { useEffect } from 'react'

const Modal = ({ children, modalRef, onClose }) => {
  useEffect(() => {
    const modal = modalRef.current
    if (!modal || !onClose) return

    const handleClose = () => {
      onClose()
    }

    modal.addEventListener('close', handleClose)

    return () => {
      modal.removeEventListener('close', handleClose)
    }
  }, [modalRef, onClose])

  return (
    <dialog ref={modalRef} className='modal'>
      <div className='modal-box bg-gray-800'>
        <form method='dialog'>
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
