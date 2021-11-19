import s from './Modal.module.scss';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
export default function Modal({ largeImage, onClose }) {
    useEffect(() => {
        window.addEventListener('keydown', closeModal);
        return () => {
            window.removeEventListener('keydown', closeModal);
        };
    });

    const closeModal = e => {
        if (e.code === 'Escape') {
            onClose();
        }
    };
    const clickOverlay = e => {
        if (e.target.nodeName !== 'IMG') {
            onClose();
        }
    };
    return (
        <div className={s.Overlay} onClick={clickOverlay}>
            <div className={s.Modal}>
                <img src={largeImage} alt="" />
            </div>
        </div>
    );
}
Modal.propTypes = {
    largeImage: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};
