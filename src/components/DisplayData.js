import React from "react";
import Note from "./Note";

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
