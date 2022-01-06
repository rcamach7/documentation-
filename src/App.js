import "./App.css";
import React from "react";
import DisplayData from "./components/DisplayData";
import AddNewResource from "./components/AddNewResource";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
    this.handleAddNote = this.handleAddNote.bind(this);
  }

  handleAddNote(newNote) {
    const newCollection = this.state.notes;
    newCollection.push(newNote);

    this.setState({
      notes: newCollection,
    });
  }

  render() {
    return (
      <div className="App">
        <WebsiteTitle />
        <DisplayData notes={this.state.notes} />
        <AddNewResource handleAddNote={this.handleAddNote} />
      </div>
    );
  }
}

function WebsiteTitle() {
  return (
    <div className="App-title">
      <h1>Documentations & Resources</h1>
    </div>
  );
}

export default App;
