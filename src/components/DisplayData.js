import React from "react";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Note as NewNote } from "../logic/Notes";

export default class DisplayData extends React.Component {
  render() {
    return (
      <div className="DisplayData">
        {this.props.notes.map((note, i) => {
          return (
            <Note
              note={note}
              key={i}
              handleDeleteNote={this.props.handleDeleteNote}
              handleEditNote={this.props.handleEditNote}
            />
          );
        })}
      </div>
    );
  }
}

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

const EditForm = (props) => {
  const [title, setTitle] = useState(props.note.title);
  const [description, setDescription] = useState(props.note.description);
  const [source, setSource] = useState(props.note.source);
  const editFormRef = useRef(null);

  useEffect(() => {
    if (props.display) {
      editFormRef.current.style.display = "block";
    } else {
      editFormRef.current.style.display = "none";
    }
  }, [props.display]);

  const cancelEdit = (e) => {
    e.preventDefault();

    props.handleDisableForm();
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    props.handleEditNote(NewNote(title, description, source, props.note.id));
    props.handleDisableForm();
  };

  return (
    <div className="EditForm">
      <form ref={editFormRef}>
        <div className="form-title">
          <button
            className="form-title-closeBtn"
            onClick={(e) => cancelEdit(e)}
          >
            <FontAwesomeIcon icon="window-close" size="1x" />
          </button>
        </div>
        {/* BEGIN FORM INPUT */}
        <label htmlFor="title">Title</label>
        <br />
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />

        <label htmlFor="description">Description</label>
        <br />
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
        <br />

        <label htmlFor="source">Source</label>
        <br />
        <input
          type="text"
          id="source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <br />
        <br />

        <input
          className="btn btn-form"
          id="newResource"
          type="submit"
          value="Save Changes"
          onClick={(e) => handleSubmitEdit(e)}
        />
        <br />
      </form>
    </div>
  );
};
