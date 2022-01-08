import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            />
          );
        })}
      </div>
    );
  }
}

const Note = (props) => {
  const info = props.note;
  return (
    <div className="Note">
      <p className="note-title">{info.title}</p>
      <p className="note-description">({info.description})</p>
      <p className="note-source">
        <a className="note-link" href={info.source}>
          Source
        </a>
        <button
          className="note-link"
          onClick={() => alert("Not implemented yet")}
        >
          Edit
        </button>
        <button
          className="note-deleteNote"
          onClick={() => props.handleDeleteNote(info.id)}
        >
          <FontAwesomeIcon icon="trash-alt" size="1x" />
        </button>
      </p>
    </div>
  );
};
