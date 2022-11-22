import React, { Component } from 'react';
import css from './Form.module.css';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handelChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handelSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state, nanoid());
    this.reset();
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.handelSubmit}>
        <label className={css.lable} htmlFor="">
          Name
        </label>
        <input
          value={this.state.name}
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={this.handelChange}
        />
        <label className={css.lable} htmlFor="">
          Number
        </label>
        <input
          value={this.state.number}
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={this.handelChange}
        />

        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default Form;

Form.propTypes = {
  onSubmit: PropTypes.func,
};
