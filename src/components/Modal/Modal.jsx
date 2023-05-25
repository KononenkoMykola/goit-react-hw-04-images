import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import css from './Modal.module.css';
import { IoCloseCircleSharp } from 'react-icons/io5';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ modalData, onClose }) => {
  const handleBackDrop = e => {
    if (e.target !== e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handeKeyDowne = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handeKeyDowne);

    return () => {
      window.removeEventListener('keydown', handeKeyDowne);
    };
  }, [onClose]);

  const { largeImageUrl, altName } = modalData;
  return createPortal(
    <div className={css.Overlay} onClick={handleBackDrop}>
      <div className={css.Modal}>
        <img src={largeImageUrl} alt={altName} />

        <button
          type="button"
          onClick={() => onClose()}
          className={css.CloseBtn}
        >
          <IoCloseCircleSharp size={32} />
        </button>
      </div>
    </div>,
    modalRoot
  );
};



Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;