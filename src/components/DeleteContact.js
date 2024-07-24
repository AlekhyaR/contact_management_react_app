import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const DeleteContact = (removeContactHandler) => {
  const location = useLocation();
  const { id } = location.state;
  const navigate = useNavigate();

  const handleDelete = () => {
    removeContactHandler(id);
    navigate("/");
  }

  return (
    <div className="main">
      <div className="ui card centered">
        <div className="content">
          Are you sure you want to delete?
          <div className="center-div">
            <Link to="/">
              <button className="ui button blue center" onClick={handleDelete}>Yes</button>
            </Link>
            <Link to="/">
              <button className="ui button red center">No</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteContact;
