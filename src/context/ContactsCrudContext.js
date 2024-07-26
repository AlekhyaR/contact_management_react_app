import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import api from "../api/contacts";

const contactsCrudContext = createContext();

export function ContactsCrudContextProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // retrieve contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    if (response.data) setContacts(response.data);
  }

  // delete contacts
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  };

  // add contacts
  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  // update contacts
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(
      contacts.map((c) => {
        return c.id === id ? { ...response.data } : c;
      })
    );
  };

  // search contacts
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
    } else {
      setSearchResults(contacts);
    }
  };

  const value = {
    contacts,
    searchTerm,
    searchResults,
    searchHandler, 
    retrieveContacts,
    removeContactHandler,
    addContactHandler,
    updateContactHandler
  }

  return <contactsCrudContext.Provider value={value}>
    {children}
  </contactsCrudContext.Provider>
}

export function useContactsCrud() {
  return useContext(contactsCrudContext);
}
