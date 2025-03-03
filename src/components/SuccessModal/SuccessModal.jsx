import { useState, useEffect, useRef } from 'react';

import './SuccessModal.css';
import SuccessIcon from '../../assets/images/icon-success.svg';

const SuccessModal = ({
  successModal,
  setSuccessModal,
  setIsNewsletterVisible,
  setShowNewsletter,
  email,
  setSubmittedEmail,
}) => {
  const [isVisible, setIsVisible] = useState(successModal);
  const dialogRef = useRef(null);

  useEffect(() => {
    let timeout;

    if (dialogRef.current) {
      if (isVisible) {
        if (!dialogRef.current.open) {
          dialogRef.current.showModal();
        }
      } else if (successModal && !isVisible) {
        setIsNewsletterVisible(true);
        setSubmittedEmail('');
        timeout = setTimeout(() => {
          dialogRef.current.close();
          setShowNewsletter(true);
          setSuccessModal(false);
        }, 200);
      }
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isVisible]);

  const handleclose = e => {
    e.preventDefault();
    setIsNewsletterVisible(true);
    setSubmittedEmail('');
    setTimeout(() => {
      dialogRef.current.close();
      setShowNewsletter(true);
      setSuccessModal(false);
    }, 200);
  };

  return (
    <>
      <dialog
        className={`success-modal ${isVisible ? 'success-modal--visible' : ''}`}
        ref={dialogRef}
        aria-labelledby='successModalTitle'
        onClose={handleclose}
        onCancel={handleclose}
      >
        <div className='success-modal__content'>
          <div className='success-modal__icon-container'>
            <img src={SuccessIcon} alt='' className='success-modal__icon' />
          </div>
          <header className='success-modal__header'>
            <h2 id='successModalTitle' className='success-modal__heading'>
              Thanks for subscribing!
            </h2>
          </header>
          <p className='success-modal__text'>
            A confirmation email has been sent to <strong>{email}</strong>.
            Please open it and click the button inside to confirm your
            subscription.
          </p>
          <footer className='success-modal__footer'>
            <button
              onClick={() => {
                setIsVisible(prev => !prev);
              }}
              aria-label='Dismiss subscription confirmation message'
              className='success-modal__btn'
            >
              Dismiss message
            </button>
          </footer>
        </div>
      </dialog>
    </>
  );
};
export default SuccessModal;
