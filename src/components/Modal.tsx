

const Modal = ({ children }: any) => {
    return (
        <div className="fixed inset-5 flex flex-col justify-center items-center bg-black bg-opacity-50 right-0 left-0 top-0 bottom-0 px-2 z-[1000]">
            {children}
        </div>
    )
}

export default Modal