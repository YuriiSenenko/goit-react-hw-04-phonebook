import React from 'react';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ renderContacts, visibleContacts }) => {
  return (
    <ul className={css.contactsList}>{renderContacts(visibleContacts)}</ul>
  );
};
export default ContactList;

ContactList.propTypes = {
  renderContacts: PropTypes.func,
  visibleContacts: PropTypes.array,
};
