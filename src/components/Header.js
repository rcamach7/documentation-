import AddNewResource from "./AddNewResource";
import { useState } from "react";

export default function Header(props) {
  const [showAddNewResource, setShowAddNewResource] = useState(false);

  const toggleForm = () => {
    if (showAddNewResource) {
      setShowAddNewResource(false);
    } else {
      setShowAddNewResource(true);
    }
  };

  return (
    <nav className="Header">
      <h1>Development Resources</h1>
      <ul>
        <li>Home</li>
        <li onClick={() => toggleForm()}>
          Add New Resource
          {showAddNewResource ? (
            <AddNewResource
              toggleForm={toggleForm}
              handleAddResource={props.handleAddResource}
            />
          ) : null}
        </li>
      </ul>
    </nav>
  );
}
