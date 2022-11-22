import React from 'react';
import css from './App.module.css';

import Title from './Title';
import Form from './Form';
import Filter from './Filter';
import ContactList from './ContactList';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  //! Життєві цикли
  // Перевіряє чи є щось в localStorage, якщо є, то дістає і записує початкові значення в state
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  // Перевіряє чи змінився state і записує в localStorage
  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  // Передає пропс в компонент форми
  formSubmitHandler = (contact, id) => {
    const normalizedName = contact.name.toLowerCase();
    const contactItem = {
      id,
      name: contact.name,
      number: contact.number,
    };
    const filteredContacts = this.state.contacts.filter(
      searchContact => searchContact.name.toLowerCase() === normalizedName
    );

    if (filteredContacts.length > 0) {
      alert(`${contact.name} is already in contacts`);
    } else {
      this.setState({
        contacts: [contactItem, ...this.state.contacts],
      });
    }
  };
  onDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContact = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    const search = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return search;
  };

  renderContacts = contacts => {
    return contacts.map(contact => (
      <li className={css.contact} key={contact.id}>
        {contact.name}: {contact.number}
        <button
          className={css.deleteBtn}
          onClick={() => this.onDeleteContact(contact.id)}
        >
          Delete
        </button>
      </li>
    ));
  };

  render() {
    const { filter } = this.state;

    const visibleContacts = this.getVisibleContact();

    return (
      <div>
        <Title>Phonebook</Title>
        <Form onSubmit={this.formSubmitHandler} />

        <h2> Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          renderContacts={this.renderContacts}
          visibleContacts={visibleContacts}
        />
      </div>
    );
  }
}
