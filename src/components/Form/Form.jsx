import { useState } from 'react';
import css from './Form.module.css';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handelChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handelSubmit = event => {
    event.preventDefault();
    onSubmit(name, number, nanoid());
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handelSubmit}>
      <label className={css.lable} htmlFor="">
        Name
      </label>
      <input
        value={name}
        className={css.input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handelChange}
      />
      <label className={css.lable} htmlFor="">
        Number
      </label>
      <input
        value={number}
        className={css.input}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handelChange}
      />

      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
}
export default Form;

Form.propTypes = {
  onSubmit: PropTypes.func,
};
