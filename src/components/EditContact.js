import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";

const EditContact = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name, email} = location.state.contact;
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const { updateContactHandler } = useContactsCrud();

  const update = (e) => {
    e.preventDefault();
    if (newName === "" || newEmail === "") {
      alert("All the fields are mandatory");
      return;
    }
    // Pass form field values to addContactHandler to add to contacts list
    updateContactHandler({id, name: newName, email: newEmail });
    // Clear the field values after submit
    setNewEmail("");
    setNewName("");
    navigate("/");
  }

  return (
    <div className="ui main">
      <h2>EditContact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
};

export default EditContact;
  