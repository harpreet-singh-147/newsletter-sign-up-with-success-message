import { useState, useRef } from 'react';
import SuccessModal from '../SuccessModal/SuccessModal';
import listIcon from '../../assets/images/icon-list.svg';
import desktopImage from '../../assets/images/illustration-sign-up-desktop.svg';
import mobileImage from '../../assets/images/illustration-sign-up-mobile.svg';
import './Form.css';

const Form = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [errors, setErrors] = useState({});
  const [successModal, setSuccessModal] = useState(false);
  const [isNewsletterVisible, setIsNewsletterVisible] = useState(true);
  const [showNewsletter, setShowNewsletter] = useState(true);

  const emailInput = useRef(null);

  const handleChange = e => {
    setFormData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const validateForm = data => {
    let errors = {};

    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email address is invalid';
    }

    return errors;
  };

  const handleSubmit = e => {
    e.preventDefault();

    try {
      const validationErrors = validateForm(formData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        console.log('Form Data Submitted:', formData);
        setIsNewsletterVisible(false);
        setTimeout(() => {
          setShowNewsletter(false);
          setSuccessModal(true);
        }, 200);
        setFormData({ email: '' });
        setErrors({});
      } else {
        if (validationErrors.email && emailInput.current) {
          emailInput.current.focus();
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleBlur = e => {
    if (!e.target.value.trim()) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  return (
    <main>
      {showNewsletter ? (
        <article
          className={`newsletter ${
            !isNewsletterVisible ? 'newsletter--hidden' : ''
          }`}
        >
          <form className='newsletter__form' onSubmit={handleSubmit} noValidate>
            <section className='newsletter__form-content'>
              <header className='newsletter__form-header'>
                <h1 className='newsletter__form-heading'>Stay updated! </h1>
              </header>
              <p className='newsletter__form-intro'>
                Join 60,000+ product managers receiving monthly updates on:
              </p>
              <ul className='newsletter__form-list'>
                <li className='newsletter__form-list-item'>
                  <img
                    src={listIcon}
                    alt=''
                    className='newsletter__form-list-icon'
                  />
                  <span className='newsletter__list-item-text'>
                    Product discovery and building what matters
                  </span>
                </li>
                <li className='newsletter__form-list-item'>
                  <img
                    src={listIcon}
                    alt=''
                    className='newsletter__form-list-icon'
                  />
                  <span className='newsletter__list-item-text'>
                    Measuring to ensure updates are a success
                  </span>
                </li>
                <li className='newsletter__form-list-item'>
                  <img
                    src={listIcon}
                    alt=''
                    className='newsletter__form-list-icon'
                  />
                  <span className='newsletter__list-item-text'>
                    And much more!
                  </span>
                </li>
              </ul>
              <div className='newsletter__form-group'>
                <div className='newsletter__form-input-container'>
                  <label htmlFor='email' className='newsletter__form-label'>
                    Email address
                  </label>
                  <input
                    ref={emailInput}
                    type='email'
                    placeholder='email@company.com '
                    id='email'
                    name='email'
                    className={`newsletter__form-input ${
                      errors.email ? 'newsletter__form-input--error' : ''
                    }`}
                    aria-describedby='emailError'
                    aria-required='true'
                    aria-invalid={errors.email ? 'true' : 'false'}
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                  />

                  <span
                    className={`newsletter__form-error ${
                      errors.email ? 'newsletter__form-error--visible' : ''
                    }`}
                    id='emailError'
                    aria-live='polite'
                  >
                    {errors.email || ''}
                  </span>
                </div>

                <button
                  className='newsletter__form-btn-submit'
                  aria-label='Subscribe to monthly newsletter for product management updates'
                >
                  Subscribe to monthly newsletter
                </button>
              </div>
            </section>
            <div className='newsletter__form-img-container'>
              <img
                src={desktopImage}
                alt=''
                className='newsletter__form-img-desktop'
              />
              <img
                src={mobileImage}
                alt=''
                className='newsletter__form-img-mobile'
              />
            </div>
          </form>
        </article>
      ) : null}

      {successModal ? (
        <SuccessModal
          successModal={successModal}
          setSuccessModal={setSuccessModal}
          setIsNewsletterVisible={setIsNewsletterVisible}
          setShowNewsletter={setShowNewsletter}
        />
      ) : null}
    </main>
  );
};
export default Form;
