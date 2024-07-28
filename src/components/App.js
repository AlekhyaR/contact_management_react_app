import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import api from "../api/contacts";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";
import DeleteContact from "./DeleteContact";
import { ContactsCrudContextProvider } from "../context/ContactsCrudContext";
import ToDoList from "./ToDoList";

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await api.get("/contacts");
      if (allContacts.data) setContacts(allContacts.data);
    };

    getAllContacts();
  }, []);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <ContactsCrudContextProvider>
          <Routes>
            <Route path="/" element={<ContactList />} />
            <Route path="/add" element={<AddContact />} />
            <Route path="/contact/:id" element={<ContactDetail />} />
            <Route path="/edit" element={<EditContact />} />
            <Route path="/delete" element={<DeleteContact />} />
            <Route path="/todo" element={<ToDoList />} />
          </Routes>
        </ContactsCrudContextProvider>
      </Router>
    </div>
  );
}

export default App;
