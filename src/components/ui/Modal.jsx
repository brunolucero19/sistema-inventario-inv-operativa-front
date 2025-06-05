import { ToastContainer } from "react-toastify"

const Modal = ({ children, modalRef }) => {
  return (
    <dialog ref={modalRef} className='modal' style={{zIndex: 1}}>
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
      <div className='modal-box bg-gray-800'>
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
