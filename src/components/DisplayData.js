import React from "react";

export default class DisplayData extends React.Component {
  render() {
    return (
      <div className="DisplayData">
        {this.props.notes.map((note) => {
          console.log(note.toString());
        })}
      </div>
    );
  }
}
