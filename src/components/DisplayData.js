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
      <p>{info.description}</p>
      <p>
        <a href={info.source}>Source</a>
      </p>
    </div>
  );
};
