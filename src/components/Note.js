import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditForm from "./EditForm";

const Note = (props) => {
  const [displayForm, setDisplayForm] = useState(false);
  const info = props.note;

  const handleDisableForm = () => {
    setDisplayForm(false);
  };

  return (
    <div className="Note">
      <p className="note-title">{info.title}</p>
      <p className="note-description">({info.description})</p>
      <p className="note-source">
        <a className="note-link" href={info.source}>
          Source
        </a>

        <button
          className="note-buttons edit"
          onClick={() => setDisplayForm(true)}
        >
          <FontAwesomeIcon icon="edit" size="1x" />
        </button>
        <button
          className="note-buttons delete"
          onClick={() => props.handleDeleteNote(info.id)}
        >
          <FontAwesomeIcon icon="trash-alt" size="1x" />
        </button>
      </p>
      {/* Placeholder For Form, will be displayed using absolute, so not relevant to this placement. */}
      <EditForm
        display={displayForm}
        note={info}
        handleDisableForm={handleDisableForm}
        handleEditNote={props.handleEditNote}
      />
    </div>
  );
};

export default Note;
