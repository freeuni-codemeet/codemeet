import React from "react";

interface ModalCloseButtonProps {
    closeModal: () => void
}

const ModalCloseButton = ({closeModal}: ModalCloseButtonProps) => {
    return (
        <button
            type="button"
            onClick={closeModal}
            className="absolute top-3 right-2.5 text-slate-600 bg-transparent rounded-lg text w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-slate-700 hover:text-white"
        >
            <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
            </svg>
        </button>
    )
}

export default ModalCloseButton;