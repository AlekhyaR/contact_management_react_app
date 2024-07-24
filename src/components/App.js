// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import api from "../api/contacts";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";
import DeleteContact from "./DeleteContact";

function App() {
  // Initialize state to hold the list of contacts
  const [contacts, setContacts] = useState([]);                         
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // retrieve contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  // Handler to add a new contact
  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact,
    }
    // we are using api to save our datab  bvvvffv     bb
    const response = await api.post("/contacts", request);

    // Spread the existing contacts and add the new contact to the array
    setContacts([...contacts, response.data]); 
  };

  const updateContactHandler = async (contact) => {
  }
                               
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
                      .join("")
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }
    else {
      setSearchResults(contacts);
    }
  }

  // useEffect to retrieve contacts from local storage when the component mounts
  useEffect(() => {
    // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retrieveContacts.length > 0) {
    //   setContacts(retrieveContacts);
    // }
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts.length > 0) setContacts(allContacts);
    }
    getAllContacts();
  }, []); 

  // useEffect to store the contacts in local storage whenever contacts state changes
  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  // Render the UI
  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={
            <ContactList 
              contacts={searchTerm.length < 1 ? contacts : searchResults } 
              getContactId={removeContactHandler}
              term={searchTerm}
              searchKeyword={searchHandler}/>
            } 
          />
          <Route path="/add" element={
              <AddContact 
                addContactHandler={addContactHandler}/>
            }
          />
          <Route path="/contact/:id" element={<ContactDetail/>}/>
          <Route path="/edit" element={<EditContact updateContactHandler={updateContactHandler}/>}/> 
          <Route path="/delete" element={<DeleteContact removeContactHandler={removeContactHandler} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;