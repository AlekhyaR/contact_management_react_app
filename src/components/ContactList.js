import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';
import { useContactsCrud } from '../context/ContactsCrudContext';

const ContactList = (props) => {
  const { contacts, retrieveContacts, searchTerm, searchResults, searchHandler} = useContactsCrud();
  const inputEl = useRef("");

  useEffect(() => {
    retrieveContacts();
  }, [retrieveContacts]);

  const renderContactList = (searchTerm.length < 1 ? contacts : searchResults ).map((contact) => {
    return (
      <ContactCard 
        contact={contact} 
        key={contact.id} 
      />
    );
  });

  const onUserSearch = (e) => {
    searchHandler(e.target.value);
  };

  return (
    <div className='main'>
      <h2>
        Contact List
        <Link to="/add">  
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <div className='ui search'>
        <div className='ui icon input'>
          <input ref={inputEl} type="text" placeholder='Search Contacts' className='prompt' 
            value={searchTerm} onChange={(e) => onUserSearch(e)}></input>
          <i className='search icon'></i>
        </div>
      </div>
      <div className='ui celled list'>{renderContactList}</div>
    </div>
  );
};

export default ContactList;
