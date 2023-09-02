import {ReactNode} from "react";


interface ModalProps {
    children: ReactNode
    open: boolean
}

const Modal = ({children, open}: ModalProps) => {
    return (
        <>
            {open ?
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
                    {children}
                </div> : <></>
            }
        </>
    );
}

export default Modal;