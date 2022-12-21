import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './ModalContent';
import '../Style/test.css';

export default function SignupPortal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className='clipping-container'>
      <button onClick={() => setShowModal(true)}>
        Show modal using a portal
      </button>
      {showModal &&
        createPortal(
          <ModalContent onClose={() => setShowModal(false)} />,
          document.body
        )}
    </div>
  );
}
