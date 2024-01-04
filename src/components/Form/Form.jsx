import './Form.css';

const Form = () => {
  return (
    <article className='newsletter'>
      <form className='newsletter__form'>
        <section className='newsletter__form-content'>
          <header className='newsletter__form-header'>
            <h1 className='newsletter__form-heading'>Stay updated! </h1>
          </header>
          <p className='newsletter__form-intro'>
            Join 60,000+ product managers receiving monthly updates on:
          </p>
          <ul className='newsletter__form-list'>
            <li className='newsletter__form-list-item'>
              Product discovery and building what matters
            </li>
            <li className='newsletter__form-list-item'>
              Measuring to ensure updates are a success
            </li>
            <li className='newsletter__form-list-item'>And much more!</li>
          </ul>
          <div className='newsletter__form-group'>
            <div className='newsletter__form-input-container'>
              <label for='email' className='newsletter__form-label'>
                Email address
              </label>
              <input
                type='email'
                placeholder='email@company.com '
                id='email'
                name='email'
                className='newsletter__form-input'
                aria-describedby='emailError'
                aria-required='true'
                aria-invalid='false'
                autofocus
              />
            </div>
            <span
              className='newsletter__form-error'
              id='emailError'
              aria-live='polite'
            >
              Valid email required
            </span>
            <button
              className='newsletter__form-btn-submit'
              aria-label='Subscribe to monthly newsletter for product management updates'
            >
              Subscribe to monthly newsletter
            </button>
          </div>
        </section>
        <div className='newsletter__form-img-container'></div>
      </form>
    </article>
  );
};
export default Form;
