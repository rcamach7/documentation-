import React from "react";

export default class DisplayData extends React.Component {
  render() {
    return (
      <div className="DisplayData">
        {this.props.notes.map((note, i) => {
          return <Note note={note} key={i} />;
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
        <a href={info.source}>Source</a>
      </p>
    </div>
  );
};
