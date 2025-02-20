import { useEffect, useRef } from "react";

function Modal({ isOpen, onClose, title, children }) {
  const dialogRef = useRef();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleOutsideClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleOutsideClick}
      className="mx-auto my-auto min-w-96 max-w-[600px] rounded-lg p-7"
    >
      <h1 className="font-primary text-center text-2xl font-bold mb-6">{title}</h1>
      {children}
    </dialog>
  );
}

export default Modal;
