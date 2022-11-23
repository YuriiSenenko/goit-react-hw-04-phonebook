import { useEffect, useState } from 'react';
import css from './App.module.css';

import Title from './Title';
import Form from './Form';
import Filter from './Filter';
import ContactList from './ContactList';

export function App() {
  // Початкове значення contacts беремо або з localStorage, або по замовчуванню пустий масив.
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  // При зміні contacts запичуємо в localStorage
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // Передає пропс в компонент форми
  const formSubmitHandler = (name, number, id) => {
    const normalizedName = name.toLowerCase();
    const contactItem = {
      id,
      name: name,
      number: number,
    };

    const filteredContacts = contacts.filter(
      searchContact => searchContact.name.toLowerCase() === normalizedName
    );

    if (filteredContacts.length > 0) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts([contactItem, ...contacts]);
    }
  };

  // видаляє контакти з localStorage по ID після натискання на DELETE
  const onDeleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContact = () => {
    const normalizedFilter = filter.toLowerCase();

    const search = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return search;
  };

  const renderContacts = contacts => {
    return contacts.map(contact => (
      <li className={css.contact} key={contact.id}>
        {contact.name}: {contact.number}
        <button
          className={css.deleteBtn}
          onClick={() => onDeleteContact(contact.id)}
        >
          Delete
        </button>
      </li>
    ));
  };

  return (
    <div>
      <Title>Phonebook</Title>
      <Form onSubmit={formSubmitHandler} />

      <h2> Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        renderContacts={renderContacts}
        visibleContacts={getVisibleContact()}
      />
    </div>
  );
}
