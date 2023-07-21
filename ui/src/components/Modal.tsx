import React from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
  onApprove: () => void
  contentText: string
}

const Modal: React.FC<Props> = ({ isOpen, onClose, onApprove, contentText }) => (
  <>
    {isOpen ? (
      <div className="fixed inset-0 z-10 flex items-center justify-center w-screen h-screen bg-opacity-60 bg-black">
        <div className="relative z-20 p-8 mx-auto bg-white rounded-lg shadow-lg">
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="my-4">
            <p className="text-lg text-center">{contentText}</p>
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
              onClick={onApprove}
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    ) : null}
  </>
)

export default Modal
