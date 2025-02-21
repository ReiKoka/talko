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
      className="bg-background text-foreground shadow-primary shadow-light dark:shadow-dark mx-auto my-auto max-w-[600px] min-w-96 rounded-lg p-7"
    >
      <h1 className="font-primary mb-6 text-center text-2xl font-bold">
        {title}
      </h1>
      {children}
    </dialog>
  );
}

export default Modal;
