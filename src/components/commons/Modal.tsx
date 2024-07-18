import React, { ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg z-10 max-w-lg w-full mx-4 relative">
        <button
          className="absolute top-1 right-2 z-50 text-black hover:text-gray-700"
          onClick={onClose}
        >
          <IoCloseOutline size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
