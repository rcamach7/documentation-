import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditForm from "./EditForm";

const Resource = (props) => {
  const [displayForm, setDisplayForm] = useState(false);
  const resource = props.resource;

  const handleDisableForm = () => {
    setDisplayForm(false);
  };

  return (
    <div className="Resource">
      <p className="resource-title">{resource.title}</p>
      <p className="resource-description">({resource.description})</p>
      <p className="resource-source">
        <a className="resource-link" href={resource.source}>
          Source
        </a>

        <button
          className="resource-buttons edit"
          onClick={() => setDisplayForm(true)}
        >
          <FontAwesomeIcon icon="edit" size="1x" />
        </button>
        <button
          className="resource-buttons delete"
          onClick={() => props.handleDeleteResource(resource.id)}
        >
          <FontAwesomeIcon icon="trash-alt" size="1x" />
        </button>
      </p>
      {/* Placeholder For Form, will be displayed using absolute, so not relevant to this placement. */}
      <EditForm
        display={displayForm}
        resource={resource}
        handleDisableForm={handleDisableForm}
        handleEditResource={props.handleEditResource}
      />
    </div>
  );
};

export default Resource;
